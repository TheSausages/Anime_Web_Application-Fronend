import { useSnackbar } from "notistack";
import { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CompleteThread } from "../../../data/Forum/Thread";
import { BackendError } from "../../../data/General/BackendError";
import { snackbarError } from "../../../data/General/SnackBar";
import { ForumService } from "../../../Scripts/Services/ForumService";
import Loading from "../../Loading/Loading";
import ThreadStatusComponent from "./ThreadStatusComponent";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Tags from "./Tags";
import ThreadPostsComponent from "./ThreadPostsComponent";

import "../css/CompleteThreadComponent.css";
import '../../Miscellaneous/css/Line.css';
import ButtonCollored from "../../Miscellaneous/ButtonCollored";
import { Dialog } from "@material-ui/core";
import NewPostComponent from "../Post/NewPostComponent";
import NewThreadComponent from "./NewThreadComponent";

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
        <div>
            <div style={{ borderColor: primaryColor }} id="Thread">
                <ThreadStatusComponent primaryColor={primaryColor} status={thread.status} id={`${thread.threadId}`} className="ThreadStatus" />

                <div className="ThreadUser"><div className="line"><p>{thread.title}</p></div></div>

                <div onClick={_ => history.push("#")} className="ThreadUser ThreadLink">{thread.creator.username}</div>

                <div className="ThreadText">{thread.threadText}</div>
                <div></div>

                <div className="ThreadTimes">
                    <div><AddIcon sx={{ fontSize: '0.8rem', verticalAlign: 'text-top', color: primaryColor }} />Created: {new Date(thread.creation).toLocaleString()}</div>
                    <div><EditIcon sx={{ fontSize: '0.8rem', verticalAlign: 'text-top', color: primaryColor }} />Last Modified: {new Date(thread.modification).toLocaleString()}</div>
                </div>

                <div className="ThreadCategory"><i title="Category">{thread.category.categoryName}</i></div>

                <Tags tags={thread.tags} className="ThreadTags" />
            </div>

            <div id="Posts">
                <ThreadPostsComponent postsPage={thread.posts} threadId={props.threadId} />
            </div>

            <div className="NewElementButtons">
                <NewThreadComponent />
                <NewPostComponent />
            </div>
        </div>
    )
}