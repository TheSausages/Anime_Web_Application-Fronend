import { User } from "./User";

export const AnimeUserStatusElements = ["No Status", "Watching", "Completed", "Dropped", "Plan to Watch"]
export type AnimeUserStatus = typeof AnimeUserStatusElements[number]

export interface AnimeUserInformation {
    id: AnimeUserInformationId;
    status: AnimeUserStatus;
    watchStartDate?: Date;
    watchEndDate?: Date;
    nrOfEpisodesSeen: number;
    isFavourite: boolean;
    didReview: boolean;
    review?: Review;
    grade?: number | '';
}

export interface AnimeUserInformationId {
    animeId: number;
    user: User;
}

export interface ReviewForm {
    reviewTitle: string;
    reviewText: string;
}

export interface Review extends ReviewForm {
    id?: number;
    nrOfHelpful?: number;
    nrOfPlus?: number;
    nrOfMinus?: number;
}

export interface Grade {
    scale: number;
    gradeName: string;
}

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