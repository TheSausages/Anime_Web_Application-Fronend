import { AnimeUserInformation } from "../../data/Anime/Smaller/AnimeUserInformation";
import { AuthenticationToken } from "../../data/General/User/AuthenticationToken";
import { Credentials } from "../../data/General/User/Credentials";
import { RegistrationBody } from "../../data/General/User/RegistrationBody";
import { AuthenticationProperties } from "../../Properties/AuthenticationProperties";
import { BackendProperties } from "../../Properties/BackendProperties";
import { performRequestWithNoResponse, performRequestWithType } from "./ApiService";
import { HttpMethods } from "./ApiService";

export class UserService {
    static login(credentials: Credentials): Promise<AuthenticationToken> {
        return performRequestWithType<AuthenticationToken>(HttpMethods.POST, BackendProperties.authAndUser.login, false, credentials)
    } 

    static logout(): Promise<any> {
        return performRequestWithNoResponse(HttpMethods.POST, BackendProperties.authAndUser.logout, true, {refreshToken: localStorage.getItem(AuthenticationProperties.refreshTokenItem)})
    }
    
    static register(regis: RegistrationBody): Promise<AuthenticationToken> {
        return performRequestWithType<AuthenticationToken>(HttpMethods.POST, BackendProperties.authAndUser.register, false, regis)
    }

    static updateAnimeUserInformationData(data: AnimeUserInformation) {
        return performRequestWithNoResponse(HttpMethods.POST, BackendProperties.authAndUser.updateAnimeUserInformation, true, data);
    }

    static cancelAchievementsSubscription() {
        return performRequestWithNoResponse(HttpMethods.GET, BackendProperties.authAndUser.cancelAchievementsSubscription, true);
    }
}