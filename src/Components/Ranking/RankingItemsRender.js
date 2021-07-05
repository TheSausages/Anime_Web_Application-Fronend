import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading'
import InfiniteScroll from "react-infinite-scroll-component";
import './css/RankingSelect.css'


export default function RankingItemRender(props) {
    const [data, setData] = useState({Selected: props.Selected});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        try {
            setLoading(true);
    
            async function wrapper() {
                let results = await props.Selected.fetch(1);
                setData({Selected: props.Selected,
                    SelectedRankingData: results.media,
                    CurrentPageInfoOfRankingData: results.pageInfo
                });
            }

            wrapper();

            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }, [props.Selected]);

    if (loading || !data.SelectedRankingData || data.Selected !== props.Selected) {
        return <Loading error={error}/>
    }

    return (
        <div>
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

        var existingList = data.SelectedRankingData
    
        var results = await data.Selected.fetch(pageNumber);
        existingList = existingList.concat(results.media);
    
        setData({Selected: data.Selected, SelectedRankingData: existingList, CurrentPageInfoOfRankingData: results.pageInfo});
    }
}