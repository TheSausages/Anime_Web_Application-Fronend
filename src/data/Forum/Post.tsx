import { PageDTO } from "../General/PageDTO";
import { SimpleUser } from "../General/User/User";

/**
 * Interface containing basin information on a post.
 */
export interface SimplePost {
    /** Id of the post. */
    postId: number;

    /** Title of the post. */
    title: string;

    /** Is the post blocked? */
    isBlocked: boolean;

    /** Date on which the post was created. */
    creation: Date;

    /** Date on which the post was last time modified. */
    modification: Date;

    /** The post creator. */
    creator: SimpleUser;
}

/**
 * Object containing detailed information on a post.
 */
export interface CompletePost extends SimplePost {
    /** Tect of the post. */
    text: string;

    /** How many upvotes does the post have. */
    nrOfPlus: number;

    /** How many downvotes does the post have. */
    nrOfMinus: number;

    /** What is the current users status on the post. */
    postUserStatus?: PostUserStatus
}

/** A page of {@link CompletePost}s. */
export interface CompletePostPage extends PageDTO<CompletePost> {}

/** A users status on the post. */
export interface PostUserStatus {
    /** The post user status composite id. */
    ids: {
        /** Simple post object. */
        post: SimplePost;

        /** Simple user object. */
        user: SimpleUser;
    }

    /** Does the user upvote the post. */
    isLiked: boolean;

    /** Does the user dislike the post. */
    isDisliked: boolean;

    /** Did the user report the post. */
    isReported: boolean;
}

/** Body used during post creation. */
export interface CreatePost {
    /** Title of thew post. */
    title: string;

    /** Text of the post. */
    text: string;
}

/**
 * Body used during post updating.
 */
export interface UpdatePost extends CreatePost {
    /** Id of the updated post. */
    postId: number;
}