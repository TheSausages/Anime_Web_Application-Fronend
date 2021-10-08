import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading'
import { RankingItem, Rankings } from './Rankings';
import RankingItemRender from './SelectedRankingRender';
import useBasicState from '../../data/General/BasicState';

import './css/RankingSelect.css'

interface RankingSelectProps {
}

export default function RankingSelect(props: RankingSelectProps) {
    const [selectedRanking, setSelectedRanking] = useState<RankingItem>(Rankings[0]);
    const { loading, startLoading, stopLoading } = useBasicState()

    useEffect(() => {
        startLoading()

        stopLoading()
    }, [selectedRanking, startLoading, stopLoading]);


    if (loading || !selectedRanking) {
        return <Loading />
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