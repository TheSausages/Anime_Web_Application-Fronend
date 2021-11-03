import { i18n } from "i18next";
import { TFunction } from "react-i18next";
import { AnimeUserInformation } from "../../data/Anime/Smaller/AnimeUserInformation";
import { AuthenticationToken } from "../../data/General/User/AuthenticationToken";
import { Credentials } from "../../data/General/User/Credentials";
import { RegistrationBody } from "../../data/General/User/RegistrationBody";
import { AuthenticationProperties } from "../../Properties/AuthenticationProperties";
import { BackendProperties } from "../../Properties/BackendProperties";
import { performRequestWithNoResponse, performRequestWithType } from "./ApiService";
import { HttpMethods } from "./ApiService";

export class UserService {
    static login(credentials: Credentials, t: TFunction, i18n: i18n): Promise<AuthenticationToken> {
        return performRequestWithType<AuthenticationToken>(HttpMethods.POST, BackendProperties.authAndUser.login, false, t, i18n, credentials)
    } 

    static logout(t: TFunction, i18n: i18n): Promise<any> {
        return performRequestWithNoResponse(HttpMethods.POST, BackendProperties.authAndUser.logout, true, t, i18n, {refreshToken: localStorage.getItem(AuthenticationProperties.refreshTokenItem)})
    }
    
    static register(regis: RegistrationBody, t: TFunction, i18n: i18n): Promise<AuthenticationToken> {
        return performRequestWithType<AuthenticationToken>(HttpMethods.POST, BackendProperties.authAndUser.register, false, t, i18n, regis)
    }

    static updateAnimeUserInformationData(data: AnimeUserInformation, t: TFunction, i18n: i18n) {
        return performRequestWithNoResponse(HttpMethods.POST, BackendProperties.authAndUser.updateAnimeUserInformation, true, t, i18n, data);
    }

    static cancelAchievementsSubscription(t: TFunction, i18n: i18n) {
        return performRequestWithNoResponse(HttpMethods.GET, BackendProperties.authAndUser.cancelAchievementsSubscription, true, t, i18n);
    }
}