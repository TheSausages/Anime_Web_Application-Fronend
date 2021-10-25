import { useState } from "react"
import { CharacterEdge } from "../../../data/Anime/CharacterInformation"
import { MediaEdge } from "../../../data/Anime/MediaInformation"
import Character from "./Character"
import Relation from "../AnimePageElements/Relation"
import { isTooManySections, spliceArrayIfNeeded } from "../../Section/SectionUrils"

import "../css/AnimeDetails.css";
import "../../Section/css/Section.css"
import { useTranslation } from "react-i18next"

interface AnimeDetailsProps {
    relationEdges: MediaEdge[];
    characterEdges: CharacterEdge[];
}

type ElementsWithRows = "relations" |"characters"

export function AnimeDetails(props: AnimeDetailsProps) {
    const { relationEdges, characterEdges } = props;
    const { t } = useTranslation();

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
                    <div className="line">
                        {
                            isTooManySections(relationEdges) ?
                                <p className="linkPointer unCopyable" onClick={() => changeRowState('relations')}>{t("anime.relations")} | {findRowState('relations') ? t("anime.clickToShowMore") : t("anime.clickToShowLess")}</p>
                            :
                                <p>{t("anime.relations")}</p>
                        }

                        <div id="Section">
                            {
                                spliceArrayIfNeeded(relationEdges, findRowState('relations'))
                                .map((elem, index) => {
                                    return <Relation key={index} element={elem} index={index} />
                                })
                            }
                        </div>
                    </div>

                    {/*Characters*/}
                    <div className="line" >
                        {
                            isTooManySections(characterEdges) ? 
                                <p className="linkPointer unCopyable" onClick={() => changeRowState('characters')}>{t("anime.charaters")} | {findRowState('characters') ? t("anime.clickToShowMore") : t("anime.clickToShowLess")}</p>
                            :
                                <p>{t("anime.characters")}</p>
                        }

                        <div id="Section">
                            {
                                spliceArrayIfNeeded(characterEdges, findRowState('characters'))
                                .map((elem, index) => {
                                    return <Character key={index} element={elem} index={index} />
                                })
                            }
                        </div>
                    </div>
                </div>
    )
}