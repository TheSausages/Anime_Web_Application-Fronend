import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading'
import { RankingItems } from './RankingItems';
import RankingItemRender from './RankingItemsRender';
import './css/RankingSelect.css'


export default function RankingSelect(props) {
    const [data, setData] = useState({
        Selected: RankingItems[0]
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
            try {
                setLoading(true);
                

                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError(error)
            }
    }, [data.Selected]);


    if (loading || !data) {
        return <Loading error={error}/>
    }

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
                    <p>{data.Selected !== undefined ? data.Selected.title : 'No Title Found'}</p>
            </div>

            <RankingItemRender Selected={data.Selected}/>
        </div>
    )
}