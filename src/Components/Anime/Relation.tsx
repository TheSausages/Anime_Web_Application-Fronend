import { MediaEdge } from "../../data/MediaInformation"
import { Link } from 'react-router-dom';
import { Capitalize, titlesInWantedOrder, valueOrNotKnown } from "../../Scripts/Utilities";

interface RelationProps {
    key: number
    element: MediaEdge
    index: number
    wrap?: boolean
    renderValue?: boolean
}

export default function Relation(props: RelationProps) {
    if (props.wrap) {
        return (
            <div className={`${props.renderValue ? 'rowWrapper' : ''}`}>
                { code(props.index, props.element) }
            </div>
        )
    } else {
        return (
            code(props.index, props.element)
        )
    }
}

function code(index: number, element: MediaEdge) {
    return (
        <div key={index} className="SectionItem">
            {
                (element.node.type !== "ANIME") ?
                    <Link key={index} to="#" title={titlesInWantedOrder(element.node.title)} className={"noPointer"} ><img src={element.node.coverImage.medium} alt="Cover" /></Link>
                :
                    <Link  key={index} to={'/anime/' + element.node.id + '/'} title={titlesInWantedOrder(element.node.title)} >
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