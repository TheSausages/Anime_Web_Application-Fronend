import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading'
import { RankingItems } from './RankingItems';
import InfiniteScroll from "react-infinite-scroll-component";
import './css/RankingSelect.css'


export default function RankingSelect(props) {
    const [data, setData] = useState({
        Selected: RankingItems[0]
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(async () => {
            try {
                setLoading(true);

                console.log('change')

                var results = await data.Selected.fetch(1);
                data.SelectedRankingData = results.data.Page.media;
                data.CurrentPageInfoOfRankingData = results.data.Page.pageInfo;

                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError(error)
            }
    }, [data.Selected]);


    if (loading) {
        return <Loading />
    }

    if (!data) {
        return <span>Data not available with error: {error}</span>;
    }

    console.log(data.SelectedRankingData)

    return (
        <div id="MainRankingContainer">
            <div className="RankingItem">
                {
                    RankingItems.map((item, index) => {
                        return (
                            <li key={index} onClick={() => setData({Selected: item, SelectedRankingData: data.SelectedRankingData, CurrentPageInfoOfRankingData: data.CurrentPageInfoOfRankingData})}>
                                {item.title}
                            </li>
                        )
                    })
                }
            </div>

            <div className='line'>
                    <p>{data.Selected !== undefined ? data.Selected.title : ''}</p>
            </div>

            <InfiniteScroll dataLength={data.SelectedRankingData.length}
                next={getMoreAnime}
                hasMore={data.CurrentPageInfoOfRankingData.currentPage < data.CurrentPageInfoOfRankingData.lastPage ? true : false}
                loader={<h4>Loading...</h4>}
            >
                {data.SelectedRankingData.map((elem, index) => {
                    return (
                        <p key={index}>
                            {elem.title.english !== null ? elem.title.english : elem.title.romaji}
                        </p>
                    )
                })}
            </InfiniteScroll>
        </div>
    )

    async function getMoreAnime() {
        var pageNumber = data.CurrentPageInfoOfRankingData.currentPage + 1;

        console.log(pageNumber)
        var existingList = data.SelectedRankingData
    
        var results = await data.Selected.fetch(pageNumber);
        existingList = existingList.concat(results.data.Page.media);
    
        setData({Selected: data.Selected, SelectedRankingData: existingList, CurrentPageInfoOfRankingData: results.data.Page.pageInfo});
    }
}