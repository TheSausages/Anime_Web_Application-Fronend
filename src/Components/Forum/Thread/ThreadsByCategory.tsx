import { useState, useCallback, useEffect } from "react";
import { ForumCategory } from "../../../data/Forum/ForumCategory";
import { SimpleThreadPage } from "../../../data/Forum/Thread";
import { BackendError } from "../../../data/General/BackendError";
import { snackbarError } from "../../../data/General/SnackBar";
import { ForumService } from "../../../Scripts/Services/ForumService";
import Loading from "../../Loading/Loading";
import { ForumQuery } from "../../../data/Forum/ForumQuery";

import "../css/ThreadByCategory.css"
import ThreadQueryResults from "./ThreadQueryResults";
import useBasicState from "../../../data/General/BasicState";

interface ThreadsByCategoryProps {
    category: ForumCategory;
}

export default function ThreadsByCategory(props: ThreadsByCategoryProps) {
    const [threads, setThreads] = useState<SimpleThreadPage>()
    const { loading, error, startLoading, stopLoading, snackbar, setErrorMessage } = useBasicState()

    const getByCategory = useCallback(async (threads: SimpleThreadPage) => {
        await ForumService.searchThreadsByQuery({category: props.category} as ForumQuery, threads.pageNumber ?? -1 + 1)
        .then((response: SimpleThreadPage) => setThreads({...response, content: [ ...threads?.content ?? [], ...response.content ]}))
        .catch((error: BackendError) => {
            setErrorMessage(error.message)
            snackbar(error.message, snackbarError)
        })
    }, [setErrorMessage, snackbar, props.category])

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