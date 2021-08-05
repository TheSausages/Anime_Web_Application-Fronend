import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading'
import InfiniteScroll from "react-infinite-scroll-component";
import './css/RankingSelect.css'
import { RankingItem } from './Rankings';
import { Page } from '../../data/Anilist/Page';
import { titlesInWantedOrder } from '../../Scripts/Utilities';
import "./css/SelectedRankingRender.css"

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
    const [rankingItems, setRankingItems] = useState<RankingInformation>(
        { items: {media: []} as Page, currentPage: 0 }
    )
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    async function getMoreRankingData() {
        let currectRankingItems = { ...rankingItems }
        let currentPageAfter = rankingItems.currentPage + 1;

        console.log(currentPageAfter)
    
        var results: Page = await selectedRanking.fetch(currentPageAfter)
        currectRankingItems.items.media!.push(...results.media!)
        currectRankingItems.items.pageInfo = results.pageInfo!
        currectRankingItems.currentPage = currentPageAfter

        setRankingItems(currectRankingItems)
    }

    useEffect(() => {
        try {
            setLoading(true)

            console.log("a")
            let timer = setTimeout(() => setLoading(false), delayInSeconds * 100);

            getMoreRankingData()

            return () => clearTimeout(timer)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }, [selectedRanking])

    if (loading || rankingItems.items.media!.length! < 1) {
        return <Loading error={error}/>
    }

    console.log(rankingItems.items.pageInfo!)

    return (
        <div className="RankingItem">
            <InfiniteScroll
                style={{overflow: "hidden"}}
                dataLength={rankingItems.items.media!.length}
                next={() => getMoreRankingData()}
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