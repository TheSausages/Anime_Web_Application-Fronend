import { Page } from "../../data/Anime/Page";
import { AnimeService } from "../../Scripts/Services/AnimeService";

export interface RankingItem {
    title: string
    fetch: (pageNumber: number) => Promise<Page>
}

export const Rankings: RankingItem[] = [
    {
        title: 'anime.ranking.topOfAllTime',
        fetch: (pageNumber: number) => AnimeService.getTopAnimeOfAllTime(pageNumber)
    },
    {
        title: 'anime.ranking.topAiring',
        fetch: (pageNumber: number) => AnimeService.getTopAiringAnime(pageNumber)
    },
    {
        title: 'anime.ranking.topMovies',
        fetch: (pageNumber: number) => AnimeService.getTopAnimeMovies(pageNumber)
    }
]