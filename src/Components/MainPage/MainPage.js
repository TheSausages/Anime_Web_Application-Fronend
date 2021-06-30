import React, { useEffect, useState } from 'react';
import { getCurrentSeasonInformation, getCurrentSeasonAnime } from '../../Scripts/CurrentSeasonFetches';
import Loading from '../Loading/Loading'
import { Link } from "react-router-dom";
import { findFirstNotUndefined, Capitalize } from "../../Scripts/Utilities"
import { useAuth } from '../AuthenticationAndLogin/Auth'
import './css/MainPage.css';
import '../MiscellaneousCss/Line.css';


export default function MainPage() {
    let auth = useAuth();
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
                {/*
                   <div>Token: {auth.accessToken ? auth.accessToken : 'no Token'}</div> 
                    <div>
                    <button onClick={() => aa(auth.accessToken)}>AAAAAAAAAAA</button>
                    </div> 
                */}

                <div className='line'>
                    <p>{Capitalize(data.Anime.currentSeason.season) + ' ' + data.Anime.currentSeason.year} Season</p>
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

function aa(accessToken) {
    fetch('http://localhost:8080/aa', {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + accessToken
        }
    })
    .then(data => data.json());
}