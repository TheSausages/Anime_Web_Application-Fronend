import InfiniteScroll from "react-infinite-scroll-component";
import { Page } from "../../data/Anime/Page";
import Loading from "../Loading/Loading";
import AnimeLink from "./AnimeLink";

interface AnimeListScrollProps {
    items: Page;
    getMore: () => void;
}

export default function AnimeLinkScroll(props: AnimeListScrollProps) {
    const { items, getMore } = props;

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
                        You reached the end!
                    </div>
                }
            >
                <AnimeLink grid={true} elements={items.media!} showIndex={true}/>
            </InfiniteScroll>
        </div>
    )
}