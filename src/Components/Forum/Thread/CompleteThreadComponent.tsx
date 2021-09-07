import { useSnackbar } from "notistack";
import { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CompleteThread } from "../../../data/Forum/Thread";
import { BackendError } from "../../../data/General/BackendError";
import { snackbarError } from "../../../data/General/SnackBar";
import { ForumService } from "../../../Scripts/Services/ForumService";
import Loading from "../../Loading/Loading";
import ThreadStatusComponent from "./ThreadStatusComponent";

import "../css/CompleteThreadComponent.css";

interface ThreadProps {
    threadId: number;
}

export default function CompleteThreadComponent(props: ThreadProps) {
    const [thread, setThread] = useState<CompleteThread>()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    
    const getByCategory = useCallback(async () => {
        await ForumService.getThreadById(props.threadId)
        .then((thread: CompleteThread) => setThread(thread))
        .catch((error: BackendError) => {
            enqueueSnackbar(error.message, snackbarError)
            setError(error.message)
        })
    }, [enqueueSnackbar, props.threadId])

    useEffect(() => {
        try {
            setLoading(true);

            getByCategory();  

            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError("An unknown Error occured!")
        }
    }, [getByCategory]);

    if (loading || thread === undefined) {
        return <Loading error={error}/>
    }

    const primaryColor = thread.status === "Open" ? 'rgb(54 192 61)' : 'rgb(255 90 90)';

    return (
        <div style={{ borderColor: primaryColor }} id="Thread">
            <ThreadStatusComponent primaryColor={primaryColor} status={thread.status} id={`${thread.threadId}`} />

            <div id="TitleUser">
                <span>{thread.title}</span>

                <span onClick={_ => history.push("#")}>{thread.creator.username}</span>
            </div>

            <div id="ThreadText">
                {thread.threadText}
            </div>
        </div>
    )
}