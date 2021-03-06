import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading'
import { Capitalize, checkIfObjectIsEmpty } from "../../Scripts/Utilities"
import { AnimeService } from '../../Scripts/Services/AnimeService';
import { CurrentSeasonInformation } from '../../data/Anime/Smaller/MainPageInterfaces';
import { BackendError } from '../../data/General/BackendError';
import { snackbarError } from '../../data/General/SnackBar';
import { useCallback } from 'react';
import AnimeLink from '../AnimeLink/AnimeLink';
import useBasicState from '../../data/General/BasicState';

import './css/MainPage.css';
import '../Miscellaneous/css/Line.css';

/**
 * The props for the {@link MainPageProps} component.
 */
export interface MainPageProps {
}

/**
 * Main page of the website. 
 * After logout, users will be redirected here.
 * @param props {@link MainPageProps}
 */
export default function MainPage(props: MainPageProps) {
    const [currectSeason, setCurrectSeason] = useState<CurrentSeasonInformation>();
    const { loading, error, startLoading, stopLoading, snackbar, setErrorMessage, t, i18n } = useBasicState()

    const getCurrentAnime = useCallback(async () => {
        await AnimeService.getCurrentSeasonAnime(t, i18n)
        .then((result: CurrentSeasonInformation) => {
            setCurrectSeason(result)
        })
        .catch((error: BackendError) => {
            setErrorMessage(error.message)
            snackbar(error.message,  snackbarError )
        })
    }, [setErrorMessage, snackbar, t, i18n])

    useEffect(() => {
        startLoading()

        getCurrentAnime()

        stopLoading()

        /* After logout user is redirected here, and we need to block memory leak by cleaning */
        return () => {
            setCurrectSeason({} as CurrentSeasonInformation)
        }
    }, [getCurrentAnime, startLoading, stopLoading]);

    if (loading || error || !currectSeason || checkIfObjectIsEmpty(currectSeason)) {
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