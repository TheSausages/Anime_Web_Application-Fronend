import React, { useEffect, useState } from 'react';
import { getCurrentSeasonInformation, getCurrentSeasonAnime } from '../../Scripts/CurrentSeasonFetches';
import { Capitalize } from '../../Scripts/Capitalize';
import Loading from '../Loading'
import { Link } from "react-router-dom";
import { findFirstNotUndefined } from "../../Scripts/Utilities"
//import { useAuth } from '../AuthenticationAndLogin/Auth'
import '../ComponentsCss/MainPage.css';


export default function MainPage() {
    //let auth = useAuth();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        try {
            setLoading(true);

            setData(
                { Anime: {
                    currentSeason: await getCurrentSeasonInformation(),
                    currentSeasonAnime: await getCurrentSeasonAnime()
                }
            });

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log('Error' + error)
        }
    }, []);

    if (loading) {
        return <Loading />
    }

    if (!data) {
        return <span>Data not available</span>;
    }

    return(
        <div>
            <div className='seasonalAnimeContainer'>
                <div className='line'>
                    <p>{Capitalize(data.Anime.currentSeason.season) + ' ' + data.Anime.currentSeason.year} Season</p>
                    <p></p>
                </div>
                
                <div className='buttonHover buttonLeft'  onClick={() => scrollElementRight('seasonalAnime')}>{'<'}</div>
                <div className='buttonHover buttonRight' onClick={() => scrollElementLeft('seasonalAnime')}>{'>'}</div>

                <div className='seasonalAnime' id='seasonalAnime'>
                    {data.Anime.currentSeasonAnime.data.Page.media.map((anime, index) => {
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