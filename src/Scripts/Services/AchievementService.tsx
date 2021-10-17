import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { snackbarError, snackbarInfo } from "../../data/General/SnackBar";
import { Achievement } from "../../data/General/User/Achievement";
import { backendUrl, getHeadersAsRecord, HttpMethods, refreshTokens } from "./ApiService";
import { EventSourceMessage, fetchEventSource } from '@microsoft/fetch-event-source';
import { BackendError } from "../../data/General/BackendError";

export interface AchievementService {
    startListeningForAchievements: () => void;
    stopListeningForAchievements: () => void;
}

class RetriableError extends Error { }
class FatalError extends Error { }

export default function useAchievementService() {
    const { enqueueSnackbar } = useSnackbar();
    const abortController = new AbortController();
    const [signal, setSignal] = useState<AbortSignal>(abortController.signal)

    const startListening = useCallback(async () => {
        console.log("start lis")
        await fetchEventSource(`${backendUrl}/achievement/emitting`, {
            method: HttpMethods.GET,
            headers: getHeadersAsRecord(true),
            signal: signal,
    
            async onopen(response) {
                if (response.ok) {
                    console.log("Started lisening")
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
                enqueueSnackbar(achievement.name, snackbarInfo)
            },
    
            onerror(err: BackendError) {
                let defaultMessage = "You earned an achievement, but an error occured we cannot see which! Please check your profile";
                enqueueSnackbar(err.message ?? defaultMessage, snackbarError)
            },
    
            onclose() {
                console.log("Stopping listening for achievements")
            }
        })
    }, [signal]);

    const stopListening = useCallback(() => abortController.abort(), [])

    return {
        startListeningForAchievements: startListening,
        stopListeningForAchievements: stopListening
    } as AchievementService;
}