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
        throw Error("The method cannot be null or undefined")
    }
    
    if (!Object.values(HttpMethods).includes(method)) {
        throw Error("There is no such Http Method:" + method)
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
    return response.json().then((err: {message: string}) => {
        return { status: response.status, message: err.message };
    }).catch(_ => {
        return { status: response.status, message: "No error message available" };
    }).then((error: BackendError) => {
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

    if (needAuth && localStorage.getItem('accessToken')) {
        headers.set("Authorization", "Bearer " + localStorage.getItem('accessToken')!);
    }

    return headers;
}