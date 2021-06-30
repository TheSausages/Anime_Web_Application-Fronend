import { getTopAiringAnime, getTopAnimeAllTime, getTopAnimeMovie } from "../../Scripts/RankingFetch"

export const RankingItems = [
    {
        title: 'Top of All Time',
        fetch: (pageNumber) => getTopAnimeAllTime(pageNumber)
    },
    {
        title: 'Top Airing',
        fetch: (pageNumber) => getTopAiringAnime(pageNumber)
    },
    {
        title: 'Top Movies',
        fetch: (pageNumber) => getTopAnimeMovie(pageNumber)
    }
]