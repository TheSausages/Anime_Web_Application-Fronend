import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { ForumCategory } from '../../data/Forum/ForumCategory';
import { BackendError } from '../../data/General/BackendError';
import { snackbarError } from '../../data/General/SnackBar';
import { ForumService } from '../../Scripts/Services/ForumService';
import ForumMenu from './ForumMenu';
import ForumSwitch from './ForumSwitch';
import { AdditionalForumCategories } from '../../data/Forum/AdditionalForumCategories';
import useBasicState from '../../data/General/BasicState';

import "./css/Forum.css"

interface ForumProps {
}

export default function Forum(props: ForumProps) {
    const [categories, setCategories] = useState<ForumCategory[]>();
    const { loading, startLoading, stopLoading, snackbar, t, i18n } = useBasicState()

    const getCategories = useCallback(async () => {
        await ForumService.getForumCategories(t, i18n)
        .then((response: ForumCategory[]) => {
            setCategories(response)
        })
        .catch((error: BackendError) => {
            snackbar(error.message, snackbarError)
        })
    }, [snackbar])

    useEffect(() => {
            try {
                startLoading()

                getCategories();  

                stopLoading()
            } catch (error) {
            }
    }, [getCategories, startLoading, stopLoading]);

    if (loading || !categories) {
        return null;
    }

    return (
        <div id="MainForumContainer">
            <div id="ForumMenu">
                <ForumMenu categories={AdditionalForumCategories.concat(categories)}/>
            </div>

            <div id="ForumPage">
                <ForumSwitch categories={categories} />
            </div>
        </div>
    )
}