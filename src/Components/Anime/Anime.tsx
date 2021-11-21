import parse from 'html-react-parser';
import { useEffect, useState } from "react";
import { MediaB } from "../../data/Anime/MediaInformation";
import { AnimeService } from "../../Scripts/Services/AnimeService";
import { checkIfLoggedIn, getRandomColor, TitlesInWantedOrder } from "../../Scripts/Utilities";
import Loading from '../Loading/Loading';
import { AnimeBasicInformation } from './AnimePageElements/BasicAnimeInformation';
import { Description as Description } from './AnimePageElements/Description';
import { AnimeDetails } from './AnimePageElements/AnimeDetails';
import UserAnimeInformation from './AnimePageElements/UserAnimeInformation';
import { BackendError } from '../../data/General/BackendError';
import { snackbarError } from '../../data/General/SnackBar';
import { useCallback } from 'react';
import useBasicState from '../../data/General/BasicState';

import "./css/Anime.css"

/**
 * The props for the {@link Anime} component.
 */
export interface AnimeProps {
    /** Id of the Anime that will be searched */
    id: number
}

/**
 * Component that created the site for the detailed Anime Information.
 * @returns Site with detailed information on an Anime.
 */
export default function Anime(props: AnimeProps) {
    const [Anime, setAnime] = useState<MediaB>({} as MediaB);
    const { loading, error, startLoading, stopLoading, snackbar, setErrorMessage, t, i18n } = useBasicState()

    const getAnime = useCallback(async () => {
        await AnimeService.getAnimeById(props.id, t, i18n)
        .then((response: MediaB) => {
            setAnime(response);
        })
        .catch((error: BackendError) => {
            setErrorMessage(error.message)
            snackbar(error.message,  snackbarError)
        })
    }, [setErrorMessage, snackbar, props.id, t, i18n])

    useEffect(() => {
        startLoading()

        getAnime();
        
        stopLoading()
    }, [getAnime, props.id, startLoading, stopLoading]);

    if (loading || Object.keys(Anime).length === 0) {
        return <Loading error={error} />
    }

    return (
        <div id="AnimePageLayout">
            <div className='line'>
                <p id="MainTitle">{parse(TitlesInWantedOrder(Anime.title, t))}</p>
            </div>

            <div className="AnimeInformationPage">
                {/*Image*/}
                <div className="animeImage">
                    <img src={Anime.coverImage.large} style={{ 'border': '1px solid ' + getRandomColor() }} alt='Cover'></img> 
                </div>

                {
                    /*AnimeUserInformation*/
                    checkIfLoggedIn() ?
                        <UserAnimeInformation
                            airedEpisodes={airedEpisodes(Anime)} 
                            animeUserInformation={Anime.animeUserInformation} 
                            animeStartDate={Anime.startDate}
                        />
                    :
                        // TODO zrobić przycisk który powie żeby się zalogować aby dodać dane
                        <div className="animeUserInformation"></div>
                }

                {/*Basic Anime Information*/}
                <AnimeBasicInformation anime={Anime} />

                {/*Description and social buttons*/}
                <Description description={Anime.description} />

                {/*Anime Details*/}
                <AnimeDetails characterEdges={Anime.characters.edges!} relationEdges={Anime.relations.edges!} reviews={Anime.reviews} />
            </div>
        </div>
    )
}

function airedEpisodes(Anime: MediaB): number {
    if (Anime.nextAiringEpisode && Anime.nextAiringEpisode.episode) {
        return Anime.nextAiringEpisode.episode
    }
    return Anime.episodes
}