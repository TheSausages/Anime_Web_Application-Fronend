import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";
import { snackbarInfo, snackBarVariant } from "./SnackBar";

export interface BasicState {
    loading: boolean;
    error: string;
    open: boolean;
    startLoading: () => void;
    stopLoading: () => void;
    openElement: () => void;
    closeElement: () => void;
    snackbar: (message: string, variant: snackBarVariant) => void;
    setErrorMessage: (message: string) => void
}

export default function useBasicState() {
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const { enqueueSnackbar } = useSnackbar();

    const openElement = useCallback(() => setOpen(true), [])

    const closeElement = useCallback(() => setOpen(false), [])

    const startLoading = useCallback(() => setLoading(true), [])

    const stopLoading = useCallback(() => setLoading(false), [])

    const setErrorMessage = useCallback((message: string = "No message available. Plase contact the administration") => setError(message), [])

    const snackbar = useCallback((message: string = "No message available", variant: snackBarVariant = snackbarInfo) => enqueueSnackbar(message, variant), [enqueueSnackbar])

    return {
        loading: loading,
        error: error,
        open: open,
        startLoading: startLoading,
        stopLoading: stopLoading,
        openElement: openElement,
        closeElement: closeElement,
        snackbar: snackbar,
        setErrorMessage: setErrorMessage,
    } as BasicState
}