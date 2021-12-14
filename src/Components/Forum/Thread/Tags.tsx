import { useTranslation } from "react-i18next";
import { Tag } from "../../../data/Forum/Tag";

import "../css/Tags.css";

/**
 * The props for the {@link Tags} component.
 */
export interface TagsProps {
    /** Tags to be shown. */
    tags: Tag[];

    /** Classname (html class) for the whole list. */
    className?: string;
}

/**
 * Small component for showing tags as a list.
 * If the list is too long, it will go to the next line.
 * @param props {@link TagsProps}
 */
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