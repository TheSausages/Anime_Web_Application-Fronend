import { AuthenticationToken } from "../../data/General/User/AuthenticationToken"
import { BackendError } from "../../data/General/BackendError"
import { checkIfLoggedIn } from "../Utilities";
import { clearTokenFields } from "../../Components/AuthenticationAndLogin/Auth";
import { BackendProperties } from "../../Properties/BackendProperties"
import { AuthenticationProperties } from "../../Properties/AuthenticationProperties";
import { languages } from '../../i18n/Languages';
import { TFunction, i18n } from "i18next";

export enum HttpMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

export async function performRequestWithType<T>(method: HttpMethods, url: string, needAuth: boolean, t: TFunction, i18n: i18n,  body?: any): Promise<T> {
    return performRequest(method, url, needAuth, t, i18n, body)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return handleError(response, t)
            }
        })
}

export async function performRequestWithNoResponse(method: HttpMethods, url: string, needAuth: boolean, t: TFunction, i18n: i18n, body?: any) {
    return performRequest(method, url, needAuth, t, i18n, body)
        .then(response => {
            if (response.ok) {
                return;
            } else {
                return handleError(response, t)
            }
        })
}

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

export async function refreshTokens(t: TFunction, i18n: i18n) {
    await fetch(localStorage.getItem(BackendProperties.authAndUser.refreshAuthTokensUrl)!, {
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
 * 
 * @param needAuth Does the request need authentification or need user data
 * @returns 
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

export function getHeadersAsRecord(needAuth: boolean, t: TFunction, i18n: i18n): Record<string, string> {
    let headers = getHeaders(true, t, i18n);

    return {
        'Content-Type': headers.get('Content-Type')!,
        'Authorization': headers.get('Authorization')!
    }
}