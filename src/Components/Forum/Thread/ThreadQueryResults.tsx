import InfiniteScroll from "react-infinite-scroll-component";
import { SimpleThread, SimpleThreadPage } from "../../../data/Forum/Thread";
import useBasicState from "../../../data/General/BasicState";
import Loading from "../../Loading/Loading";
import SimpleThreadComponent from "./SimpleThreadComponent";

interface ThreadQueryResultsProps {
    threads: SimpleThreadPage;
    getMore: (threads: SimpleThreadPage) => void;
}

export default function ThreadQueryResults(props: ThreadQueryResultsProps) {
    const { threads, getMore } = props;
    const { t } = useBasicState();

    return (
        <div>
            { threads!.content.length < 1 ?
                <div className="NoPostsText">{t("forum.thread.noThreadsForConditions")}</div>
            :
                <InfiniteScroll
                    style={{overflow: 'none'}}
                    dataLength={threads.content.length}
                    next={() => getMore(threads)}
                    hasMore={!threads.last}
                    loader={<Loading />}
                >
                    {
                        threads.content.map((value: SimpleThread) => (
                            <SimpleThreadComponent thread={value} key={value.threadId} />
                        ))
                    }
                </InfiniteScroll>
            }
        </div>
    )
}