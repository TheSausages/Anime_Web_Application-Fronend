
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useTimer } from 'react-timer-hook';
import { MiscellaneousProperties } from '../../Properties/MiscellaneousProperties';

import './css/Loading.css'

interface LoadingProps {
    error?: string
}

export default function Loading(props: LoadingProps) {
    const loadingTime: number = MiscellaneousProperties.loadingTimerInSeconds;
    let errorMsg = props.error ? props.error! : "The Request cound not be processed \n Try again later"

    let expiryTimestamp = (new Date().setSeconds(new Date().getSeconds() + loadingTime))
    const {
        isRunning,
      } = useTimer({ expiryTimestamp });


    return (<div id='LoadingComponent'>
        {isRunning ? <span><FontAwesomeIcon icon={faSpinner} spin /> Loading</span> : errorMsg}
    </div>
    )
}