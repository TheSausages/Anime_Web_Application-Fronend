import { AnimeUserInformation } from "../../data/Anime/Smaller/AnimeUserInformation";
import { AuthenticationToken } from "../../data/General/User/AuthenticationToken";
import { Credentials } from "../../data/General/User/Credentials";
import { RegistrationBody } from "../../data/General/User/RegistrationBody";
import { performRequestWithNoResponse, performRequestWithType } from "./ApiService";
import { HttpMethods } from "./ApiService";

export class UserService {
    static login(credentials: Credentials): Promise<AuthenticationToken> {
        return performRequestWithType<AuthenticationToken>(HttpMethods.POST, "/auth/login", false, credentials)
    } 

    static logout(): Promise<any> {
        return performRequestWithNoResponse(HttpMethods.POST, "/auth/logout", true, {refreshToken: localStorage.getItem('refreshToken')})
    }
    
    static register(regis: RegistrationBody): Promise<AuthenticationToken> {
        return performRequestWithType<AuthenticationToken>(HttpMethods.POST, "/auth/register", false, regis)
    }

    static updateAnimeUserInformationData(data: AnimeUserInformation) {
        return performRequestWithNoResponse(HttpMethods.POST, "/animeUser/updateUserAnime", true, data);
    }

    static cancelAchievementsSubscription() {
        return performRequestWithNoResponse(HttpMethods.GET, "/achievements/cancel", true);
    }
}