import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading'
import { RankingItem, Rankings } from './Rankings';
import RankingItemRender from './SelectedRankingRender';
import './css/RankingSelect.css'
import { BackendError } from '../../data/General/BackendError';

interface RankingSelectProps {
}

export default function RankingSelect(props: RankingSelectProps) {
    const [selectedRanking, setSelectedRanking] = useState<RankingItem>(Rankings[0]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();

    useEffect(() => {
            try {
                setLoading(true)

                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError("An unknown Error occured!")
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
                            <div key={index} onClick={() => setSelectedRanking(item)}>
                                {item.title}
                            </div>
                        )
                    })
                }
            </div>

            <div className='line'>
                    <p>{selectedRanking? selectedRanking.title : 'No Title Found'}</p>
            </div>

            <RankingItemRender key={selectedRanking.title} selectedRanking={selectedRanking}/>
        </div>
    )
}