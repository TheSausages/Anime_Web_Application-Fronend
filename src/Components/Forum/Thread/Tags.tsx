import { useTranslation } from "react-i18next";
import { Tag } from "../../../data/Forum/Tag";

import "../css/Tags.css";

interface TagsProps {
    tags: Tag[];
    className?: string;
}

export default function Tags(props: TagsProps) {
    const { t } = useTranslation();

    return (
        <span className={`tags ${props.className}`}>
            {props.tags.map((tag: Tag) => (
                <span style={{ backgroundColor: tag.tagColor }} title={`${t("forum.thread.generalThread.tagsImportance")}: ${tag.tagImportance}`} key={tag.tagId} >{tag.tagName}</span>
            ))}
        </span>
    )
}