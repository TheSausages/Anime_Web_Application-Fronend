import { MediaEdge } from "../../../data/Anime/MediaInformation"
import { Link } from 'react-router-dom';
import { Capitalize, TitlesInWantedOrder, ValueOrNotKnown } from "../../../Scripts/Utilities";
import { useTranslation } from "react-i18next";

interface RelationProps {
    key: number
    element: MediaEdge
    index: number
}

export default function Relation(props: RelationProps) {
    const { t } = useTranslation();
    const { element, index } = props;
    

    return (
        <div key={index} className='SectionItem'>
            {
                    (element.node.type !== "ANIME") ?
                        <Link key={index} to="#" className={"noPointer"} ><img src={element.node.coverImage.medium} alt="Cover" /></Link>
                    :
                        <Link  key={index} to={'/anime/' + element.node.id + '/'} >
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