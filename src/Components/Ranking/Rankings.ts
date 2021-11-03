import { i18n } from "i18next";
import { TFunction } from "react-i18next";
import { Page } from "../../data/Anime/Page";
import { AnimeService } from "../../Scripts/Services/AnimeService";

export interface RankingItem {
    title: string
    fetch: (pageNumber: number, t: TFunction, i18n: i18n) => Promise<Page>
}

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