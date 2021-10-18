import { useSnackbar } from "notistack";
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

export interface AchievementService {
    startListeningForAchievements: () => void;
    stopListeningForAchievements: () => void;
}

class RetriableError extends Error { }
class FatalError extends Error { }

export default function useAchievementService() {
    const { enqueueSnackbar } = useSnackbar();
    const abortController = useMemo(() => new AbortController(), [])
    const signal = abortController.signal

    const startListening = useCallback(async () => {
        await fetchEventSource(BackendProperties.authAndUser.achievementSubscribe, {
            method: HttpMethods.GET,
            headers: getHeadersAsRecord(true),
            signal: signal,
    
            async onopen(response) {
                if (response.ok) {
                    return;
                } else if (response.status >= 400 && response.status < 500) {
                    // client-side errors are usually non-retriable:
                    throw new FatalError();
                } else {
                    throw new RetriableError();
                }
            },
    
            onmessage(message: EventSourceMessage) {
                let achievement:Achievement = JSON.parse(message.data);
                ReactDOM.render(
                    <AchievementDialog achievement={achievement} />, 
                    document.getElementById("AchievementDialogContainer")
                )
            },
    
            onerror(err: BackendError) {
                let defaultMessage = "You earned an achievement, but an error occured we cannot see which! Please check your profile";
                enqueueSnackbar(err.message ?? defaultMessage, snackbarError)
            }
        })
    }, [signal, enqueueSnackbar]);

    const stopListening = useCallback(() => {
        UserService.cancelAchievementsSubscription();
        abortController.abort();
    }, [abortController])

    return {
        startListeningForAchievements: startListening,
        stopListeningForAchievements: stopListening
    } as AchievementService;
}