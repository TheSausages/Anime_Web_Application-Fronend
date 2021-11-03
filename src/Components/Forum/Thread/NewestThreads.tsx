import { useCallback, useEffect, useState } from "react";
import { SimpleThread, SimpleThreadPage } from "../../../data/Forum/Thread";
import { BackendError } from "../../../data/General/BackendError";
import useBasicState from "../../../data/General/BasicState";
import { snackbarError } from "../../../data/General/SnackBar";
import { ForumService } from "../../../Scripts/Services/ForumService";
import Loading from "../../Loading/Loading";
import SimpleThreadComponent from "./SimpleThreadComponent";

interface NewestThreadsProps {
}

export default function NewestThreads(props: NewestThreadsProps) {
    const [threads, setThreads] = useState<SimpleThreadPage>()
    const { loading, error, startLoading, stopLoading, snackbar, setErrorMessage, t, i18n } = useBasicState()

    const getNewestThreads = useCallback(async (threads: SimpleThreadPage) => {
        await ForumService.getNewestThreads(threads?.pageNumber ?? -1 + 1, t, i18n)
        .then((response: SimpleThreadPage) => setThreads({...response, content: [ ...threads?.content ?? [], ...response.content ]}))
        .catch((error: BackendError) => {
            setErrorMessage(error.message)
            snackbar(error.message, snackbarError)
        })
    }, [setErrorMessage, snackbar])

    useEffect(() => {
        startLoading()

        getNewestThreads({} as SimpleThreadPage);  

        stopLoading()
    }, [getNewestThreads, startLoading, stopLoading]);

    if (loading || threads === undefined) {
        return <Loading error={error}/>
    }

    if (threads!.content.length < 1) {
        return <Loading error={error}/>
    }

    return (
        <div>
            {
                threads.content.map((value: SimpleThread) => (
                    <SimpleThreadComponent thread={value} key={value.threadId} />
                ))
            }
        </div>
    )
}