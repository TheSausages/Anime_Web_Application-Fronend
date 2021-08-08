import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading'
import { Link } from "react-router-dom";
import { Capitalize, getRandomColor, titlesInWantedOrder } from "../../Scripts/Utilities"
import './css/MainPage.css';
import '../MiscellaneousCss/Line.css';
import { AnimeService } from '../../Scripts/Services/AnimeService';
import { CurrectSeasonInformation } from '../../data/Anime/Smaller/MainPageInterfaces';

interface MainPageProps {
}

export default function MainPage(props: MainPageProps) {
    const [currectSeason, setCurrectSeason] = useState<CurrectSeasonInformation>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    async function wrapper() {
        let result = await AnimeService.getCurrentSeasonAnime();
        setCurrectSeason(result)
    }

    useEffect(() => {
        try {
            setLoading(true);

            wrapper();

            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    }, []);

    if (loading || !currectSeason) {
        return <Loading error={error}/>
    }

    return(
        <div>
            <div className='seasonalAnimeContainer'>
                <div className='line'>
                    <p>{Capitalize(currectSeason.currentSeason.season) + ' ' + currectSeason.currentSeason.year} Season</p>
                </div>
                
                <div className='buttonHover buttonLeft'  onClick={() => scrollElementRight('seasonalAnime')}>{'<'}</div>
                <div className='buttonHover buttonRight' onClick={() => scrollElementLeft('seasonalAnime')}>{'>'}</div>

                <div className='seasonalAnime' id='seasonalAnime'>
                    {currectSeason.media.map((anime, index) => {
                        return (
                            <Link key={index} to={'/anime/' + anime.id + '/'} title={titlesInWantedOrder(anime.title)}>
                                <img src={anime.coverImage.large} style={{ 'border': '1px solid ' + getRandomColor() }} alt='new'></img>
                                <p title={titlesInWantedOrder(anime.title)}></p>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
        )
}

function scrollElementRight(element: string) {
    document.getElementById(element)!.scrollLeft -= (window.innerWidth < 960 ? window.innerWidth * 0.795 : window.innerWidth * 0.70)
}

function scrollElementLeft(element: string) {
    document.getElementById(element)!.scrollLeft += (window.innerWidth < 960 ? window.innerWidth * 0.795 : window.innerWidth * 0.70)
}