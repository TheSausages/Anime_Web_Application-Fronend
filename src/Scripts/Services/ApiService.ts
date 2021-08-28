import { formControlClasses } from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { AuthenticationToken } from "../../data/General/AuthenticationToken"
import { BackendError } from "../../data/General/BackendError"

export enum HttpMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

export async function performRequestWithType<T>(method: HttpMethods, url: String, needAuth: boolean, body?: any): Promise<T> {
    return performRequest(method, url, needAuth, body)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return handleError(response)
            }
        })
}

export async function performRequestWithNoResponse(method: HttpMethods, url: String, needAuth: boolean, body?: any) {
    return performRequest(method, url, needAuth, body)
        .then(response => {
            if (response.ok) {
                return;
            } else {
                return handleError(response)
            }
        })
}

export async function performRequest(method: HttpMethods, url: String, needAuth: boolean, body?: any): Promise<Response> {
    if (method === null || method === undefined) {
        const err = { message: "The method cannot be null or undefined", status: 400 } as BackendError
        throw err;
    }
    
    if (!Object.values(HttpMethods).includes(method)) {
        const err = { message: "There is no such Http Method:" + method, status: 400 } as BackendError
        throw err;
    }

    if (sessionStorage.getItem('accessToken') && new Date(sessionStorage.getItem('refreshIfLaterThen')!) <= new Date()) {
        refreshTokens();
    }

    const headers = getHeaders(needAuth);

    body = JSON.stringify(body)

    const options = {
        method,
        headers,
        body
    }

    const backendUrl = "http://localhost:8080";
    const fullUrl = backendUrl + url;

    return fetch(new Request(fullUrl, options))
}

function handleError(response: Response) {
    if (response.status === 401) {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('refreshIfLaterThen');

        throw { status: response.status, message: "You remained unactive for too long! Please log in again" };
    }

    return response.json().then((err: {message: string}) => {
        return { status: response.status, message: err.message };
    }).catch(_ => {
        return { status: response.status, message: "No error message available" };
    }).then((error: BackendError) => {
        throw error;
    })
}

function refreshTokens() {
    fetch("http://localhost:8080/auth/refreshToken", {
        method: "POST",
        headers: getHeaders(false),
        body: JSON.stringify({refreshToken: sessionStorage.getItem('refreshToken')})
    })
    .then(data => data.json())
    .then((data: AuthenticationToken) => {
        sessionStorage.setItem('accessToken', data.access_token);
        sessionStorage.setItem('refreshToken', data.refresh_token);
        data.expires_in && sessionStorage.setItem('refreshIfLaterThen', new Date(new Date().getTime() + data.expires_in*1000).toISOString())
    })
    .catch((error: BackendError) => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('refreshIfLaterThen');
        console.log("OK")
        throw error;
    })
}

/**
 * 
 * @param needAuth Does the request need authentification or need user data
 * @returns 
 */
function getHeaders(needAuth: boolean) : Headers {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    if (needAuth && sessionStorage.getItem('accessToken')) {
        headers.set("Authorization", "Bearer " + sessionStorage.getItem('accessToken')!);
    }

    return headers;
}