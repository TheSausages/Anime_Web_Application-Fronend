import { CurrectSeasonInformation } from "../../data/Anilist/Smaller/MainPageInterfaces";
import { MediaB } from "../../data/Anilist/MediaInformation";
import { Page } from "../../data/Anilist/Page";
import { performRequestWithType } from "./ApiService";
import { HttpMethods } from "./ApiService";

export class AnimeService {
    static getAnimeById(id: number): Promise<MediaB> {
        return performRequestWithType<MediaB>(HttpMethods.GET, "/anime/" + id, false)
    }

    static getCurrentSeasonAnime(): Promise<CurrectSeasonInformation> {
        return performRequestWithType<CurrectSeasonInformation>(HttpMethods.GET, '/anime/season/current', false)
    }

    static getTopAnimeOfAllTime(pageNumber: number): Promise<Page> {
        return performRequestWithType<Page>(HttpMethods.GET, '/anime/ranking/topAllTime/' + pageNumber, false)
    }

    static getTopAiringAnime(pageNumber: number): Promise<Page> {
        return performRequestWithType<Page>(HttpMethods.GET, '/anime/ranking/topAiring/' + pageNumber, false)
    }

    static getTopAnimeMovies(pageNumber: number): Promise<Page> {
        return performRequestWithType<Page>(HttpMethods.GET, '/anime/ranking/topMovies/' + pageNumber, false)
    }
}