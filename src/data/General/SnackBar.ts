import { VariantType } from "notistack"

interface snackBarVariants {
    variant: VariantType | undefined
}

export const snackbarError: snackBarVariants = { variant: 'error' }

export const snackBarSuccess: snackBarVariants = { variant: 'success' }

export const snackbarInfo: snackBarVariants = { variant: 'info' }

export const snackbarWarning: snackBarVariants = { variant: 'warning' }