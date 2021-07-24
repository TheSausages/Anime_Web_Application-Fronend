import { Credentials } from "../data/Credentials";
import { performRequest, performRequestWithType } from "./ApiService";
import { HttpMethods } from "./ApiService";

export class LoginService {
    static login(credentials: Credentials): Promise<any> {
        return performRequest(HttpMethods.POST, "/login", false, credentials)
    } 

    static logout(): Promise<any> {
        return performRequest(HttpMethods.POST, "/login", true, JSON.stringify({refreshToken: localStorage.getItem('refreshToken')}))
    } 
}