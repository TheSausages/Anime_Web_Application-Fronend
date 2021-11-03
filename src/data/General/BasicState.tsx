import { i18n } from "i18next";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";
import { TFunction, useTranslation } from "react-i18next";
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
    setErrorMessage: (message: string) => void;
    t: TFunction;
    i18n: i18n;
}

export default function useBasicState() {
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const { t, i18n } = useTranslation();
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
        t: t,
        i18n: i18n
    } as BasicState
}