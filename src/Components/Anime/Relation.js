import { Link } from 'react-router-dom';
import { titlesInWantedOrder, valueOrNotKnown } from "../../Scripts/Utilities"
import './css/Anime.css';

export default function Relation(props) {
    if (props.wrap) {
        return (
            <div className={`${props.renderValue ? 'rowWrapper' : ''}`}>
                { code(props.index, props.elem) }
            </div>
        )
    } else {
        return (
            code(props.index, props.elem)
        )
    }
}

function code(index, elem) {
    return (
        <div key={index} className="SectionItem">
            {
                (elem.node.type !== "ANIME") ?
                    <Link key={index} to="#" title={titlesInWantedOrder(elem.node.title)} className={"noPointer"} ><img src={elem.node.coverImage.medium} alt="Cover" /></Link>
                :
                    <Link  key={index} to={'/anime/' + elem.node.id + '/'} title={titlesInWantedOrder(elem.node.title)} >
                        <img src={elem.node.coverImage.medium} alt="Cover" />
                    </Link>
            }

            <div className="SectionItemInfo" id={`relation${elem.node.id}`}>
                <div className="SectionItemInfoInfoValue">
                    <div>{valueOrNotKnown(elem.relationType)}</div>
                    <div>{titlesInWantedOrder(elem.node.title)}</div>
                    <div>{valueOrNotKnown(elem.node.status) + " | " + valueOrNotKnown(elem.node.type)}</div>
                </div>
            </div>
        </div>
    )
}