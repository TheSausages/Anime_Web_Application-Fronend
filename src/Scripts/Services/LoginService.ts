import { Credentials } from "../../data/Anilist/Credentials";
import { performRequest } from "./ApiService";
import { HttpMethods } from "./ApiService";

export class LoginService {
    static login(credentials: Credentials): Promise<any> {
        if (credentials === undefined) {
            return new Promise((resolve, reject) => {})
        }
        return performRequest(HttpMethods.POST, "/login", false, credentials).then(data => data.json())
    } 

    static logout(): Promise<any> {
        return performRequest(HttpMethods.POST, "/logoutUser", true, JSON.stringify({refreshToken: localStorage.getItem('refreshToken')}))
    } 
}