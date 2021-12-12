import { CharacterEdge } from "../../../data/Anime/CharacterInformation"
import { Capitalize, ValueOrNotKnown } from "../../../Scripts/Utilities"

/**
 * The props for the {@link Character} component.
 */
export interface CharacterProps {
    /** Key used when component is part of a list. */
    key: number;

    /** Displayed character information. */
    element: CharacterEdge;

    /** Index used when component is part of a list. */
    index: number;
}

/**
 * Component for displaying information on a character.
 * When hovering over the character, additional information is displayed.
 * @param props {@link CharacterProps}
 */
export default function Character(props: CharacterProps) {
    const { element, index } = props;

    if (element.voiceActors.length > 0) {
        return (
            <div key={index} className="SectionItem">
                <img src={element.node.image.medium} alt="Cover" />
            
                <div className="SectionItemInfo withMoreWidth" id={`relation${element.node.id}`}>
                    <div className="SectionItemInfoWithPicture">
                        <div>
                            <div>{ValueOrNotKnown(element.node.name.full, false)}</div>
                            <div>{Capitalize(ValueOrNotKnown(element.role))}</div>
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
                        <div>{ValueOrNotKnown(element.node.name.full, false)}</div>
                        <div>{Capitalize(ValueOrNotKnown(element.role))}</div>
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
                <div>{ValueOrNotKnown(element.voiceActors[0].name.full, false)}</div>
                <div>{ValueOrNotKnown(element.voiceActors[0].languageV2)}</div>
            </div>

            <div>
                <img src={element.voiceActors[0].image.medium} alt="Portrait" />
            </div>
        </div>
    )
}