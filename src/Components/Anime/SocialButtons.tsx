import { useState } from "react";
import { EpisodeArray } from "./Anime";
import Select from 'react-select'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

interface SocialButtonsProps {
    airedEpisodes: EpisodeArray[]
}

export default function SocialButtons(props: SocialButtonsProps) {
    const [liked, setLiked] = useState(false);

    function toggle()  {
        setLiked(!liked)
    };

    var options = [
        { value: 'chocolate', label: 'Chocolate', disabled: false },
        { value: 'strawberry', label: 'Strawberry', disabled: false },
        { value: 'vanilla', label: 'Vanilla', disabled: false }
    ]

    options.unshift( { value: 'Status', label: 'Status', disabled: true })

    return (
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
    
            <Select className="selectEpisodes" options={props.airedEpisodes} defaultValue={props.airedEpisodes[0]} isOptionDisabled={(option) => option.disabled} styles={customStyles()} theme={theme => ({
                ...theme,
                borderRadius: 5,
                colors: {
                ...theme.colors,
                primary25: 'rgb(34, 206, 43)',
                primary: 'rgb(34, 206, 43);',
            }, })}/>
        </div> 

    : 
        null
    )
}

function customStyles() {
    return {
        option: (provided: any) => ({
            ...provided,
            color: 'black'
          })
      }
}