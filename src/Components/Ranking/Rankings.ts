import { Page } from "../../data/Page";
import { AnimeService } from "../../Scripts/Services/AnimeService";

export interface RankingItem {
    title: String
    fetch: (pageNumber: number) => Promise<Page>
}

export const Rankings: RankingItem[] = [
    {
        title: 'Top of All Time',
        fetch: (pageNumber: number) => AnimeService.getTopAnimeOfAllTime(pageNumber)
    },
    {
        title: 'Top Airing',
        fetch: (pageNumber: number) => AnimeService.getTopAiringAnime(pageNumber)
    },
    {
        title: 'Top Movies',
        fetch: (pageNumber: number) => AnimeService.getTopAnimeMovies(pageNumber)
    }
]