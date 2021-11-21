import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { MediaPage } from "../../data/Anime/Page";
import Loading from "../Loading/Loading";
import AnimeLink from "./AnimeLink";

/**
 * The props for the {@link AnimeLinkScroll} component.
 */
export interface AnimeListScrollProps {
    /** Page of elements that should be displayed. */
    items: MediaPage;

    /** Method to get additional pages of elements. */
    getMore: () => void;
}

/**
 * Component that adds an infinite scroll mechanism to a {@link AnimeLink}.
 */
export default function AnimeLinkScroll(props: AnimeListScrollProps) {
    const { items, getMore } = props;
    const { t } = useTranslation();

    return (
        <div>
            <InfiniteScroll
                style={{overflow: "hidden"}}
                dataLength={items.media!.length}
                next={getMore}
                hasMore={items.pageInfo!.hasNextPage!}
                loader={<Loading />}
                endMessage={
                    <div>
                        {t("misc.infiniteScroll.end")}
                    </div>
                }
            >
                <AnimeLink grid={true} elements={items.media!} showIndex={true}/>
            </InfiniteScroll>
        </div>
    )
}