
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useTimer } from 'react-timer-hook';
import { MiscellaneousProperties } from '../../Properties/MiscellaneousProperties';

import './css/Loading.css'
import { useTranslation } from "react-i18next";

/**
 * The props for the {@link Loading} component.
 */
interface LoadingProps {
    /** The error text. */
    error?: string
}

/**
 * The component used when the loading state start.
 * If the error time passes or an error message is given, the component show
 * the error message indefinitely.
 * @param props {@link Loading}
 */
export default function Loading(props: LoadingProps) {
    const { t } = useTranslation();
    const loadingTime: number = MiscellaneousProperties.loadingTimerInSeconds;

    let errorMsg = props.error ? props.error! : t("misc.loadingDefaultMessage")

    let expiryTimestamp = (new Date().setSeconds(new Date().getSeconds() + loadingTime))
    const {
        isRunning,
      } = useTimer({ expiryTimestamp });


    return (<div id='LoadingComponent'>
        {isRunning ? <span><FontAwesomeIcon icon={faSpinner} spin /> Loading</span> : errorMsg}
    </div>
    )
}