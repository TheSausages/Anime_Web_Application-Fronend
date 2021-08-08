import { AnimeUserInformation } from "../../data/Anime/Smaller/AnimeUserInformation";
import { AnwserAfterLogin } from "../../data/General/AnwserAfterLogin";
import { Credentials } from "../../data/General/Credentials";
import { performRequest, performRequestWithType } from "./ApiService";
import { HttpMethods } from "./ApiService";

export class UserService {
    static login(credentials: Credentials): Promise<AnwserAfterLogin> {
        if (credentials === undefined) {
            throw Error("The Credentials are undefined!")
        }
        return performRequestWithType<AnwserAfterLogin>(HttpMethods.POST, "/auth/login", false, credentials)
    } 

    static logout(): Promise<any> {
        return performRequest(HttpMethods.POST, "/auth/logout", true, {refreshToken: localStorage.getItem('refreshToken')})
    } 

    static updateAnimeUserInformationData(data: AnimeUserInformation): Promise<any> {
        return performRequest(HttpMethods.POST, "/auth/liked", false, data);
    }
}