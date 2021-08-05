import { useState } from "react"
import { CharacterEdge } from "../../../data/Anilist/CharacterInformation"
import { MediaEdge } from "../../../data/Anilist/MediaInformation"
import Character from "../Character"
import Relation from "../Relation"

import "../css/AnimeDetails.css";

interface AnimeDetailsProps {
    relationEdges: MediaEdge[];
    characterEdges: CharacterEdge[];
}

type ElementsWithRows = "relations" |"characters"

export function AnimeDetails(props: AnimeDetailsProps) {
    const { relationEdges, characterEdges } = props;

    const [showRows, setShowRows] = useState<{ fieldName: ElementsWithRows, value: boolean }[]>([
        { fieldName: "relations", value: true },
        { fieldName: "characters", value: true }
    ])

    function findRowState(fieldName: ElementsWithRows) {
        return showRows.find(elem => elem.fieldName === fieldName)!.value
    }

    function changeRowState(fieldName: ElementsWithRows) {
        let rows = [...showRows]

        rows.find(elem => elem.fieldName === fieldName)!.value = !findRowState(fieldName)

        setShowRows(rows)
    }

    return (
        <div className="AnimeDetails">

                    {/*Relations*/}
                    <div className="line" >
                        {
                            ((window.innerWidth > 960 && relationEdges!.length > 5) || (window.innerWidth < 960 && relationEdges!.length > 2) ) ? 
                                <p className="linkPointer unCopyable" onClick={() => changeRowState('relations')}>Relations | Click to show {findRowState('relations') ? 'More' : 'Less'}</p>
                            :
                                <p>Relations</p>
                        }

                        <div id="Section">
                        {
                            relationEdges!
                            .slice(0,  (window.innerWidth > 960 ? 5 : 2))
                            .map((elem, index) => {
                                return <Relation key={index} element={elem} index={index}/>
                            })
                        }
                        {
                            relationEdges!
                            .slice((window.innerWidth > 960 ? 5 : 2))
                            .map((elem, index) => {
                                return <Relation key={index} element={elem} index={index} wrap={true} renderValue={findRowState('relations')}/>
                            })
                        }
                        </div>
                    </div>

                    {/*Characters*/}
                    <div className="line" >
                        {
                            ((window.innerWidth > 960 && characterEdges!.length > 5) || (window.innerWidth < 960 && characterEdges!.length > 2) ) ? 
                                <p className="linkPointer unCopyable" onClick={() => changeRowState('characters')}>Characters | Click to show {findRowState('characters') ? 'More' : 'Less'}</p>
                            :
                                <p>Characters</p>
                        }

                        <div id="Section">
                        {
                            characterEdges!
                            .slice(0,  (window.innerWidth > 960 ? 5 : 2))
                            .map((elem, index) => {
                                return <Character key={index} element={elem} index={index} />
                            })
                        }
                        {
                            characterEdges!
                            .slice((window.innerWidth > 960 ? 5 : 2))
                            .map((elem, index) => {
                                return <Character key={index} element={elem} index={index} wrap={true} renderValue={findRowState('characters')} />
                            })
                        }
                        </div>
                    </div>
                </div>
    )
}