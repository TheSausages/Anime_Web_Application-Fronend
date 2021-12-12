import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading'
import { RankingItem, Rankings } from './Rankings';
import RankingItemRender from './SelectedRankingRender';
import useBasicState from '../../data/General/BasicState';
import { useTranslation } from 'react-i18next';

import './css/RankingSelect.css'

/**
 * The props for the {@link RankingSelect} component.
 */
interface RankingSelectProps {
}

/**
 * Component used to select 
 * @param props {@link RankingSelectProps}
 * @returns 
 */
export default function RankingSelect(props: RankingSelectProps) {
    const [selectedRanking, setSelectedRanking] = useState<RankingItem>(Rankings[0]);
    const { loading, startLoading, stopLoading } = useBasicState()
    const { t } = useTranslation();

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
                                {t(item.title)}
                            </div>
                        )
                    })
                }
            </div>

            <div className='line'>
                    <p>{selectedRanking? t(selectedRanking.title) : t("fieldErrors.fieldNotFound")}</p>
            </div>

            <RankingItemRender key={selectedRanking.title} selectedRanking={selectedRanking}/>
        </div>
    )
}