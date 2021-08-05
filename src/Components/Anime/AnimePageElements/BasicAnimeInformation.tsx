import { MediaB } from "../../../data/Anilist/MediaInformation";
import { getRandomColor, valueOrNotKnown, Capitalize, dateOrNotKnown } from "../../../Scripts/Utilities";

import "../css/BasicAnimeInformation.css"

interface AnimeBasicInformationProps {
    anime: MediaB
}

export function AnimeBasicInformation(props: AnimeBasicInformationProps) {
    return (
        <div className="AnimeBasicInformation">
                    {createBasinAnimeMap(props.anime).map((elem, index) => {
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

function createBasinAnimeMap(results: MediaB) {
    return [
        {
            name: "Airing Season:",
            value: valueOrNotKnown(results.season + ' ' + results.seasonYear)
        },
        {
            name: "Status:",
            value: Capitalize(valueOrNotKnown(results.status))
        },
        {
            name: "Format:",
            value: valueOrNotKnown(results.format)
        },
        {
            name: "Nr. of Episodes:",
            value: valueOrNotKnown(results.episodes)
        },
        {
            name: "Episode Length:",
            value: valueOrNotKnown(results.duration)
        },
        {
            name: "Start Date:",
            value: dateOrNotKnown(results.startDate)
        },
        {
            name: "End Date:",
            value: dateOrNotKnown(results.endDate)
        },
        {
            name: "BachAni Average Score:",
            value: "Not Implemented"
        },
        {
            name: "Anilist Average Score:",
            value: valueOrNotKnown(results.averageScore, '%')
        },
        {
            name: "BachAni Favourites:",
            value: "Not Implemented"
        },
        {
            name: "Anilist Favourites:",
            value: valueOrNotKnown(results.favourites)
        },
    ]
}