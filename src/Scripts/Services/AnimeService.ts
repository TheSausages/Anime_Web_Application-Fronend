import { CurrentSeasonInformation } from "../../data/Anime/Smaller/MainPageInterfaces";
import { MediaB } from "../../data/Anime/MediaInformation";
import { MediaPage } from "../../data/Anime/Page";
import { performRequestWithType } from "./ApiService";
import { HttpMethods } from "./ApiService";
import { BackendProperties } from "../../Properties/BackendProperties"
import { AnimeQuery } from "../../data/Anime/AnimeQuery";
import { TFunction } from "react-i18next";
import { i18n } from "i18next";

/**
 * Class containing methods for operations related to Anime. Should never be initialised.
 * The i18n and tranlation function must be passes down to {@link ApiService}.
 */
export abstract class AnimeService {
    /**
     * Function to get detailed information about an Anime by it's Id.
     * @param id Id of the Anime that should be found.
     * @param t Translation function.
     * @param i18n i18n instance.
     * @returns Data containing detailed information about a given Anime.
     */
    static getAnimeById(id: number, t: TFunction, i18n: i18n): Promise<MediaB> {
        return performRequestWithType<MediaB>(HttpMethods.GET, BackendProperties.anime.getAnimeById(id), false, t, i18n)
    }

    /**
     * Function to get information on the current AAnime season.
     * @param t Translation function.
     * @param i18n i18n instance.
     * @returns Data containing information on the current anime season.
     */
    static getCurrentSeasonAnime(t: TFunction, i18n: i18n): Promise<CurrentSeasonInformation> {
        return performRequestWithType<CurrentSeasonInformation>(HttpMethods.GET, BackendProperties.anime.getCurrentSeasonAnime, false, t, i18n)
    }

    /**
     * Get a page of the Top Anime of All Time ranking.
     * @param pageNumber Number of the page that should be returned.
     * @param t Translation function.
     * @param i18n i18n instance.
     * @returns Data containing a page of Anime from the ranking.
     */
    static getTopAnimeOfAllTime(pageNumber: number, t: TFunction, i18n: i18n): Promise<MediaPage> {
        return performRequestWithType<MediaPage>(HttpMethods.GET, BackendProperties.anime.getTopAnimeOfAllTime(pageNumber), false, t, i18n)
    }

    /**
     * Get a page of the Top currently airing ranking.
     * @param pageNumber Number of the page that should be returned.
     * @param t Translation function.
     * @param i18n i18n instance.
     * @returns Data containing a page of Anime from the ranking.
     */
    static getTopAiringAnime(pageNumber: number, t: TFunction, i18n: i18n): Promise<MediaPage> {
        return performRequestWithType<MediaPage>(HttpMethods.GET, BackendProperties.anime.getTopAiringAnime(pageNumber), false, t, i18n)
    }

    /**
     * Get a page of the Top Anime Movies ranking.
     * @param pageNumber Number of the page that should be returned.
     * @param t Translation function.
     * @param i18n i18n instance.
     * @returns Data containing a page of Anime from the ranking.
     */
    static getTopAnimeMovies(pageNumber: number, t: TFunction, i18n: i18n): Promise<MediaPage> {
        return performRequestWithType<MediaPage>(HttpMethods.GET, BackendProperties.anime.getTopAnimeMovies(pageNumber), false, t, i18n)
    }

    /**
     * Use a {@link AnimeQuery} to search for any Anime that meet the criteria. They will be sorted from highest score to lowest.
     * @param query Query used to search for Anime.
     * @param pageNumber What page of Anime searched by the query should be requested.
     * @param t Translation function.
     * @param i18n i18n instance.
     * @returns Page of Anime meeting the query criteria.
     */
    static searchUsingQuery(query: AnimeQuery, pageNumber: number, t: TFunction, i18n: i18n): Promise<MediaPage> {
        return performRequestWithType<MediaPage>(HttpMethods.POST, BackendProperties.anime.searchByQuery(pageNumber), false, t, i18n, query)
    }
}