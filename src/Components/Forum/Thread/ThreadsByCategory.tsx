import { useState, useCallback, useEffect } from "react";
import { ForumCategory } from "../../../data/Forum/ForumCategory";
import { SimpleThreadPage } from "../../../data/Forum/Thread";
import { BackendError } from "../../../data/General/BackendError";
import { snackbarError } from "../../../data/General/SnackBar";
import { ForumService } from "../../../Scripts/Services/ForumService";
import Loading from "../../Loading/Loading";
import { ForumQuery } from "../../../data/Forum/ForumQuery";
import ThreadQueryResults from "./ThreadQueryResults";
import useBasicState from "../../../data/General/BasicState";

import "../css/ThreadByCategory.css"

/**
 * The props for the {@link ThreadsByCategory} component.
 */
export interface ThreadsByCategoryProps {
    /** All available categories. */
    category: ForumCategory;
}

/**
 * Component for getting threads by one, selected category. Is used in the forum menu.
 * @param props {@link ThreadsByCategoryProps}
 * @see {@link ForumMenu}
 */
export default function ThreadsByCategory(props: ThreadsByCategoryProps) {
    const [threads, setThreads] = useState<SimpleThreadPage>()
    const { loading, error, startLoading, stopLoading, snackbar, setErrorMessage, t, i18n } = useBasicState()

    const getByCategory = useCallback(async (threads: SimpleThreadPage) => {
        await ForumService.searchThreadsByQuery({category: props.category} as ForumQuery, threads.pageNumber ?? -1 + 1, t, i18n)
        .then((response: SimpleThreadPage) => setThreads({...response, content: [ ...threads?.content ?? [], ...response.content ]}))
        .catch((error: BackendError) => {
            setErrorMessage(error.message)
            snackbar(error.message, snackbarError)
        })
    }, [setErrorMessage, snackbar, props.category, t, i18n])

    useEffect(() => {
        startLoading()

        getByCategory({} as SimpleThreadPage);  

        stopLoading()
    }, [getByCategory, startLoading, stopLoading]);

    if (loading || threads === undefined) {
        return <Loading error={error}/>
    }

    return (
        <ThreadQueryResults threads={threads} getMore={getByCategory} />
    )
}