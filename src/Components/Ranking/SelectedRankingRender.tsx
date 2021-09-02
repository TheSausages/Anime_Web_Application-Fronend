import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading'
import InfiniteScroll from "react-infinite-scroll-component";
import { RankingItem } from './Rankings';
import { Page } from '../../data/Anime/Page';
import { useCallback } from 'react';
import { BackendError } from '../../data/General/BackendError';
import { useSnackbar } from 'notistack';
import { snackbarError } from '../../data/General/SnackBar';
import AnimeLink from '../AnimeLink/AnimeLink';

import './css/RankingSelect.css'

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

    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();

    const getMoreRankingData = useCallback(async (rankingItems) => {
        let currectRankingItems = { ...rankingItems }
        let currentPageAfter = currectRankingItems.currentPage + 1;
    
        await selectedRanking.fetch(currentPageAfter)
        .then((results: Page) => {
            currectRankingItems.items.media!.push(...results.media!)
            currectRankingItems.items.pageInfo = results.pageInfo!
            currectRankingItems.currentPage = currentPageAfter

            setRankingItems(currectRankingItems)
        })
        .catch((error: BackendError) => {
            setError(error.message)
            enqueueSnackbar(error.message,  snackbarError )
        })
    }, [selectedRanking, enqueueSnackbar])

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
                <AnimeLink grid={true} elements={rankingItems.items.media!} showIndex={true}/>
            </InfiniteScroll>
        </div>
    )
}
