import { TagImportance } from "./Types";

export interface Tag {
    tagId: number;
    tagName: string;
    tagImportance: TagImportance;
}