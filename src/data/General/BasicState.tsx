import { i18n } from "i18next";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";
import { TFunction, useTranslation } from "react-i18next";
import { snackbarInfo, snackBarVariant } from "./SnackBar";

/**
 * Interface representing the Basic State.
 */
export interface BasicState {
    /** State telling the component if a request is being made to the backend. */
    loading: boolean;

    /** Message of an eventual error. */
    error: string;

    /** State for menaging if another component (ex. Review dialog) is open. */
    open: boolean;

    /** A request is going to be made, so the {@link loading} state should be *true* */
    startLoading: () => void;

    /** The request has ended, so the {@link loading} state should be *false* */
    stopLoading: () => void;

    /** An component should appear - set {@link open} to true. */
    openElement: () => void;

    /** An component should close - set {@link open} to false. */
    closeElement: () => void;

    /** Make an snackbar popup appear with a given message and variant. */
    snackbar: (message: string, variant: snackBarVariant) => void;

    /** Set an error message to the {@link error} state, */
    setErrorMessage: (message: string) => void;

    /** The i18n translation function */
    t: TFunction;

    /** The i18n instance used by the application */
    i18n: i18n;
}

/**
 * The basic state posseses elements used accross many diffrent components.
 * What element to use can be chossen in each component.
 * All the methods are callbacks, so they can be used as callback dependencies.
 * Usage example:
 * ```
 * const { loading, startLoading, stopLoading, t, enqueueSnackbar } = useBasicState();
 * ```
 * @returns All basic state elements.
 */
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