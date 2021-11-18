import { AuthenticationToken } from "../../data/General/User/AuthenticationToken"
import { BackendError } from "../../data/General/BackendError"
import { checkIfLoggedIn } from "../Utilities";
import { clearTokenFields } from "../../Components/AuthenticationAndLogin/Auth";
import { BackendProperties } from "../../Properties/BackendProperties"
import { AuthenticationProperties } from "../../Properties/AuthenticationProperties";
import { languages } from '../../i18n/Languages';
import { TFunction, i18n } from "i18next";

/**
 * Enum containing all possible HTTP methods.
 * @enum
 */
export enum HttpMethods {
    /** Represents a Http GET method */
    GET = "GET",

    /** Represents a Http POST method */
    POST = "POST",

    /** Represents a Http PUT method */
    PUT = "PUT",

    /** Represents a Http DELETE method */
    DELETE = "DELETE"
}

/**
 * Perform a request to backend using {@link performRequest} and map the recieved body a given Type/Interface.
 * @param method The method to be used for the request.
 * @param url URL to be used for the Request together with the base `backendURL` from {@link BackendProperties}.
 * @param needAuth Must the request use a *Authorization* header? If yes and a header cannot be created, an error will be thown.
 * @param t Translation function.
 * @param i18n i18n instance.
 * @param body An optional body to be used for the Request.
 * @typeParam T The type to which the correct result will be mapped.
 * @returns The recieved data casted to a given type.
 */
export async function performRequestWithType<T>(method: HttpMethods, url: string, needAuth: boolean, t: TFunction, i18n: i18n,  body?: any): Promise<T> {
    return performRequest(method, url, needAuth, t, i18n, body)
        .then(response => {
            if (response.status > 100 && response.status < 300) {
                return response.json()
            } else {
                return handleError(response, t)
            }
        })
}

/**
 * Perform a request to the backend using {@link performRequest} and if the messsage is succesfull doent return anything.
 * @param method The method to be used for the request.
 * @param url URL to be used for the Request together with the base `backendURL` from {@link BackendProperties}.
 * @param needAuth Must the request use a *Authorization* header? If yes and a header cannot be created, an error will be thown.
 * @param t Translation function.
 * @param i18n i18n instance.
 * @param body An optional body to be used for the Request.
 * @returns Nothing if the request was successfull.
 */
export async function performRequestWithNoResponse(method: HttpMethods, url: string, needAuth: boolean, t: TFunction, i18n: i18n, body?: any) {
    return performRequest(method, url, needAuth, t, i18n, body)
        .then(response => {
            if (response.status > 100 && response.status < 300) {
                return;
            } else {
                return handleError(response, t)
            }
        })
}

/**
 * This method performs the requests to the backend. If the timer for token refresh was reached, use {@link refreshTokens}.
 * @param method The method to be used for the request.
 * @param url URL to be used for the Request together with the base `backendURL` from {@link BackendProperties}.
 * @param needAuth Must the request use a *Authorization* header? If yes and a header cannot be created, an error will be thown.
 * @param t Translation function.
 * @param i18n i18n instance.
 * @param body An optional body to be used for the Request.
 * @returns The result of the request.
 * @throws An {@link BackendError} if the method is incorrect or the *method* param should not have a body passed and one was given.  
 */
export async function performRequest(method: HttpMethods, url: string, needAuth: boolean, t: TFunction, i18n: i18n, body?: any): Promise<Response> {
    if (method === null || method === undefined) {
        const err = { message: t!("errors.methodNotAllowed"), status: 400 } as BackendError
        throw err;
    }
    
    if (!Object.values(HttpMethods).includes(method)) {
        const err = { message: t("errors.noSuchHttpMethod", { method: method }), status: 400 } as BackendError
        throw err;
    }

    if (checkIfLoggedIn() && new Date(localStorage.getItem(AuthenticationProperties.refreshIfAfterItem)!) <= new Date()) {
        refreshTokens(t, i18n);
    }

    const headers = getHeaders(needAuth, t, i18n);
    body = JSON.stringify(body)

    return fetch(new Request(url, { method, headers, body }))
}

