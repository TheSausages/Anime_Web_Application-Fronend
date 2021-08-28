import parse from 'html-react-parser';
import { useEffect, useState } from "react";
import { MediaB } from "../../data/Anime/MediaInformation";
import { AnimeService } from "../../Scripts/Services/AnimeService";
import { getRandomColor, titlesInWantedOrder } from "../../Scripts/Utilities";
import Loading from '../Loading/Loading';
import { AnimeBasicInformation } from './AnimePageElements/BasicAnimeInformation';
import { DescriptionWithSocialButtons as Description } from './AnimePageElements/Description';
import { AnimeDetails } from './AnimePageElements/AnimeDetails';
import UserAnimeInformation from './AnimePageElements/UserAnimeInformation';
import { BackendError } from '../../data/General/BackendError';
import { useSnackbar } from 'notistack';
import { snackbarError } from '../../data/General/SnackBar';

import "./css/Anime.css"
import { useCallback } from 'react';

interface AnimeProps {
    id: number
}

export default function Anime(props: AnimeProps) {
    const [Anime, setAnime] = useState<MediaB>({} as MediaB);
    const [loading, setLoading] = useState<boolean>(true);
    const { enqueueSnackbar } = useSnackbar();
    const [error, setError] = useState();

    const getAnime = useCallback(async (id: number) => {
        await AnimeService.getAnimeById(id)
        .then((response: MediaB) => {
            setAnime(response);
        })
        .catch((error: BackendError) => {
            enqueueSnackbar(error.message,  snackbarError )
        })
    }, [enqueueSnackbar])

    useEffect(() => {
        try {
            /*used to make the page to use Loading component*/
            setAnime({} as MediaB)
            setLoading(true);

            getAnime(props.id);
            
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }, [getAnime, props.id]);

    if (loading || Object.keys(Anime).length === 0) {
        return <Loading error={error}/>
    }

    return (
        <div id="AnimePageLayout">
            <div className='line'>
                <p id="MainTitle">{parse(titlesInWantedOrder(Anime.title))}</p>
            </div>

            <div className="AnimeInformationPage">
                {/*Image*/}
                <div className="animeImage">
                    <img src={Anime.coverImage.large} style={{ 'border': '1px solid ' + getRandomColor() }} alt='Cover'></img> 
                </div>

                {
                    /*AnimeUserInformation*/
                    sessionStorage.getItem('accessToken') ?
                        <UserAnimeInformation
                            airedEpisodes={airedEpisodes(Anime)} 
                            animeUserInformation={Anime.animeUserInformation} 
                            animeStartDate={Anime.startDate}
                            animeEndDate={Anime.endDate}
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
                <AnimeDetails characterEdges={Anime.characters.edges!} relationEdges={Anime.relations.edges!} />
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