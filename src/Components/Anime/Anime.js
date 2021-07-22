import React, { useEffect, useState } from 'react';
import { getAnimeById } from '../../Scripts/AnimeFetch'
import { dateOrNotKnown, getRandomColor, titlesInWantedOrder, valueOrNotKnown } from "../../Scripts/Utilities"
import Loading from '../Loading/Loading'
import './css/Anime.css';
import parse from 'html-react-parser';
import Relation from './Relation';
import Character from './Character';
import SocialButtuns from './SocialButtons';

export default function Anime(props) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [showRows, setShowRows] = useState({
        relations: true,
        characters: true
    })

    function changeRows(stateName) {
        let showRowsCopy = JSON.parse(JSON.stringify(showRows))

        showRowsCopy[stateName] = !showRowsCopy[stateName]

        setShowRows(showRowsCopy)
    }

    useEffect(() => {
            try {
                setLoading(true);

                async function wrapper() {
                    let result = await getAnimeById(props.match.params.id);
                    return setData({
                        Anime: result,

                        basicInfoMap: createBasinAnimeMap(result)
                    });
                }

                wrapper();
                
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError(error)
            }
    }, [props.match.params.id]);

    if (loading || !data) {
        return <Loading error={error}/>
    }

    console.log(data.Anime)

    return (
        <div id="AnimePageLayout">
            <div className='line'>
                <p id="MainTitle">{titlesInWantedOrder(data.Anime.title)}</p>
            </div>

            <div className="AnimeInformationPage">
                {/*Image*/}
                <div className="animeImage">
                    <img src={data.Anime.coverImage.large} style={{ 'border': '1px solid ' + getRandomColor() }} alt='Cover'></img> 
                </div>

                {/*Basic Anime Information*/}
                <div className="AnimeBasicInformation">
                    {data.basicInfoMap.map((elem, index) => {
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
                        <SocialButtuns aired={getEpisodeArray(airedEpisodes(data.Anime))}/>
                    }

                    <div className="line">
                        <p>Description</p>
                    </div>

                    <div>
                        {parse(data.Anime.description)}
                    </div>
                </div>

                <div className="AnimeDetails">

                    {/*Relations*/}
                    <div className="line" >
                        {
                            ((window.innerWidth > 960 && data.Anime.relations.edges.length > 5) || (window.innerWidth < 960 && data.Anime.relations.edges.length > 2) ) ? 
                                <p className="linkPointer unCopyable" onClick={() => changeRows('relations')}>Relations | Click to show {showRows.relations ? 'More' : 'Less'}</p>
                            :
                                <p>Relations</p>
                        }

                        <div id="Section">
                        {
                            data.Anime.relations.edges
                            .slice(0,  (window.innerWidth > 960 ? 5 : 2))
                            .map((elem, index) => {
                                return <Relation key={index} elem={elem} index={index}/>
                            })
                        }
                        {
                            data.Anime.relations.edges
                            .slice((window.innerWidth > 960 ? 5 : 2))
                            .map((elem, index) => {
                                return <Relation key={index} elem={elem} index={index} wrap={true} renderValue={showRows.relations}/>
                            })
                        }
                        </div>
                    </div>

                    {/*Characters*/}
                    <div className="line" >
                        {
                            ((window.innerWidth > 960 && data.Anime.characters.edges.length > 5) || (window.innerWidth < 960 && data.Anime.characters.edges.length > 2) ) ? 
                                <p className="linkPointer unCopyable" onClick={() => changeRows('characters')}>Characters | Click to show {showRows.characters ? 'More' : 'Less'}</p>
                            :
                                <p>Characters</p>
                        }

                        <div id="Section">
                        {
                            data.Anime.characters.edges
                            .slice(0,  (window.innerWidth > 960 ? 5 : 2))
                            .map((elem, index) => {
                                return <Character key={index} elem={elem} index={index} />
                            })
                        }
                        {
                            data.Anime.characters.edges
                            .slice((window.innerWidth > 960 ? 5 : 2))
                            .map((elem, index) => {
                                return <Character key={index} elem={elem} index={index} wrap={true} renderValue={showRows.characters} />
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function createBasinAnimeMap(results) {
    return [
        {
            name: "Airing Season:",
            value: valueOrNotKnown(results.season + ' ' + results.seasonYear)
        },
        {
            name: "Status:",
            value: valueOrNotKnown(results.status)
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

function getEpisodeArray(episodesAired) {
    if (episodesAired === undefined) {
        return [{ value: 'Not Available', label: 'Not Available' }]
    }

    var epAiredArray =  Array.from(Array(episodesAired).keys()).map((elem) => {
        return {value: elem, label: elem, disabled: false}
    })

    return [{value: 'Nr. of Episodes watched', label: 'Nr. of Episodes watched', disabled: true}, ...epAiredArray]
}

function airedEpisodes(Anime) {
    if (Anime.nextAiringEpisode === undefined || Anime.nextAiringEpisode.episode === undefined) {
        return Anime.episodes
    }
    return Anime.nextAiringEpisode.episode
}