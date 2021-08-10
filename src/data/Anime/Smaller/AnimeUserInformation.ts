import { AnimeUserStatus } from "./Enums";

export interface AnimeUserInformation {
    /*W backu id ma inną strukture, ale nie wiem jeszcze czy potrzebne
    id: string*/
    status: AnimeUserStatus;
    watchStartDate: Date;
    watchEndDate: Date;
    nrOfEpisodesSeen: number;
    isFavourite: boolean;
    didReview: boolean;
    review?: Review;
    grade?: Grade;
}

export interface Review {
    id?: number;
    reviewText: string;
    nrOfHelpful: number;
    nrOfPlus: number;
    nrOfMinus: number;
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