import { Tag } from "@material-ui/icons";
import { TagImportance } from "./Types";

export interface Tag {
    tagId: number;
    tagName: string;
    tagImportance: TagImportance;
    tagColor: string;
}