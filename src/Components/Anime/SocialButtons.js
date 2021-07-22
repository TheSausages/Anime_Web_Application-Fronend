import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Relation(props) {
    const [liked, setLiked] = useState(false);

    function toggle()  {
        setLiked(!liked)
    };

    var options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
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
    
            <Select className="selectEpisodes" options={props.aired} defaultValue={props.aired[0]} isOptionDisabled={(option) => option.disabled} styles={customStyles()} theme={theme => ({
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
        option: provided => ({
            ...provided,
            color: 'black'
          })
      }
}