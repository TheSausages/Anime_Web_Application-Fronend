import { AnimeUserInformation } from "../../data/Anime/Smaller/AnimeUserInformation";
import { AuthenticationToken } from "../../data/General/AuthenticationToken";
import { Credentials } from "../../data/General/Credentials";
import { RegistrationBody } from "../../data/General/RegistrationBody";
import { performRequestWithNoResponse, performRequestWithType } from "./ApiService";
import { HttpMethods } from "./ApiService";

export class UserService {
    static login(credentials: Credentials): Promise<AuthenticationToken> {
        return performRequestWithType<AuthenticationToken>(HttpMethods.POST, "/auth/login", false, credentials)
    } 

    static logout(): Promise<any> {
        return performRequestWithNoResponse(HttpMethods.POST, "/auth/logout", true, {refreshToken: sessionStorage.getItem('refreshToken')})
    }
    
    static register(regis: RegistrationBody): Promise<AuthenticationToken> {
        return performRequestWithType<AuthenticationToken>(HttpMethods.POST, "/auth/register", false, regis)
    }

    static updateAnimeUserInformationData(data: AnimeUserInformation) {
        return performRequestWithNoResponse(HttpMethods.POST, "/animeUser/updateUserAnime", true, data);
    }
}