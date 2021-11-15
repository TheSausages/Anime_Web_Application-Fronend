import { useState } from "react"
import { CharacterEdge } from "../../../data/Anime/CharacterInformation"
import { MediaEdge } from "../../../data/Anime/MediaInformation"
import Character from "./Character"
import RelationComponent from "./Relation"
import { isTooManySections, spliceArrayIfNeeded } from "../../Section/SectionUrils"
import { useTranslation } from "react-i18next"
import { Review } from "../../../data/Anime/Smaller/AnimeUserInformation"
import _ from "lodash"
import ReviewComponent from "./ReviewComponent"

import "../css/AnimeDetails.css";
import "../../Section/css/Section.css"

interface AnimeDetailsProps {
    reviews: Review[];
    relationEdges: MediaEdge[];
    characterEdges: CharacterEdge[];
}

type ElementsWithRows = "relations" |"characters"

export function AnimeDetails(props: AnimeDetailsProps) {
    const { relationEdges, characterEdges, reviews } = props;
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
                                    return <RelationComponent key={index} element={elem} index={index} />
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

                    {/*Reviews*/}
                    <div className="line">
                        <p>{t("anime.reviews")}</p>

                        <div className="ReviewsAnime">
                        {
                            _.sampleSize(reviews, 3)
                            .map((value: Review, index) => (
                                <ReviewComponent review={value} key={index} />
                            ))
                        }
                </div>
                    </div>
                </div>
    )
}