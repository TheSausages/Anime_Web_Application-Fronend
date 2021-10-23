import { CurrentSeasonInformation } from "../../data/Anime/Smaller/MainPageInterfaces";
import { MediaB } from "../../data/Anime/MediaInformation";
import { Page } from "../../data/Anime/Page";
import { performRequestWithType } from "./ApiService";
import { HttpMethods } from "./ApiService";
import { BackendProperties } from "../../Properties/BackendProperties"
import { AnimeQuery } from "../../data/Anime/AnimeQuery";

export class AnimeService {
    static getAnimeById(id: number): Promise<MediaB> {
        return performRequestWithType<MediaB>(HttpMethods.GET, BackendProperties.anime.getAnimeById(id), true)
    }

    static getCurrentSeasonAnime(): Promise<CurrentSeasonInformation> {
        return performRequestWithType<CurrentSeasonInformation>(HttpMethods.GET, BackendProperties.anime.getCurrentSeasonAnime, false)
    }

    static getTopAnimeOfAllTime(pageNumber: number): Promise<Page> {
        return performRequestWithType<Page>(HttpMethods.GET, BackendProperties.anime.getTopAnimeOfAllTime(pageNumber), false)
    }

    static getTopAiringAnime(pageNumber: number): Promise<Page> {
        return performRequestWithType<Page>(HttpMethods.GET, BackendProperties.anime.getTopAiringAnime(pageNumber), false)
    }

    static getTopAnimeMovies(pageNumber: number): Promise<Page> {
        return performRequestWithType<Page>(HttpMethods.GET, BackendProperties.anime.getTopAnimeMovies(pageNumber), false)
    }

    static searchUsingQuery(query: AnimeQuery, pageNumber: number): Promise<Page> {
        return performRequestWithType<Page>(HttpMethods.POST, BackendProperties.anime.searchByQuery(pageNumber), false, query)
    }
}