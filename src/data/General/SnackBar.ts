import { VariantType } from "notistack"

export interface snackBarVariant {
    variant: VariantType | undefined
}

export const snackbarError: snackBarVariant = { variant: 'error' }

export const snackBarSuccess: snackBarVariant = { variant: 'success' }

export const snackbarInfo: snackBarVariant = { variant: 'info' }

export const snackbarWarning: snackBarVariant = { variant: 'warning' }