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
}