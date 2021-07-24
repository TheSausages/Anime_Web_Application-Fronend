import { MediaB } from "../data/MediaInformation";
import { performRequestWithType } from "./ApiService";
import { HttpMethods } from "./ApiService";

export class AnimeService {
    static getAnimeById(id: number): Promise<MediaB> {
        return performRequestWithType<MediaB>(HttpMethods.GET, "/anime/" + id, false)
    }

    static getCurrentSeasonAnime(): Promise<MediaB[]> {
        return performRequestWithType<MediaB[]>(HttpMethods.GET, 'anime/season/currect', false)
    }

    static getTopAnimeOfAllTime(pageNumber: number): Promise<MediaB[]> {
        return performRequestWithType<MediaB[]>(HttpMethods.GET, '/anime/ranking/topAllTime/' + pageNumber, false)
    }

    static getTopAiringAnime(pageNumber: number): Promise<MediaB[]> {
        return performRequestWithType<MediaB[]>(HttpMethods.GET, '/anime/ranking/topAiring/' + pageNumber, false)
    }

    static getTopAnimeMovies(pageNumber: number): Promise<MediaB[]> {
        return performRequestWithType<MediaB[]>(HttpMethods.GET, '/anime/ranking/topMovies/' + pageNumber, false)
    }
}