
import './css/Loading.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useTimer } from 'react-timer-hook';

interface LoadingProps {
    error?: string
}

export default function Loading(props: LoadingProps) {
    let errorMsg = props.error ? props.error! : "The Request cound not be processed \n Try again later"

    let expiryTimestamp = (new Date().setSeconds(new Date().getSeconds() + 5))
    const {
        isRunning,
      } = useTimer({ expiryTimestamp });


    return (<div id='LoadingComponent'>
        {isRunning ? <span><FontAwesomeIcon icon={faSpinner} spin /> Loading</span> : errorMsg}
    </div>
    )
}