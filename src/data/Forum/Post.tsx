import { PageDTO } from "../General/PageDTO";
import { SimpleUser } from "../General/User/SimpleUser";

export interface SimplePost {
    id: number;
    title: string;
    isBlocked: boolean;
    creation: Date;
    modification: Date;
    user: SimpleUser;
}

export interface CompletePost extends SimplePost {
    postText: string;
    nrOfPlus: number;
    nrOfMinus: number;
    postUserStatus?: PostUserStatus
}

export interface CompletePostPage extends PageDTO<CompletePost> {}

export interface PostUserStatus {
    ids: {
        post: SimplePost;
        user: SimpleUser;
    }
    isLiked: boolean;
    isDisliked: boolean;
    isReported: boolean;
}