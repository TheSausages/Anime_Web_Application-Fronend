import { MediaEdge } from "../../../data/Anime/MediaInformation"
import { Link } from 'react-router-dom';
import { Capitalize, titlesInWantedOrder, valueOrNotKnown } from "../../../Scripts/Utilities";

interface RelationProps {
    key: number
    element: MediaEdge
    index: number
}

export default function Relation(props: RelationProps) {
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
                        <div>{Capitalize(valueOrNotKnown(element.relationType))}</div>
                        <div>{titlesInWantedOrder(element.node.title)}</div>
                        <div>{valueOrNotKnown(element.node.status) + " | " + valueOrNotKnown(element.node.type)}</div>
                    </div>
                </div>
        </div>
    )
}