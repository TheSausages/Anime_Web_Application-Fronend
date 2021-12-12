import { i18n } from "i18next";
import { TFunction } from "react-i18next";
import { AnimeUserInformation } from "../../data/Anime/Smaller/AnimeUserInformation";
import { AuthenticationToken } from "../../data/General/User/AuthenticationToken";
import { Credentials } from "../../data/General/User/Credentials";
import { RegistrationBody } from "../../data/General/User/RegistrationBody";
import { CompleteUser } from "../../data/General/User/User";
import { AuthenticationProperties } from "../../Properties/AuthenticationProperties";
import { BackendProperties } from "../../Properties/BackendProperties";
import { performRequestWithNoResponse, performRequestWithType } from "./ApiService";
import { HttpMethods } from "./ApiService";

/**
 * Class containing methods for operations related to a User. Should never be initialised.
 * The i18n and tranlation function must be passes down to {@link ApiService}.
 */
export abstract class UserService {
    /**
     * Function for getting the user profile of the current user.
     * @param t Translation function.
     * @param i18n i18n instance.
     * @returns User profile of the current user.
     */
    static currentUserProfile(t: TFunction, i18n: i18n): Promise<CompleteUser> {
        return performRequestWithType<CompleteUser>(HttpMethods.GET, BackendProperties.authAndUser.currentUserProfile, true, t, i18n)
    }

    /**
     * Function to get the user profile of a user.
     * @param userId Id of the requested user.
     * @param t Translation function.
     * @param i18n i18n instance.
     * @returns User profile of a user.
     */
    static userProfileById(userId: string, t: TFunction, i18n: i18n): Promise<CompleteUser> {
        return performRequestWithType<CompleteUser>(HttpMethods.GET, BackendProperties.authAndUser.getUserProfile(userId), false, t, i18n)
    }

    /**
     * Function to log in using credentials.
     * @param credentials Data used to log in.
     * @param t Translation function.
     * @param i18n i18n instance.
     * @returns Tokens used to authenticate a user.
     */
    static login(credentials: Credentials, t: TFunction, i18n: i18n): Promise<AuthenticationToken> {
        return performRequestWithType<AuthenticationToken>(HttpMethods.POST, BackendProperties.authAndUser.login, false, t, i18n, credentials)
    } 

    /**
     * Function used to log out of the site.
     * @param t Translation function.
     * @param i18n i18n instance.
     * @returns Nothing (only a promise used for chaining).
     */
    static logout(t: TFunction, i18n: i18n): Promise<any> {
        return performRequestWithNoResponse(HttpMethods.POST, BackendProperties.authAndUser.logout, true, t, i18n, {refreshToken: localStorage.getItem(AuthenticationProperties.refreshTokenItem)})
    }
    
    /**
     * Function used to register.
     * @param regis Data used to register.
     * @param t Translation function.
     * @param i18n i18n instance.
     * @returns Data used to authenticate the user after registration.
     */
    static register(regis: RegistrationBody, t: TFunction, i18n: i18n): Promise<AuthenticationToken> {
        return performRequestWithType<AuthenticationToken>(HttpMethods.POST, BackendProperties.authAndUser.register, false, t, i18n, regis)
    }

    /**
     * Function to cancel the subscription to achievement emission.
     * @param t Translation function.
     * @param i18n i18n instance.
     * @returns Nothing (only a promise used for chaining).
     */
    static cancelAchievementsSubscription(t: TFunction, i18n: i18n): Promise<any> {
        return performRequestWithNoResponse(HttpMethods.GET, BackendProperties.authAndUser.cancelAchievementsSubscription, true, t, i18n);
    }
}