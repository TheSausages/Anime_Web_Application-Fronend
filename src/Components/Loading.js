import React from "react"
import './ComponentsCss/Loading.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default class Loading extends React.Component {
    render() {
        return (<div id='LoadingComponent'>
            <span><FontAwesomeIcon icon={faSpinner} spin /> Loading</span>
        </div>
        )
    }
}