import { i18n } from "i18next";
import { TFunction } from "react-i18next";
import { MediaPage } from "../../data/Anime/Page";
import { AnimeService } from "../../Scripts/Services/AnimeService";

/**
 * What information should each element of {@link Rankings} hold.
 */
export interface RankingItem {
    /** Title of the ranking, should be a translation key. */
    title: string

    /** Method that should be used to fetch the ranking elements. */
    fetch: (pageNumber: number, t: TFunction, i18n: i18n) => Promise<MediaPage>
}

/**
 * All available rankings. The title of each ranking should contain a translation key.
 */
export const Rankings: RankingItem[] = [
    {
        title: 'anime.ranking.topOfAllTime',
        fetch: (pageNumber: number, t: TFunction, i18n: i18n) => AnimeService.getTopAnimeOfAllTime(pageNumber, t, i18n)
    },
    {
        title: 'anime.ranking.topAiring',
        fetch: (pageNumber: number, t: TFunction, i18n: i18n) => AnimeService.getTopAiringAnime(pageNumber, t, i18n)
    },
    {
        title: 'anime.ranking.topMovies',
        fetch: (pageNumber: number, t: TFunction, i18n: i18n) => AnimeService.getTopAnimeMovies(pageNumber, t, i18n)
    }
]