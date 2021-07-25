import React, { useEffect, useState } from 'react';
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

            <button onClick={() => user()}>Sprawdz Context</button>
        </div>
    )

    function user() {
        fetch('http://localhost:8080/forum/user', {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + localStorage.getItem('accessToken')
            }
        })
        .then(data => data.json());
    }
}