/**
 * This file contains properties that dont match any other criteria.
 * - `achievementDialogCloseInSeconds` - Time in which the achievement displayed in {@link AchievementDialog} will disappear
 * - `loadingTimerInSeconds` - Time after which the error message in {@link Loading} will appear
 * - `reactHookFormSetValueOption` - Options when a field is updated using *setValue* reack-hook-form function
 * - `anilistRankingElementLoadingDelay` - Time after which the rankings element will appear
 * - `reviewMaxTitleCharacters` - Max number of characters for the review title in {@link ReviewForm}
 * - `reviewMaxTextCharacters` - Max number of characters for the review text in {@link ReviewForm}
 * - `section` - When using {@link SectionUtils}, those properties say how many element should appear for a resolution (or below it until next resolution limit):
 *   - `maxElements` - Max number of element that will ever appear
 *   - `firstSection` - First section for elements
 *   - `secondSection` - Second section for elements
 *   - `thirdSection` - Third section for elements
 */

export const MiscellaneousProperties = {
    achievementDialogCloseInSeconds: 5,
    loadingTimerInSeconds: 5,
    reactHookFormSetValueOption: { shouldDirty: true, shouldTouch: true, shouldValidate: true },
    anilistRankingElementLoadingDelay: 5.5,
    reviewMaxTitleCharacters: 100,
    reviewMaxTextCharacters: 300,
    section: {
        maxElements: 6,
        firstSection: {
            resolution: 1350,
            elements: 4,
        },
        secondSection: {
            resolution: 1100,
            elements: 3,
        },
        thirdSection: {
            resolution: 960,
            elements: 2,
        },
    }
}