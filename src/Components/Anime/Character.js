import { Link } from 'react-router-dom';
import { titlesInWantedOrder, valueOrNotKnown } from "../../Scripts/Utilities"
import './css/Anime.css';

export default function Character(props) {
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
                <img src={elem.node.image.medium} alt="Cover" />
            }

            <div className="SectionItemInfo withMoreWidth" id={`relation${elem.node.id}`}>
                <div className="SectionItemInfoWithPicture">
                    <div>
                        <div>{valueOrNotKnown(elem.node.name.full, "", false)}</div>
                        <div>{valueOrNotKnown(elem.role)}</div>
                    </div>

                    <div>
                        <div>{valueOrNotKnown(elem.voiceActors[0].name.full)}</div>
                        <div>{valueOrNotKnown(elem.voiceActors[0].languageV2)}</div>
                    </div>

                    <div>
                        <img src={elem.voiceActors[0].image.medium} alt="Portrait" />
                    </div>
                </div>
            </div>
        </div>
    )
}