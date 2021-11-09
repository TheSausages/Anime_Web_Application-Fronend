import { TFunction } from "react-i18next";
import { MediaB } from "../../../data/Anime/MediaInformation";
import useBasicState from "../../../data/General/BasicState";
import { getRandomColor, ValueOrNotKnown, Capitalize, DateOrNotKnown } from "../../../Scripts/Utilities";

import "../css/BasicAnimeInformation.css"

interface AnimeBasicInformationProps {
    anime: MediaB;
}

interface BasinAnimeInformationArrayElement {
    name: string;
    value: string | number;
}

export function AnimeBasicInformation(props: AnimeBasicInformationProps) {
    const { t } = useBasicState();

    return (
        <div className="AnimeBasicInformation">
            {createBasinAnimeInformationArray(props.anime, t).map((elem: BasinAnimeInformationArrayElement, index) => {
                return (
                    <div key={index}>
                        <div className='line' style={{ 'borderBottom': '1px solid ' + getRandomColor(true)}} id="noMargin"><p>{elem.name}</p></div>
                        <div>{elem.value}</div>
                    </div>
                )
            })}   
        </div>
    );
}

function createBasinAnimeInformationArray(results: MediaB, t: TFunction): Array<BasinAnimeInformationArrayElement> {
    let scr = results.localAnimeInformation?.averageScore;
    let localAverageScore = scr && scr !== 0 ? ValueOrNotKnown(`${results.localAnimeInformation?.averageScore}%`) : t("anime.animeInformation.noScoreSubmitted")

    return [
        {
            name: t("anime.animeInformation.ariringSeason"),
            value: ValueOrNotKnown(`${results.season} ${results.seasonYear}`)
        },
        {
            name: t("anime.animeInformation.status"),
            value: Capitalize(ValueOrNotKnown(results.status))
        },
        {
            name: t("anime.animeInformation.format"),
            value: ValueOrNotKnown(results.format)
        },
        {
            name: t("anime.animeInformation.nrOfEpisodes"),
            value: ValueOrNotKnown(results.episodes)
        },
        {
            name: t("anime.animeInformation.episodeLength"),
            value: ValueOrNotKnown(results.duration)
        },
        {
            name: t("anime.animeInformation.startDate"),
            value: DateOrNotKnown(results.startDate)
        },
        {
            name: t("anime.animeInformation.endDate"),
            value: DateOrNotKnown(results.endDate)
        },
        {
            name: t("anime.animeInformation.averageScore", { service: "BackAni" }),
            value: localAverageScore
        },
        {
            name: t("anime.animeInformation.averageScore", { service: "Anilist" }),
            value: ValueOrNotKnown(`${results.averageScore}%`)
        },
        {
            name: t("anime.animeInformation.favourites", { service: "BackAni" }),
            value: ValueOrNotKnown(results.localAnimeInformation?.nrOfFavourites)
        },
        {
            name: t("anime.animeInformation.averageScore", { service: "Anilist" }),
            value: ValueOrNotKnown(results.favourites)
        },
        {
            name: t("anime.animeInformation.nrOfReviews", { service: "BackAni" }),
            value: ValueOrNotKnown(results.localAnimeInformation?.nrOfReviews)
        }
    ]
}