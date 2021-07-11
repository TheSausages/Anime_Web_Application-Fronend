import React, { useEffect, useState } from 'react';
import { getAnimeById } from '../../Scripts/AnimeFetch'
import { dateOrNotKnown, getRandomColor, titlesInWantedOrder, valueOrNotKnown } from "../../Scripts/Utilities"
import Loading from '../Loading/Loading'
import './css/Anime.css';
import parse from 'html-react-parser';
import Select from 'react-select'
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Relation from './Relation';

export default function Anime(props) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [liked, setLiked] = useState(false);
    const [showRows, setShowRows] = useState({
        relations: true
    })

    var options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    options.unshift( { value: 'Status', label: 'Status', disabled: true })

    function toggle()  {
        setLiked(!liked)
    };

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
    console.log(showRows)

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
                        localStorage.getItem('accessToken') ? 
                            <div className="reactionButtons">
                                <Select className="selectStatus" options={options} defaultValue={options[0]} isOptionDisabled={(option) => option.disabled} styles={customStyles()} theme={theme => ({
                                    ...theme,
                                    borderRadius: 5,
                                    colors: {
                                    ...theme.colors,
                                    primary25: 'rgb(34, 206, 43)',
                                    primary: 'rgb(34, 206, 43);',
                                }, })}/>


                                <div className={`favouritedButton ${liked ? "liked" : "notLiked"}`} onClick={() => toggle()} >
                                    <FontAwesomeIcon icon={faHeart} />
                                </div>
                        
                                <Select className="selectEpisodes" options={getEpisodeArray(airedEpisodes(data.Anime))} defaultValue={getEpisodeArray(airedEpisodes(data.Anime))[0]} isOptionDisabled={(option) => option.disabled} styles={customStyles()} theme={theme => ({
                                    ...theme,
                                    borderRadius: 5,
                                    colors: {
                                    ...theme.colors,
                                    primary25: 'rgb(34, 206, 43)',
                                    primary: 'rgb(34, 206, 43);',
                                }, })}/>
                            </div> 
                        : null
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
                                <p onClick={() => changeRows('relations')}>Relations | Click to show {showRows.relations ? 'More' : 'Less'}</p>
                            :
                                <p>Relations</p>
                        }

                        <div id="AnimeRelations">
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
                </div>
            </div>
        </div>
    )
}

function customStyles() {
    return {
        option: provided => ({
            ...provided,
            color: 'black'
          })
      }
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

    var epAiredArray =  Array.from(Array(episodesAired + 1).keys()).map((elem) => {
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