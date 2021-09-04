import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading'
import { Capitalize } from "../../Scripts/Utilities"
import { AnimeService } from '../../Scripts/Services/AnimeService';
import { CurrentSeasonInformation } from '../../data/Anime/Smaller/MainPageInterfaces';
import { BackendError } from '../../data/General/BackendError';
import { useSnackbar } from 'notistack';
import { snackbarError } from '../../data/General/SnackBar';
import { useCallback } from 'react';
import AnimeLink from '../AnimeLink/AnimeLink';

import './css/MainPage.css';
import '../Miscellaneous/css/Line.css';

interface MainPageProps {
}

export default function MainPage(props: MainPageProps) {
    const [currectSeason, setCurrectSeason] = useState<CurrentSeasonInformation>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();
    const { enqueueSnackbar } = useSnackbar();

    const getCurrentAnime = useCallback(async () => {
        await AnimeService.getCurrentSeasonAnime()
        .then((result: CurrentSeasonInformation) => {
            setCurrectSeason(result)
        })
        .catch((error: BackendError) => {
            setError(error.message)
            enqueueSnackbar(error.message,  snackbarError )
        })
    }, [enqueueSnackbar])

    useEffect(() => {
        try {
            setLoading(true);

            getCurrentAnime();

            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError("An unknown Error occured!")
        }
    }, [getCurrentAnime]);

    if (loading || !currectSeason) {
        return <Loading error={error}/>
    }

    return(
        <div>
            <div className='seasonalAnimeContainer'>
                <div className='line'>
                    <p>{Capitalize(currectSeason.currentSeason.season) + ' ' + currectSeason.currentSeason.year} Season</p>
                </div>

                <AnimeLink elements={currectSeason.media} id="seasonalAnime" />
            </div>
        </div>
        )
}

/*
<div className='buttonHover buttonLeft'  onClick={() => scrollElementRight('seasonalAnime')}>{'<'}</div>
<div className='buttonHover buttonRight' onClick={() => scrollElementLeft('seasonalAnime')}>{'>'}</div>

function scrollElementRight(element: string) {
    document.getElementById(element)!.scrollLeft -= (window.innerWidth < 960 ? window.innerWidth * 0.795 : window.innerWidth * 0.70)
}

function scrollElementLeft(element: string) {
    document.getElementById(element)!.scrollLeft += (window.innerWidth < 960 ? window.innerWidth * 0.795 : window.innerWidth * 0.70)
}*/