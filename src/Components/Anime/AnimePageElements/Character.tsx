import { CharacterEdge } from "../../../data/Anime/CharacterInformation"
import { Capitalize, valueOrNotKnown } from "../../../Scripts/Utilities"

interface CharacterProps {
    key: number
    element: CharacterEdge
    index: number
}

export default function Character(props: CharacterProps) {
    const { element, index } = props;

    if (element.voiceActors.length > 0) {
        return (
            <div key={index} className="SectionItem">
                <img src={element.node.image.medium} alt="Cover" />
            
                <div className="SectionItemInfo withMoreWidth" id={`relation${element.node.id}`}>
                    <div className="SectionItemInfoWithPicture">
                        <div>
                            <div>{valueOrNotKnown(element.node.name.full, "", false)}</div>
                            <div>{Capitalize(valueOrNotKnown(element.role))}</div>
                        </div>
    
                        {
                            whenVoiceActor(element) 
                        }
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div key={index} className="SectionItem">
                <img src={element.node.image.medium} alt="Cover" />
            
                <div className="SectionItemInfo Character" id={`relation${element.node.id}`}>
                    <div className="SectionItemInfoInfoValue">
                        <div>{valueOrNotKnown(element.node.name.full, "", false)}</div>
                        <div>{Capitalize(valueOrNotKnown(element.role))}</div>
                    </div>
                </div>
            </div>
        )
    }
}

function whenVoiceActor(element: CharacterEdge) {
    return (
        <div className="withPicture">
            <div>
                <div>{valueOrNotKnown(element.voiceActors[0].name.full, "", false)}</div>
                <div>{valueOrNotKnown(element.voiceActors[0].languageV2)}</div>
            </div>

            <div>
                <img src={element.voiceActors[0].image.medium} alt="Portrait" />
            </div>
        </div>
    )
}