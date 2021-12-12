import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading'
import { RankingItem } from './Rankings';
import { MediaPage } from '../../data/Anime/Page';
import { useCallback } from 'react';
import { BackendError } from '../../data/General/BackendError';
import { snackbarError } from '../../data/General/SnackBar';
import useBasicState from '../../data/General/BasicState';
import { MiscellaneousProperties } from '../../Properties/MiscellaneousProperties';
import AnimeLinkScroll from '../AnimeLink/AnimeListScroll';

/**
 * The props for the {@link CurrentUserProfile} component.
 */
export interface RankingItemRenderProps {
    /** The selected ranking, for which the elements should be found. */
    selectedRanking: RankingItem
}

/**
 * Used for the element state in {@link RankingItemRender}.
 */
export interface RankingInformation {
    /** The ranking items, that should be rendered. */
    items: MediaPage;

    /** Current page number. It's here for easier retrieval */
    currentPage: number;
}

/**
 * Component that renderes the elements for a given ranking.
 * @param props {@link RankingItemRenderProps}
 * @see {@link AnimeLinkScroll}
 */
export default function RankingItemRender(props: RankingItemRenderProps) {
    const { selectedRanking } = props

    /*Start items state as possibly undefined - dummy start*/
    const [rankingItems, setRankingItems] = useState<RankingInformation>()

    const { loading, error, startLoading, stopLoading, snackbar, setErrorMessage, t, i18n } = useBasicState()

    const getMoreRankingData = useCallback(async (rankingItems) => {
        let currectRankingItems = { ...rankingItems }
        let currentPageAfter = currectRankingItems.currentPage + 1;
    
        await selectedRanking.fetch(currentPageAfter, t, i18n)
        .then((results: MediaPage) => {
            currectRankingItems.items.media!.push(...results.media!)
            currectRankingItems.items.pageInfo = results.pageInfo!
            currectRankingItems.currentPage = currentPageAfter

            setRankingItems(currectRankingItems)
        })
        .catch((error: BackendError) => {
            setErrorMessage(error.message)
            snackbar(error.message,  snackbarError )
        })
    }, [selectedRanking, setErrorMessage, snackbar, t, i18n])

    useEffect(() => {
        startLoading()

        let timer = setTimeout(() => stopLoading(), MiscellaneousProperties.anilistRankingElementLoadingDelay * 100);

        /*true state start - begin with page 0 and empty array*/
        getMoreRankingData({ items: { media: [] } as MediaPage, currentPage: 0 })

        return () => clearTimeout(timer)
    }, [getMoreRankingData, startLoading, stopLoading])

    if (loading || rankingItems === undefined) {
        return <Loading error={error}/>
    }

    return (
        <AnimeLinkScroll items={rankingItems.items} getMore={() => getMoreRankingData(rankingItems)} />
    )
}
