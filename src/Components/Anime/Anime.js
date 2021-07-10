import React, { useEffect, useState } from 'react';
import { getAnimeById } from '../../Scripts/AnimeFetch'
import { dateOrNotKnown, getRandomColor, setRandomColor, titlesInWantedOrder, valueOrNotKnown } from "../../Scripts/Utilities"
import Loading from '../Loading/Loading'
import './css/Anime.css';
import parse from 'html-react-parser';

export default function Anime(props) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
            try {
                setLoading(true);

                async function wrapper() {
                    let result = await getAnimeById(props.match.params.id);
                    return setData({
                        Anime: result,

                        basicInfoMap: createBasinAnimeMap(result)
                    });
                }

                wrapper();
                
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError(error)
            }
    }, [props.match.params.id]);

    if (loading || !data) {
        return <Loading error={error}/>
    }

    console.log(data.Anime)

    return (
        <div id="AnimePageLayout">
            <div className='line'>
                <p id="MainTitle">{titlesInWantedOrder(data.Anime.title)}</p>

                <p>{}</p>
            </div>

            <div className="AnimeInformationPage">
                <div className="animeImage">
                    <img src={data.Anime.coverImage.large} style={{ 'border': '1px solid ' + getRandomColor() }} alt='new'></img> 
                </div>

                <div className="AnimeBasicInformation">
                    {data.basicInfoMap.map((elem, index) => {
                        return (
                            <div key={index}>
                                <div className='line' style={{ 'borderBottom': '1px solid ' + getRandomColor()}} id="noMargin"><p>{elem.name}</p></div>
                                <div>{elem.value}</div>
                            </div>
                        )
                    })}
                </div>

                <div className="AnimeDescription">
                    <div className="line">
                        <p>Description</p>
                    </div>

                    {parse(data.Anime.description)}
                </div>

                <div className="AnimeDetails">
                    AA
                </div>
            </div>
        </div>
    )
}


function createBasinAnimeMap(results) {
    return [
        {
            name: "Airing Season:",
            value: valueOrNotKnown(results.season + ' ' + results.seasonYear)
        },
        {
            name: "Status:",
            value: valueOrNotKnown(results.status)
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
            value: valueOrNotKnown(results.averageScore) + '%'
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