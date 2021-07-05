import React, { useEffect, useState } from 'react';
import { getCurrentSeasonInformation, getCurrentSeasonAnime } from '../../Scripts/CurrentSeasonFetches';
import Loading from '../Loading/Loading'
import { Link } from "react-router-dom";
import { findFirstNotUndefined, Capitalize } from "../../Scripts/Utilities"
import './css/MainPage.css';
import '../MiscellaneousCss/Line.css';


export default function MainPage() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        try {
            setLoading(true);

            async function wrapper() {
                let result = await getCurrentSeasonAnime();
                setData(
                    { Anime: {
                        currentSeason: result.seasonInformation,
                        currentSeasonAnime: result.media
                    }
                });
            }

            wrapper();

            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    }, []);

    if (loading || !data) {
        return <Loading error={error}/>
    }

    console.log(data.Anime)

    return(
        <div>
            <div className='seasonalAnimeContainer'>
                <div className='line'>
                    <p>{Capitalize(data.Anime.currentSeason.season) + ' ' + data.Anime.currentSeason.year} Season</p>
                </div>
                
                <div className='buttonHover buttonLeft'  onClick={() => scrollElementRight('seasonalAnime')}>{'<'}</div>
                <div className='buttonHover buttonRight' onClick={() => scrollElementLeft('seasonalAnime')}>{'>'}</div>

                <div className='seasonalAnime' id='seasonalAnime'>
                    {data.Anime.currentSeasonAnime.map((anime, index) => {
                        return (
                            <Link key={index} to={'/anime/' + anime.id + '/'} title={findFirstNotUndefined(anime.title)}>
                                <img src={anime.coverImage.large} alt='new'></img>
                                <p title={findFirstNotUndefined(anime.title)}></p>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
        )
}

function scrollElementRight(element) {
    document.getElementById(element).scrollLeft -= (window.innerWidth < 960 ? window.innerWidth * 0.795 : window.innerWidth * 0.75)
}

function scrollElementLeft(element) {
    document.getElementById(element).scrollLeft += (window.innerWidth < 960 ? window.innerWidth * 0.795 : window.innerWidth * 0.75)
}