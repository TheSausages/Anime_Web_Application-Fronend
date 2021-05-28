import React, { useEffect, useState } from 'react';
//import { Capitalize } from '../../Scripts/Capitalize';
import { getAnimeById } from '../../Scripts/AnimeFetch'
import Loading from '../Loading'

export default function Anime(props) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
            try {
                setLoading(true);

                let result = await getAnimeById(props.match.params.id);
                setData({
                    Anime: result.data.Media 
                });


                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log('Error:' + error)
            }
    }, []);

    if (loading) {
        return <Loading />
    }

    if (!data) {
        return <span>Data not available</span>;
    }

    return (
        <div>
            <div>
                {data.Anime.id}
            </div>
        </div>
    )
}