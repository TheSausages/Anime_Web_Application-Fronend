import React, { useEffect, useState } from 'react';
import { getAnimeById } from '../../Scripts/AnimeFetch'
import { findFirstNotUndefined } from "../../Scripts/Utilities"
import Loading from '../Loading/Loading'
import './css/Anime.css';

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
                        Anime: result.data.Media 
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