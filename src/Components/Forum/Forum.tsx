import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { ForumCategory } from '../../data/Forum/ForumCategory';
import { BackendError } from '../../data/General/BackendError';
import { snackbarError } from '../../data/General/SnackBar';
import { ForumService } from '../../Scripts/Services/ForumService';
import ForumMenu from './ForumMenu';
import ForumSwitch from './ForumSwitch';
import { AdditionalForumCategories } from '../../data/Forum/AdditionalForumCategories';


import "./css/Forum.css"

interface ForumProps {
}

export default function Forum(props: ForumProps) {
    const [categories, setCategories] = useState<ForumCategory[]>();
    const [loading, setLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();

    const getCategories = useCallback(async () => {
        await ForumService.getForumCategories()
        .then((response: ForumCategory[]) => {
            setCategories(AdditionalForumCategories.concat(response))
        })
        .catch((error: BackendError) => {
            enqueueSnackbar(error.message, snackbarError)
        })
    }, [enqueueSnackbar])

    useEffect(() => {
            try {
                setLoading(true);

                getCategories();  

                setLoading(false)
            } catch (error) {
                setLoading(true)
            }
    }, [getCategories]);

    if (loading || !categories) {
        return null;
    }

    return (
        <div id="MainForumContainer">
            <div id="ForumMenu">
                <ForumMenu categories={categories}/>
            </div>

            <div id="ForumPage">
                <ForumSwitch categories={categories} />
            </div>
        </div>
    )
}