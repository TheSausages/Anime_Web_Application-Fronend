import React, { useEffect, useState } from 'react';
import { AnimeUserInformation } from '../../data/Anime/Smaller/AnimeUserInformation';
import { UserService } from '../../Scripts/Services/UserService';
import Loading from '../Loading/Loading'

interface ForumProps {
}

export default function Forum(props: ForumProps) {
    const [data, setData] = useState<boolean>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
            try {
                setLoading(true);

                setData(true);

                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError(error)
            }
    }, []);

    if (loading || !data) {
        return <Loading error={error}/>
    }

    return (
        <div>
            Witam na forum!

            <button>Sprawdz Context</button>
        </div>
    )
}