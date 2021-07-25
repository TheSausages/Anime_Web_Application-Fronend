import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading'
import { RankingItem, Rankings } from './Rankings';
import RankingItemRender from './SelectedRankingRender';
import './css/RankingSelect.css'

interface RankingSelectProps {
}

export default function RankingSelect(props: RankingSelectProps) {
    const [selectedRanking, setSelectedRanking] = useState<RankingItem>(Rankings[0]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
            try {
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError(error)
            }
    }, [selectedRanking]);


    if (loading || !selectedRanking) {
        return <Loading error={error}/>
    }

    return (
        <div id="MainRankingContainer">
            <div className="Rankings">
                {
                    Rankings.map((item, index) => {
                        return (
                            <li key={index} onClick={() => setSelectedRanking(item)}>
                                {item.title}
                            </li>
                        )
                    })
                }
            </div>

            <div className='line'>
                    <p>{selectedRanking? selectedRanking.title : 'No Title Found'}</p>
            </div>

            <RankingItemRender selectedRanking={selectedRanking}/>
        </div>
    )
}