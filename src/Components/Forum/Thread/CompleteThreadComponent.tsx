import { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CompleteThread, UpdateThread } from "../../../data/Forum/Thread";
import { BackendError } from "../../../data/General/BackendError";
import { snackbarError, snackBarSuccess } from "../../../data/General/SnackBar";
import { ForumService } from "../../../Scripts/Services/ForumService";
import Loading from "../../Loading/Loading";
import ThreadStatusComponent from "./ThreadStatusComponent";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Tags from "./Tags";
import ThreadPostsComponent from "./ThreadPostsComponent";
import NewPostButton from "../Post/NewPost";
import NewThreadComponent from "./NewThreadComponent";
import { CompletePost } from "../../../data/Forum/Post";
import { PageDTO } from "../../../data/General/PageDTO";
import { checkIfGivenUserLoggedIn, checkIfObjectIsEmpty } from "../../../Scripts/Utilities";
import { ForumCategory } from "../../../data/Forum/ForumCategory";
import ThreadForm from "./ThreadForm";
import useBasicState from "../../../data/General/BasicState";

import "../css/CompleteThreadComponent.css";
import '../../Miscellaneous/css/Line.css';

interface ThreadProps {
    threadId: number;
    categories: ForumCategory[];
}

export default function CompleteThreadComponent(props: ThreadProps) {
    const [thread, setThread] = useState<CompleteThread>({} as CompleteThread)
    const history = useHistory();
    const { loading, error, startLoading, stopLoading, snackbar, setErrorMessage, open, openElement, closeElement } = useBasicState()
    
    const getThread = useCallback(async () => {
        await ForumService.getThreadById(props.threadId)
        .then((response: CompleteThread) => setThread(response))
        .catch((error: BackendError) => {
            snackbar(error.message, snackbarError)
            setErrorMessage(error.message)
        })
    }, [snackbar, setErrorMessage, props.threadId])

    useEffect(() => {
        startLoading()

        getThread();  

        stopLoading()
    }, [getThread, startLoading, stopLoading]);

    function setNewPostPage(posts: PageDTO<CompletePost>) {
        //Setting loading to reset the component and hide posts for a second
        startLoading()
        setThread({ ...thread, nrOfPosts: thread.nrOfPosts + 1, posts })
        stopLoading()
    }

    async function editThread(editThread: UpdateThread) {
        startLoading()

        await ForumService.updateThread(thread.threadId, { ...editThread, threadId: thread.threadId })
        .then((response: CompleteThread) => {
            setThread(response)
            snackbar("Thread updates successfully!", snackBarSuccess)
            stopLoading()
        }).catch((error: BackendError) => snackbar(error.message, snackbarError))
    }

    if (loading || thread === undefined || checkIfObjectIsEmpty(thread)) {
        return <Loading error={error}/>
    }

    const primaryColor = thread.status === "Open" ? 'rgb(54 192 61)' : 'rgb(255 90 90)';
    const isLoggedUser = checkIfGivenUserLoggedIn(thread.creator.username)

    return (
        <div>
            <div style={{ borderColor: primaryColor }} id="Thread">
                <ThreadStatusComponent primaryColor={primaryColor} status={thread.status} id={`${thread.threadId}`} className="ThreadStatus" />

                <div className="ThreadUser"><div className="line"><p>{thread.title}</p></div></div>

                <div onClick={_ => history.push("#")} className="ThreadUser ThreadLink">{thread.creator.username}</div>

                <div className="ThreadText">{thread.text}</div>
                <div></div>

                <div className="ThreadTimes">
                    <div><AddIcon sx={{ fontSize: '0.8rem', verticalAlign: 'text-top', color: primaryColor }} />Created: {new Date(thread.creation).toLocaleString()}</div>
                    <div><EditIcon sx={{ fontSize: '0.8rem', verticalAlign: 'text-top', color: primaryColor }} />Last Modified: {new Date(thread.modification).toLocaleString()}</div>
                </div>

                <div className="ThreadCategory"><i title="Category">{thread.category.categoryName}</i></div>

                {isLoggedUser &&
                    <div className="ThreadEditText" style={{color: primaryColor}}>
                        <i onClick={() => openElement()}>edit thread</i>

                        <ThreadForm title="Edit Thread" open={open} close={() => closeElement()} categories={props.categories} data={thread} onSubmit={editThread} />
                    </div>
                }

                <Tags tags={thread.tags} className="ThreadTags" />
            </div>

            <div id="Posts">
                <ThreadPostsComponent postsPage={thread.posts} threadId={props.threadId} />
            </div>

            <div className="NewElementButtons">
                <NewThreadComponent categories={props.categories} />
                { (thread.status === "Open" || checkIfGivenUserLoggedIn(thread.creator.username)) &&
                    <NewPostButton setNewPosts={setNewPostPage} thread={thread} />
                }
            </div>
        </div>
    )
}