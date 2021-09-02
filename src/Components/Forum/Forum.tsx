import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { Route, Router, Switch, useRouteMatch } from 'react-router-dom';
import { ForumCategory } from '../../data/Forum/ForumCategory';
import { BackendError } from '../../data/General/BackendError';
import { snackbarError } from '../../data/General/SnackBar';
import { ForumService } from '../../Scripts/Services/ForumService';
import Loading from '../Loading/Loading'

import "./css/Forum.css"
import ForumMenu from './ForumMenu';
import ForumSwitch from './ForumSwitch';
import Threads from './Threads';
import ThreadSearch from './ThreadSearch';

interface ForumProps {
}

export default function Forum(props: ForumProps) {
    const [categories, setCategories] = useState<ForumCategory[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();
    const { enqueueSnackbar } = useSnackbar();

    const getCategories = useCallback(async () => {
        await ForumService.getForumCategories()
        .then((response: ForumCategory[]) => setCategories(response))
        .catch((error: BackendError) => {
            setError(error.message)
            enqueueSnackbar(error.message, snackbarError)
        })
    }, [enqueueSnackbar])

    useEffect(() => {
            try {
                setLoading(true);

                getCategories();  

                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError(error)
            }
    }, []);

    if (loading || !categories) {
        return <Loading error={error}/>
    }

    return (
        <div id="MainForumContainer">
            <div id="ForumMenu">
                <ForumMenu categories={categories}/>
            </div>

            <div id="ForumPage">
                <ForumSwitch />
            </div>
        </div>
    )
}