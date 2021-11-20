import { MediaB } from "./MediaInformation";
import { PageInfo } from "./PageInfo";

/** Interface for a typical Media Page from the Anilist service. */
export interface MediaPage {
    /** Information on the page. */
    pageInfo?: PageInfo

    /** The retuned media. */
    media?: MediaB[]
}