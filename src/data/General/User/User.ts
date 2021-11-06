import { AnimeUserInformation } from "../../Anime/Smaller/AnimeUserInformation";
import { CompletePost } from "../../Forum/Post";
import { SimpleThread, ThreadUserStatus } from "../../Forum/Thread";
import { Achievement } from "./Achievement";

export interface SimpleUser {
    userId: string;
    username: string;
    nrOfPosts: number;
    watchTime: number;
    achievementPoints: number;
}

export interface CompleteUser extends SimpleUser {
    achievements: Achievement[];
    animeUserInfos: AnimeUserInformation[];
    threadUserStatuses: ThreadUserStatus[];
    threads: SimpleThread[];
    posts: CompletePost[];
}