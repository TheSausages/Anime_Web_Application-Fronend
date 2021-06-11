import React, { useEffect, useState } from 'react';
import Loading from '../Loading'
import '../ComponentsCss/Anime.css';

export default function Anime(props) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(async () => {
            try {
                setLoading(true);

                setData(true);

                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError(error)
            }
    }, []);

    if (loading) {
        return <Loading />
    }

    if (!data) {
        return <span>Data not available with error: {error}</span>;
    }

    return (
        <div>
            Witam na forum!
        </div>
    )
}