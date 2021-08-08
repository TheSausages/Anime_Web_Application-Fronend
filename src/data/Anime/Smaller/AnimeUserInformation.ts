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
    review: Review;
    grade: Grade;
}

export interface Review {
    id: number;
    reviewText: string;
    nrOfHelpful: number;
    nrOfPlus: number;
    nrOfMinus: number;
}

export interface Grade {
    id: number;
    scale: number;
    gradeName: string;
}