import { useSnackbar } from "notistack";
import { useState, useCallback, useEffect } from "react";
import { ForumCategory } from "../../../data/Forum/ForumCategory";
import { SimpleThread, SimpleThreadPage } from "../../../data/Forum/Thread";
import { BackendError } from "../../../data/General/BackendError";
import { snackbarError } from "../../../data/General/SnackBar";
import { ForumService } from "../../../Scripts/Services/ForumService";
import Loading from "../../Loading/Loading";
import SimpleThreadComponent from "./SimpleThreadComponent";

interface ThreadsByCategoryProps {
    category: ForumCategory;
}

export default function ThreadsByCategory(props: ThreadsByCategoryProps) {
    const [threads, setThreads] = useState<SimpleThreadPage>()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();
    const { enqueueSnackbar } = useSnackbar();

    const getByCategory = useCallback(async (threads: SimpleThreadPage) => {
        await ForumService.searchThreads({category: props.category}, threads.pageNumber ?? -1 + 1)
        .then((response: SimpleThreadPage) => setThreads({...response, content: [ ...threads?.content ?? [], ...response.content ]}))
        .catch((error: BackendError) => {
            setError(error.message)
            enqueueSnackbar(error.message, snackbarError)
        })
    }, [enqueueSnackbar, props.category])

    useEffect(() => {
        try {
            setLoading(true);

            getByCategory({} as SimpleThreadPage);  

            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError("An unknown Error occured!")
        }
    }, [getByCategory]);

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