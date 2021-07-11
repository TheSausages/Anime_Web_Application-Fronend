import { render } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { titlesInWantedOrder, valueOrNotKnown } from "../../Scripts/Utilities"
import './css/Anime.css';

export default function Relation(props) {
    if (props.wrap) {
        return (
            <div className={`${props.renderValue ? 'rowWrapper' : ''}`}>
                {code(props.index, props.elem)}
            </div>
        )
    } else {
        return (
            code(props.index, props.elem)
        )
    }
}

function code(index, elem) {
    return (
        <div key={index} className="animeRelation">
        {
            (elem.node.type !== "ANIME") ?
                <Link key={index} to="#" title={titlesInWantedOrder(elem.node.title)} ><img src={elem.node.coverImage.medium} alt="Cover" /></Link>
            :
                <Link  key={index} to={'/anime/' + elem.node.id + '/'} title={titlesInWantedOrder(elem.node.title)} >
                    <img src={elem.node.coverImage.medium} alt="Cover" />
                </Link>
        }

        <div className="AnimeRelationInfo" id={`relation${elem.node.id}`}>
            <div className="AnimeRelationInfoValue">
                <div>{valueOrNotKnown(elem.relationType)}</div>
                <div>{titlesInWantedOrder(elem.node.title)}</div>
            </div>
        </div>
    </div>
    )
}