import parse from 'html-react-parser';
import { useEffect, useState } from "react";
import { MediaB } from "../../data/MediaInformation";
import { AnimeService } from "../../Scripts/AnimeService";
import { Capitalize, dateOrNotKnown, getRandomColor, titlesInWantedOrder, valueOrNotKnown } from "../../Scripts/Utilities";
import Loading from '../Loading/Loading';
import Character from './Character';
import Relation from './Relation';
import SocialButtons from "./SocialButtons";

import "./css/Anime.css"

type ElementsWithRows = "relations" |"characters"

interface AnimeProps {
    id: number
}

export interface EpisodeArray {
    value: number | string
    label: number | string
    disabled: boolean
}

export default function Anime(props: AnimeProps) {
    const [Anime, setAnime] = useState<MediaB>({} as MediaB);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState();
    const [showRows, setShowRows] = useState<{ fieldName: ElementsWithRows, value: boolean }[]>([
        { fieldName: "relations", value: true },
        { fieldName: "characters", value: true }
    ])

    function findRowState(fieldName: ElementsWithRows) {
        return showRows.find(elem => elem.fieldName === fieldName)!.value
    }

    function changeRowState(fieldName: ElementsWithRows) {
        let rows = [...showRows]

        rows.find(elem => elem.fieldName === fieldName)!.value = !findRowState(fieldName)

        setShowRows(rows)
    }

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

                {/*Basic Anime Information*/}
                <div className="AnimeBasicInformation">
                    {createBasinAnimeMap(Anime).map((elem, index) => {
                        return (
                            <div key={index}>
                                <div className='line' style={{ 'borderBottom': '1px solid ' + getRandomColor()}} id="noMargin"><p>{elem.name}</p></div>
                                <div>{elem.value}</div>
                            </div>
                        )
                    })}
                </div>

                {/*Description and social buttons*/}
                <div className="AnimeDescription">
                    {
                        <SocialButtons airedEpisodes={getEpisodeArray(airedEpisodes(Anime))}/>
                    }

                    <div className="line">
                        <p>Description</p>
                    </div>

                    <div>
                        {parse(Anime.description)}
                    </div>
                </div>

                <div className="AnimeDetails">

                    {/*Relations*/}
                    <div className="line" >
                        {
                            ((window.innerWidth > 960 && Anime.relations.edges!.length > 5) || (window.innerWidth < 960 && Anime.relations.edges!.length > 2) ) ? 
                                <p className="linkPointer unCopyable" onClick={() => changeRowState('relations')}>Relations | Click to show {findRowState('relations') ? 'More' : 'Less'}</p>
                            :
                                <p>Relations</p>
                        }

                        <div id="Section">
                        {
                            Anime.relations.edges!
                            .slice(0,  (window.innerWidth > 960 ? 5 : 2))
                            .map((elem, index) => {
                                return <Relation key={index} element={elem} index={index}/>
                            })
                        }
                        {
                            Anime.relations.edges!
                            .slice((window.innerWidth > 960 ? 5 : 2))
                            .map((elem, index) => {
                                return <Relation key={index} element={elem} index={index} wrap={true} renderValue={findRowState('relations')}/>
                            })
                        }
                        </div>
                    </div>

                    {/*Characters*/}
                    <div className="line" >
                        {
                            ((window.innerWidth > 960 && Anime.characters.edges!.length > 5) || (window.innerWidth < 960 && Anime.characters.edges!.length > 2) ) ? 
                                <p className="linkPointer unCopyable" onClick={() => changeRowState('characters')}>Characters | Click to show {findRowState('characters') ? 'More' : 'Less'}</p>
                            :
                                <p>Characters</p>
                        }

                        <div id="Section">
                        {
                            Anime.characters.edges!
                            .slice(0,  (window.innerWidth > 960 ? 5 : 2))
                            .map((elem, index) => {
                                return <Character key={index} element={elem} index={index} />
                            })
                        }
                        {
                            Anime.characters.edges!
                            .slice((window.innerWidth > 960 ? 5 : 2))
                            .map((elem, index) => {
                                return <Character key={index} element={elem} index={index} wrap={true} renderValue={findRowState('characters')} />
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function createBasinAnimeMap(results: MediaB) {
    return [
        {
            name: "Airing Season:",
            value: valueOrNotKnown(results.season + ' ' + results.seasonYear)
        },
        {
            name: "Status:",
            value: Capitalize(valueOrNotKnown(results.status))
        },
        {
            name: "Format:",
            value: valueOrNotKnown(results.format)
        },
        {
            name: "Nr. of Episodes:",
            value: valueOrNotKnown(results.episodes)
        },
        {
            name: "Episode Length:",
            value: valueOrNotKnown(results.duration)
        },
        {
            name: "Start Date:",
            value: dateOrNotKnown(results.startDate)
        },
        {
            name: "End Date:",
            value: dateOrNotKnown(results.endDate)
        },
        {
            name: "BachAni Average Score:",
            value: "Not Implemented"
        },
        {
            name: "Anilist Average Score:",
            value: valueOrNotKnown(results.averageScore, '%')
        },
        {
            name: "BachAni Favourites:",
            value: "Not Implemented"
        },
        {
            name: "Anilist Favourites:",
            value: valueOrNotKnown(results.favourites)
        },
    ]
}

function getEpisodeArray(episodesAired: number): EpisodeArray[]  {
    if (episodesAired === undefined) {
        return [{ value: 'Not Available', label: 'Not Available', disabled: true }]
    }

    var epAiredArray =  Array.from(Array(episodesAired).keys()).map((elem) => {
        return {value: elem, label: elem, disabled: false}
    })

    return [{value: 'Nr. of Episodes watched', label: 'Nr. of Episodes watched', disabled: true}, ...epAiredArray]
}

function airedEpisodes(Anime: MediaB): number {
    if (Anime.nextAiringEpisode === undefined || Anime.nextAiringEpisode.episode === undefined) {
        return Anime.episodes
    }
    return Anime.nextAiringEpisode.episode
}