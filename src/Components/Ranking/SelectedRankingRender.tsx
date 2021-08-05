import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading'
import InfiniteScroll from "react-infinite-scroll-component";
import './css/RankingSelect.css'
import { RankingItem } from './Rankings';
import { Page } from '../../data/Anilist/Page';
import { titlesInWantedOrder } from '../../Scripts/Utilities';
import "./css/SelectedRankingRender.css"
import { useCallback } from 'react';

interface RankingItemRenderProps {
    selectedRanking: RankingItem
}

interface RankingInformation {
    items: Page;
    currentPage: number;
}

const delayInSeconds = 5.5;

export default function RankingItemRender(props: RankingItemRenderProps) {
    const { selectedRanking } = props

    /*Start items state as possibly undefined - dummy start*/
    const [rankingItems, setRankingItems] = useState<RankingInformation>()

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const getMoreRankingData = useCallback(async (rankingItems) => {
        let currectRankingItems = { ...rankingItems }
        let currentPageAfter = currectRankingItems.currentPage + 1;
    
        var results: Page = await selectedRanking.fetch(currentPageAfter)
        currectRankingItems.items.media!.push(...results.media!)
        currectRankingItems.items.pageInfo = results.pageInfo!
        currectRankingItems.currentPage = currentPageAfter

        setRankingItems(currectRankingItems)
    }, [selectedRanking])

    useEffect(() => {
        try {
            setLoading(true)

            let timer = setTimeout(() => setLoading(false), delayInSeconds * 100);

            /*true state start - begin with page 0 and empty array*/
            getMoreRankingData({ items: {media: []} as Page, currentPage: 0 })

            return () => clearTimeout(timer)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }, [getMoreRankingData])

    if (loading || rankingItems === undefined) {
        return <Loading error={error}/>
    }

    return (
        <div className="RankingItem">
            <InfiniteScroll
                style={{overflow: "hidden"}}
                dataLength={rankingItems.items.media!.length}
                next={() => getMoreRankingData(rankingItems)}
                hasMore={rankingItems.items.pageInfo!.hasNextPage!}
                loader={<Loading />}
                endMessage={
                    <div>
                        You reached the end!
                    </div>
                }
            >
                {rankingItems.items.media!.map((element, index) => {
                    return (
                        <p key={index}>
                            {titlesInWantedOrder(element.title)}
                        </p>
                    )
                })}
            </InfiniteScroll>
        </div>
    )
}