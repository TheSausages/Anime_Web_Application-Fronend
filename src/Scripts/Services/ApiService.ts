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

export async function performRequestWithType<T>(method: HttpMethods, url: string, needAuth: boolean, body?: any, t?: TFunction, i18n?: i18n): Promise<T> {
    return performRequest(method, url, needAuth, body, t, i18n)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return handleError(response)
            }
        })
}

export async function performRequestWithNoResponse(method: HttpMethods, url: string, needAuth: boolean, body?: any) {
    return performRequest(method, url, needAuth, body)
        .then(response => {
            if (response.ok) {
                return;
            } else {
                return handleError(response)
            }
        })
}

export async function performRequest(method: HttpMethods, url: string, needAuth: boolean, body?: any, t?: TFunction, i18n?: i18n): Promise<Response> {
    if (method === null || method === undefined) {
        const err = { message: t!("auth.loginSuccessfull"), status: 400 } as BackendError
        throw err;
    }
    
    if (!Object.values(HttpMethods).includes(method)) {
        const err = { message: "There is no such Http Method:" + method, status: 400 } as BackendError
        throw err;
    }

    if (checkIfLoggedIn() && new Date(localStorage.getItem(AuthenticationProperties.refreshIfAfterItem)!) <= new Date()) {
        refreshTokens();
    }

    const headers = getHeaders(needAuth, i18n);
    body = JSON.stringify(body)

    return fetch(new Request(url, { method, headers, body }))
}

function handleError(response: Response) {
    return response.json().then((err: {message: string}) => {
        return { status: response.status, message: err.message };
    }).catch(_ => {
        if (response.status === 401) {
            clearTokenFields()
            return { status: response.status, message: "You remained unactive for too long! Please log in again" };
        }

        return { status: response.status, message: "No error message available" };
    }).then((error: BackendError) => {
        throw error;
    })
}

export async function refreshTokens() {
    await fetch(localStorage.getItem(BackendProperties.authAndUser.refreshAuthTokensUrl)!, {
        method: "POST",
        headers: getHeaders(false),
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
function getHeaders(needAuth: boolean, i18n?: i18n) : Headers {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    i18n && headers.set('Accept-Language', (Object.keys(languages).filter((key) => languages[key].name === i18n!.language ? true : false).map((key) => languages[key])[0] ?? languages.english).countryCode)

    if (needAuth && checkIfLoggedIn()) {
        headers.set("Authorization", "Bearer " + localStorage.getItem(AuthenticationProperties.accessTokenItem)!);
    }

    return headers;
}

export function getHeadersAsRecord(needAuth: boolean): Record<string, string> {
    let headers = getHeaders(true);

    return {
        'Content-Type': headers.get('Content-Type')!,
        'Authorization': headers.get('Authorization')!
    }
}