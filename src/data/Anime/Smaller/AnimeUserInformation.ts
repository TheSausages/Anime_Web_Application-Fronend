import { SimpleUser } from "../../General/User/User";
import { LocalAnimeInformation } from "../LocalAnimeInformation";

/** What status can the user select for an anime. */
export const AnimeUserStatusElements = ["No Status", "Watching", "Completed", "Dropped", "Plan to Watch"]
/** type of anime statuses for selecting by the user. Created from {@link AnimeUserStatusElements} values. */
export type AnimeUserStatus = typeof AnimeUserStatusElements[number]

/**
 * Interface containing what the user can select for their opinion on an anime.
 */
export interface AnimeUserInformation {
    /** Id oof the anime user status. */
    id: AnimeUserInformationId;

    /** The status which the user can select. */
    status: AnimeUserStatus;

    /** When did the user start watching the anime. */
    watchStartDate?: Date;

    /** When did the user finished wathcing the anime. */
    watchEndDate?: Date;

    /** How many episodes did the user watch. */
    nrOfEpisodesSeen: number;

    /** Did the user add the anime to their favourites. */
    isFavourite: boolean;

    /** Did the user write a review for the anime? */
    didReview: boolean;

    /** The review written by the user */
    review?: Review;

    /** The grade the user gave to the anime. */
    grade?: number | '';
}

/**
 * The {@link AnimeUserInformation} composite id.
 */
export interface AnimeUserInformationId {
    /** Which anime the user status is connected to. */
    anime: LocalAnimeInformation;

    /** Which user is the anime status for. */
    user: SimpleUser;
}

/** What data can be used to create a Review. */
export interface ReviewForm {
    /** Title of the review. */
    reviewTitle: string;

    /** Text of the review. */
    reviewText: string;
}

/** Body that represent a Review. */
export interface Review extends ReviewForm {
    /** Id of the review. */
    id?: number;

    /** How many people thought that the review was helpfull. */
    nrOfHelpful?: number;

    /** How many upvoted does the review have. */
    nrOfPlus?: number;

    /** How many downvotes does the review have. */
    nrOfMinus?: number;
}

/** Interface used to connect the gradle to a text representing it. */
export interface Grade {
    /** Numberic scale, used in backend */
    scale: number;

    /** Text used to represent the grade for a user. */
    gradeName: string;
}

/** Grades used for selecting by the user. */
export const Grades: Grade[] = [
    {scale: 1, gradeName: "Prepare Eye Bleach"},
    {scale: 2, gradeName: "Worse than kicking a puppy"},
    {scale: 3, gradeName: "Very Bad"},
    {scale: 4, gradeName: "Not the worst"},
    {scale: 5, gradeName: "Average"},
    {scale: 6, gradeName: "Above Average"},
    {scale: 7, gradeName: "Good"},
    {scale: 8, gradeName: "Solid 8/10"},
    {scale: 9, gradeName: "Extremely Good"},
    {scale: 10, gradeName: "Masterpiece"},
]