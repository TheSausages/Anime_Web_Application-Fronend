import { VariantType } from "notistack"

/**
 * variant of snackbar, that changes the popup color.
 */
export interface snackBarVariant {
    variant: VariantType | undefined
}

/** Snackbar variant for errors */
export const snackbarError: snackBarVariant = { variant: 'error' }

/** Snackbar variant for a successful operation */
export const snackBarSuccess: snackBarVariant = { variant: 'success' }

/** Snackbar variant for information */
export const snackbarInfo: snackBarVariant = { variant: 'info' }

/** Snackbar variant for a warning */
export const snackbarWarning: snackBarVariant = { variant: 'warning' }