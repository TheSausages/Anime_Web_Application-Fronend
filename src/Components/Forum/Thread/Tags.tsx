import { Tag } from "../../../data/Forum/Tag";

import "../css/Tags.css";

interface TagsProps {
    tags: Tag[];
    className?: string;
}

export default function Tags(props: TagsProps) {

    return (
        <span className={`tags ${props.className}`}>
            {props.tags.map((tag: Tag) => (
                <span style={{ backgroundColor: tag.tagColor }} title={`Importance: ${tag.tagImportance}`} key={tag.tagId} >{tag.tagName}</span>
            ))}
        </span>
    )
}