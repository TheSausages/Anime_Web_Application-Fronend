import { MediaEdge } from "../../../data/Anime/MediaInformation"
import { Link } from 'react-router-dom';
import { Capitalize, TitlesInWantedOrder, ValueOrNotKnown } from "../../../Scripts/Utilities";
import { useTranslation } from "react-i18next";

/**
 * The props for the {@link Relation} component.
 */
export interface RelationProps {
    /** Key used when the component is part of a list. */
    key: number

    /** Displayed relation information. */
    element: MediaEdge

    /** Index used when the component is part of a list. */
    index: number
}

/**
 * Component for diplaying relation information between diffrent media.
 * If the media in an Anime, it will have a link to it. 
 * When hovering over an item, additional information will be displayed.
 */
export default function Relation(props: RelationProps) {
    const { t } = useTranslation();
    const { element, index } = props;
    

    return (
        <div key={index} className='SectionItem'>
            {
                    (element.node.type !== "ANIME") ?
                        <Link key={index} to="#" className={"noPointer"} ><img src={element.node.coverImage.medium} alt="Cover" /></Link>
                    :
                        <Link  key={index} to={`/anime/${element.node.id}`} >
                            <img src={element.node.coverImage.medium} alt="Cover" />
                        </Link>
                }

                <div className="SectionItemInfo" id={`relation${element.node.id}`}>
                    <div className="SectionItemInfoInfoValue">
                        <div>{Capitalize(ValueOrNotKnown(element.relationType))}</div>
                        <div>{TitlesInWantedOrder(element.node.title, t)}</div>
                        <div>{ValueOrNotKnown(element.node.status) + " | " + ValueOrNotKnown(element.node.type)}</div>
                    </div>
                </div>
        </div>
    )
}