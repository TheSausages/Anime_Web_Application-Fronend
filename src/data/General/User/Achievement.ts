/**
 * Complete achievement object.
 * In order to get the achievement icon use:
 * ```
 * <img src={`data:image/png;base64,${achievementIcon}`} />
 * ```
 */
export interface Achievement {
    /** Id of the achievement. */
    achievementId: number;

    /** Name of the achievement. */
    name: string;

    /** Description of the achievement. */
    description: string;

    /** 
     * Icon of the achievement in byte array format.
     * To use it in an img do:
     * ```
     * <img src={`data:image/png;base64,${achievementIcon}`} />
     * ```
     */
    achievementIcon: Uint8Array;

    /**
     * How much points does the achievement give.
     */
    achievementPoints: number;

    /** How many users have the achievement. */
    numberOfUsersThatPosses: number;
}