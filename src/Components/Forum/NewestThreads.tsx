import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { SimpleThread, SimpleThreadPage } from "../../data/Forum/Thread";
import { BackendError } from "../../data/General/BackendError";
import { snackbarError } from "../../data/General/SnackBar";
import { ForumService } from "../../Scripts/Services/ForumService";
import Loading from "../Loading/Loading";
import SimpleThreadComponent from "./SimpleThreadComponent";

interface NewestThreadsProps {
}

export default function NewestThreads(props: NewestThreadsProps) {
    const [threads, setThreads] = useState<SimpleThreadPage>()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();
    const { enqueueSnackbar } = useSnackbar();

    const getNewestThreads = useCallback(async (threads: SimpleThreadPage) => {
        await ForumService.getNewestThreads(threads?.pageNumber ?? -1 + 1)
        .then((response: SimpleThreadPage) => setThreads({...response, content: [ ...threads?.content ?? [], ...response.content ]}))
        .catch((error: BackendError) => {
            setError(error.message)
            enqueueSnackbar(error.message, snackbarError)
        })
    }, [enqueueSnackbar])

    useEffect(() => {
        try {
            setLoading(true);

            getNewestThreads({} as SimpleThreadPage);  

            setLoading(false)
        } catch (error) {
            setLoading(true)
            setError("An unknown Error occured!")
        }
    }, [getNewestThreads]);

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