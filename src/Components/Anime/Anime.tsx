import parse from 'html-react-parser';
import { useEffect, useState } from "react";
import { MediaB } from "../../data/Anime/MediaInformation";
import { AnimeService } from "../../Scripts/Services/AnimeService";
import { getRandomColor, titlesInWantedOrder } from "../../Scripts/Utilities";
import Loading from '../Loading/Loading';

import "./css/Anime.css"
import { AnimeBasicInformation } from './AnimePageElements/BasicAnimeInformation';
import { DescriptionWithSocialButtons as Description } from './AnimePageElements/Description';
import { AnimeDetails } from './AnimePageElements/AnimeDetails';
import UserAnimeInformation from './AnimePageElements/UserAnimeInformation';

interface AnimeProps {
    id: number
}

export default function Anime(props: AnimeProps) {
    const [Anime, setAnime] = useState<MediaB>({} as MediaB);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState();

    async function wrapper(id: number) {
        let response = await AnimeService.getAnimeById(id)

        return setAnime(response as MediaB)
    }

    useEffect(() => {
        try {
            setLoading(true);

            wrapper(props.id);
            
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }, [props.id]);

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
                    localStorage.getItem('accessToken') ?
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