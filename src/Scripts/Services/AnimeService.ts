import { CurrentSeasonInformation } from "../../data/Anime/Smaller/MainPageInterfaces";
import { MediaB } from "../../data/Anime/MediaInformation";
import { Page } from "../../data/Anime/Page";
import { performRequestWithType } from "./ApiService";
import { HttpMethods } from "./ApiService";
import { BackendProperties } from "../../Properties/BackendProperties"
import { AnimeQuery } from "../../data/Anime/AnimeQuery";
import { TFunction } from "react-i18next";
import { i18n } from "i18next";

export class AnimeService {
    static getAnimeById(id: number, t: TFunction, i18n: i18n): Promise<MediaB> {
        return performRequestWithType<MediaB>(HttpMethods.GET, BackendProperties.anime.getAnimeById(id), false, t, i18n)
    }

    static getCurrentSeasonAnime(t: TFunction, i18n: i18n): Promise<CurrentSeasonInformation> {
        return performRequestWithType<CurrentSeasonInformation>(HttpMethods.GET, BackendProperties.anime.getCurrentSeasonAnime, false, t, i18n)
    }

    static getTopAnimeOfAllTime(pageNumber: number, t: TFunction, i18n: i18n): Promise<Page> {
        return performRequestWithType<Page>(HttpMethods.GET, BackendProperties.anime.getTopAnimeOfAllTime(pageNumber), false, t, i18n)
    }

    static getTopAiringAnime(pageNumber: number, t: TFunction, i18n: i18n): Promise<Page> {
        return performRequestWithType<Page>(HttpMethods.GET, BackendProperties.anime.getTopAiringAnime(pageNumber), false, t, i18n)
    }

    static getTopAnimeMovies(pageNumber: number, t: TFunction, i18n: i18n): Promise<Page> {
        return performRequestWithType<Page>(HttpMethods.GET, BackendProperties.anime.getTopAnimeMovies(pageNumber), false, t, i18n)
    }

    static searchUsingQuery(query: AnimeQuery, pageNumber: number, t: TFunction, i18n: i18n): Promise<Page> {
        return performRequestWithType<Page>(HttpMethods.POST, BackendProperties.anime.searchByQuery(pageNumber), false, t, i18n, query)
    }
}