/**
 * Handle an error send from the backend.
 * @param response The backend reponse containing the error
 * @param t Translation function.
 * @throws The parsed error in {@link BackendError} form from the response.
 */
function handleError(response: Response, t: TFunction) {
    return response.json().then((err: {message: string}) => {
        return { status: response.status, message: err.message };
    }).catch(_ => {
        if (response.status === 401) {
            clearTokenFields()
            return { status: response.status, message: t("errors.tooLongInactive") };
        }

        return { status: response.status, message: t("errors.noMessageAvailable") };
    }).then((error: BackendError) => {
        throw error;
    })
}

/**
 * Method that refreshes the tokens. If the operation is successfull, 
 * set the new tokens in {@link localStorage} using the corresponding {@link AuthenticationProperties}.
 * @param t Translation function.
 * @param i18n i18n instance.
 * @throws A {@link BackendError} if the time for refresh was exceeded. If it happens, the User must log in once again.
 */
export async function refreshTokens(t: TFunction, i18n: i18n) {
    await fetch(BackendProperties.authAndUser.refreshAuthTokensUrl, {
        method: "POST",
        headers: getHeaders(false, t, i18n),
        body: JSON.stringify({refreshToken: localStorage.getItem(AuthenticationProperties.refreshTokenItem)})
    })
    .then(data => data.json())
    .then((data: AuthenticationToken) => {
        if (data.expires_in) {
            data.expires_in = 15
        }

        localStorage.setItem(AuthenticationProperties.accessTokenItem, data.access_token);
        localStorage.setItem(AuthenticationProperties.refreshTokenItem, data.refresh_token);
        //data.expires_in*1000 whould be max, but this way we get abit of time to refresh
        localStorage.setItem(AuthenticationProperties.refreshIfAfterItem, new Date(new Date().getTime() + data.expires_in*800).toISOString())
    })
    .catch((error: BackendError) => {
        clearTokenFields();
        throw error;
    })
}

/**
 * Get all the needed headers to perform the request.
 * @param needAuth Does the request need authentification? 
 * @param t Translation function.
 * @param i18n i18n instance.
 * @returns All the needed headers for a backend request in form of a {@link Headers} object.
 * @throws If the *needAuth* is true, and no access token was found throw an {@link BackendError}.
 */
function getHeaders(needAuth: boolean, t: TFunction, i18n: i18n) : Headers {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept-Language', (Object.keys(languages).filter((key) => languages[key].name === i18n!.language ? true : false).map((key) => languages[key])[0] ?? languages.english).countryCode)

    if (needAuth) {
        //the token is needed
        if (checkIfLoggedIn()) {
            headers.set("Authorization", "Bearer " + localStorage.getItem(AuthenticationProperties.accessTokenItem)!);
        } else {
            const err = { message: t("errors.mustLogIn"), status: 400 } as BackendError
            throw err;
        }
    } else {
        //If there is an access token, use it but it's not neceserry
        let acc = localStorage.getItem(AuthenticationProperties.accessTokenItem)

        acc && headers.set("Authorization", "Bearer " + acc);
    }

    return headers;
}

/**
 * Variant of {@link getHeaders}, that returen the headers in form of a {@link Record}.
 * @param needAuth Does the request need authentification? 
 * @param t Translation function.
 * @param i18n i18n instance.
 * @returns All the needed headers for a backend request in form of a {@link Record} object.
 * @throws If the user is not logged in an {@link BackendError} will be thrown.
 */
export function getHeadersAsRecord(needAuth: boolean, t: TFunction, i18n: i18n): Record<string, string> {
    let headers = getHeaders(true, t, i18n);

    return {
        'Content-Type': headers.get('Content-Type')!,
        'Authorization': headers.get('Authorization')!
    }
}