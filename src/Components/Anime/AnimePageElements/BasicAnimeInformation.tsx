import { TFunction, useTranslation } from "react-i18next";
import { MediaB } from "../../../data/Anime/MediaInformation";
import { getRandomColor, valueOrNotKnown, Capitalize, dateOrNotKnown } from "../../../Scripts/Utilities";

import "../css/BasicAnimeInformation.css"

interface AnimeBasicInformationProps {
    anime: MediaB;
}

export function AnimeBasicInformation(props: AnimeBasicInformationProps) {
    const { t } = useTranslation();

    return (
        <div className="AnimeBasicInformation">
            {createBasinAnimeInformationMap(props.anime, t).map((elem, index) => {
                return (
                    <div key={index}>
                        <div className='line' style={{ 'borderBottom': '1px solid ' + getRandomColor()}} id="noMargin"><p>{elem.name}</p></div>
                        <div>{elem.value}</div>
                    </div>
                )
            })}   
        </div>
    );
}

function createBasinAnimeInformationMap(results: MediaB, t: TFunction<"translation">) {
    let scr = results.localAnimeInformation?.averageScore;
    let localAverageScore = scr && scr !== 0 ? valueOrNotKnown(`${results.localAnimeInformation?.averageScore}%`) : t("anime.animeInformation.noScoreSubmitted")

    return [
        {
            name: t("anime.animeInformation.ariringSeason"),
            value: valueOrNotKnown(`${results.season} ${results.seasonYear}`)
        },
        {
            name: t("anime.animeInformation.status"),
            value: Capitalize(valueOrNotKnown(results.status))
        },
        {
            name: t("anime.animeInformation.format"),
            value: valueOrNotKnown(results.format)
        },
        {
            name: t("anime.animeInformation.nrOfEpisodes"),
            value: valueOrNotKnown(results.episodes)
        },
        {
            name: t("anime.animeInformation.episodeLength"),
            value: valueOrNotKnown(results.duration)
        },
        {
            name: t("anime.animeInformation.startDate"),
            value: dateOrNotKnown(results.startDate)
        },
        {
            name: t("anime.animeInformation.endDate"),
            value: dateOrNotKnown(results.endDate)
        },
        {
            name: t("anime.animeInformation.averageScore", { service: "BackAni" }),
            value: localAverageScore
        },
        {
            name: t("anime.animeInformation.averageScore", { service: "Anilist" }),
            value: valueOrNotKnown(`${results.averageScore}%`)
        },
        {
            name: t("anime.animeInformation.favourites", { service: "BackAni" }),
            value: valueOrNotKnown(results.localAnimeInformation?.nrOfFavourites)
        },
        {
            name: t("anime.animeInformation.averageScore", { service: "Anilist" }),
            value: valueOrNotKnown(results.favourites)
        },
        {
            name: t("anime.animeInformation.nrOfReviews", { service: "BackAni" }),
            value: valueOrNotKnown(results.localAnimeInformation?.nrOfReviews)
        }
    ]
}