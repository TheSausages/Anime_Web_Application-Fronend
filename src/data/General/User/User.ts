import { AnimeUserInformation } from "../../Anime/Smaller/AnimeUserInformation";
import { CompletePost } from "../../Forum/Post";
import { SimpleThreadWithUserStatus, ThreadUserStatus } from "../../Forum/Thread";
import { Achievement } from "./Achievement";

/**
 * Simple user object containing basic infotmation on a user.
 */
export interface SimpleUser {
    /** User id. Is used both in the local database and in keycloak. */
    userId: string;

    /** Username of the user. */
    username: string;

    /** How many posts did the user write. */
    nrOfPosts: number;

    /** How much did the user watch. */
    watchTime: number;

    /** How many achievement points does the user have. */
    achievementPoints: number;
}

/**
 * A complete user object. Holds detailed information on a user.
 */
export interface CompleteUser extends SimpleUser {

    /** What achievemtns does the user posses. */
    achievements: Achievement[];

    /** What are the users anime statuses */
    animeUserInfos: AnimeUserInformation[];

    /** What are the users statuses to threads.  */
    threadUserStatuses: ThreadUserStatus[];

    /** Threads created by the user. */
    threads: SimpleThreadWithUserStatus[];

    /** Posts created by the user */
    posts: CompletePost[];
}