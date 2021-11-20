/** Interface representing all cover image elements from the Anilist service. */
export interface CoverImage {
    /** Link to the largest variant of the image. */
    extraLarge: string

    /** List to the standard large image size. */
    large: string

    /** Link to the medium size of the image. */
    medium: string

    /** Average hex color of the image. */
    color: string
}