import { AnwserAfterLogin } from "../../data/General/AnwserAfterLogin";
import { Credentials } from "../../data/General/Credentials";
import { performRequest, performRequestWithType } from "./ApiService";
import { HttpMethods } from "./ApiService";

export class LoginService {
    static login(credentials: Credentials): Promise<AnwserAfterLogin> {
        if (credentials === undefined) {
            throw Error("The Credentials are undefined!")
        }
        return performRequestWithType<AnwserAfterLogin>(HttpMethods.POST, "/login", false, credentials)
    } 

    static logout(): Promise<any> {
        return performRequest(HttpMethods.POST, "/logoutUser", true, {refreshToken: localStorage.getItem('refreshToken')})
    } 
}