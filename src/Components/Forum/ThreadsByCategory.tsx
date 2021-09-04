import { useSnackbar } from "notistack";
import { useState, useCallback, useEffect } from "react";
import { ForumCategory } from "../../data/Forum/ForumCategory";
import { SimpleThread, SimpleThreadPage } from "../../data/Forum/Thread";
import { BackendError } from "../../data/General/BackendError";
import { snackbarError } from "../../data/General/SnackBar";
import { ForumService } from "../../Scripts/Services/ForumService";
import Loading from "../Loading/Loading";
import Threads from "./Threads";

interface ThreadsByCategoryProps {
    category: ForumCategory;
}

export default function ThreadsByCategory(props: ThreadsByCategoryProps) {
    const [threads, setThreads] = useState<SimpleThreadPage>({content: [] as SimpleThread[], pageNumber: -1} as SimpleThreadPage)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();
    const { enqueueSnackbar } = useSnackbar();

    const getNewestThreads = useCallback(async () => {
        await ForumService.searchThreads({category: props.category}, threads.pageNumber + 1)
        .then((response: SimpleThreadPage) => {
            setThreads({...response, content: threads.content.concat(response.content)})
        })
        .catch((error: BackendError) => {
            setError(error.message)
            enqueueSnackbar(error.message, snackbarError)
        })
    }, [enqueueSnackbar, props.category, threads])

    useEffect(() => {
        try {
            setLoading(true);

            getNewestThreads();  

            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError("An unknown Error occured!")
        }
    }, [getNewestThreads]);

    if (loading || threads.content.length < 1) {
        return <Loading error={error}/>
    }

    return (
        <Threads threads={threads} />
    )
}