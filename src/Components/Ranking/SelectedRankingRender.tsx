import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading'
import InfiniteScroll from "react-infinite-scroll-component";
import './css/RankingSelect.css'
import { RankingItem } from './Rankings';
import { Page } from '../../data/Page';
import { titlesInWantedOrder } from '../../Scripts/Utilities';
import "./css/SelectedRankingRender.css"

interface RankingItemRenderProps {
    selectedRanking: RankingItem
}

interface RankingItemData {
    selectedRanking: RankingItem
    page?: Page
}

const delayInSeconds = 5.5;

export default function RankingItemRender(props: RankingItemRenderProps) {
    const [rankingItemData, setRankingItemData] = useState<RankingItemData>(
        props
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    async function wrapper() {
        let results = await props.selectedRanking.fetch(1);

        let currectRankingData = { ...rankingItemData }
        currectRankingData.page = results

        setRankingItemData(currectRankingData)
    }

    async function getMoreAnime() {
        let currectRankingData = { ...rankingItemData }
    
        var results = await rankingItemData.selectedRanking.fetch(rankingItemData.page!.pageInfo!.currentPage! + 1);
        currectRankingData.page!.media = currectRankingData.page!.media!.concat(results.media!)
        currectRankingData.page!.pageInfo! = results.pageInfo!
    
        setRankingItemData(currectRankingData)
    }

    useEffect(() => {
        try {
            setLoading(true)

            let timer = setTimeout(() => setLoading(false), delayInSeconds * 100);

            wrapper();

            return () => clearTimeout(timer)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }, [props.selectedRanking])

    if (loading || !rankingItemData.selectedRanking || !rankingItemData.page) {
        return <Loading error={error}/>
    }

    return (
        <div className="RankingItem">
            <InfiniteScroll
                /*className="infiniteScroll"*/
                style={{overflow: "hidden"}}
                dataLength={rankingItemData.page.media!.length - 1}
                next={getMoreAnime}
                hasMore={rankingItemData.page!.pageInfo!.hasNextPage!}
                loader={<Loading />}
                endMessage={
                    <div>
                        You reached the end!
                    </div>
                }
            >
                {rankingItemData.page!.media!.map((element, index) => {
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