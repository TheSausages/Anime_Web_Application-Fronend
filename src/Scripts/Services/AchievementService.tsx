import { useCallback, useMemo } from "react";
import { snackbarError } from "../../data/General/SnackBar";
import { Achievement } from "../../data/General/User/Achievement";
import { getHeadersAsRecord, HttpMethods } from "./ApiService";
import { EventSourceMessage, fetchEventSource } from '@microsoft/fetch-event-source';
import { BackendError } from "../../data/General/BackendError";
import AchievementDialog from "../../Components/Achievement/AchievementDialog";
import ReactDOM from "react-dom";
import { UserService } from "./UserService";
import { BackendProperties } from "../../Properties/BackendProperties"
import useBasicState from "../../data/General/BasicState";

/**
 * Elements that AchievementService will return
 */
export interface AchievementService {
    /** Function to begin listening for achievements. Needs to be authenticated */
    startListeningForAchievements: () => void;

    /** Function to stop listening for achievement. Needs to be authenticated, so use before logout! */
    stopListeningForAchievements: () => void;
}

/**
 * Service for connecting to the achievement SSE emitter in backend.
 * The app should start listening right after log in and stop before log out.
 */
export default function useAchievementService() {
    const { snackbar, t, i18n } = useBasicState();
    const abortController = useMemo(() => new AbortController(), [])
    const signal = abortController.signal

    const startListening = useCallback(async () => {
        await fetchEventSource(BackendProperties.authAndUser.achievementSubscribe, {
            method: HttpMethods.GET,
            headers: getHeadersAsRecord(true, t, i18n),
            signal: signal,
    
            async onopen(response) {
                if (response.ok) {
                    return;
                } else {
                    // client-side errors are usually non-retriable:
                    throw { message: t("misc.defaultAchievementErrorMessage"), status: 400 } as BackendError;
                }
            },

            onmessage(message: EventSourceMessage) {
                if (message.event === "FatalError" || (message.retry ?? 0 > 2)) {
                    throw { message: message.data, status: 400 } as BackendError;
                } else {
                    let achievement:Achievement = JSON.parse(message.data);
                    ReactDOM.render(
                        <AchievementDialog achievement={achievement} />,
                        document.getElementById("AchievementDialogContainer")
                    )
                }
            },
    
            onerror(err: BackendError) {
                snackbar(err.message ?? t("misc.defaultAchievementMessage"), snackbarError);
                // rethrow to stop the operation
                throw err;
            },

            onclose() {
                snackbar(t("misc.defaultAchievementErrorMessage"), snackbarError)
            },
        })
    }, [signal, snackbar, t, i18n]);

    const stopListening = useCallback(() => {
        UserService.cancelAchievementsSubscription(t, i18n);
        abortController.abort();
    }, [abortController, t, i18n])

    return {
        startListeningForAchievements: startListening,
        stopListeningForAchievements: stopListening
    } as AchievementService;
}