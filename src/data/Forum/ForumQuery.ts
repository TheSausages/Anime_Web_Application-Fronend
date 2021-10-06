import { NestedValue } from "react-hook-form";
import { ForumCategory } from "./ForumCategory";
import { Tag } from "./Tag";
import { ThreadStatus } from "./Types";

export interface ForumQuery {
    minCreation?: Date;
    maxCreation?: Date;
    minModification?: Date;
    maxModification?: Date;
    minNrOfPosts?: number | "";
    maxNrOfPosts?: number | "";
    category?: ForumCategory;
    title?: string;
    creatorUsername?: string;
    tags?: NestedValue<Tag[]>;
    status?: ThreadStatus;
}