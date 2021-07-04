import React from "react"
import './css/Loading.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useTimer } from 'react-timer-hook';

export default function Loading(error) {
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 10);

    const errorMsg = "The Request cound not be processed \n Try again later"

    const {
        isRunning,
      } = useTimer({ expiryTimestamp });

    return (<div id='LoadingComponent'>
        {isRunning ? <span><FontAwesomeIcon icon={faSpinner} spin /> Loading</span> : errorMsg}
    </div>
    )
}