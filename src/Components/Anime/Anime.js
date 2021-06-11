import React, { useEffect, useState } from 'react';
import { getAnimeById } from '../../Scripts/AnimeFetch'
import { findFirstNotUndefined } from "../../Scripts/Utilities"
import Loading from '../Loading'
import '../ComponentsCss/Anime.css';

export default function Anime(props) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(async () => {
            try {
                setLoading(true);

                let result = await getAnimeById(props.match.params.id);
                setData({
                    Anime: result.data.Media 
                });


                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError(error)
            }
    }, []);

    if (loading) {
        return <Loading />
    }

    if (!data) {
        return <span>Data not available with error: {error}</span>;
    }

    return (
        <div id="AnimePageLayout">
            <div className='line'>
                <p id="MainTitle">{findFirstNotUndefined(data.Anime.title)}</p>

                <p>{}</p>
            </div>

            <div id="AnimeInformationPage">
                <div>
                    <img src={data.Anime.coverImage.large} alt='new'></img> 
                </div>

                <div>
                    {data.Anime.id}
                </div>
            </div>
        </div>
    )
}