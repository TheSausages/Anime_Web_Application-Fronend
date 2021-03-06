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
import ThreadReactionForm from "./ThreadReactionForm";

import "../css/CompleteThreadComponent.css";
import '../../Miscellaneous/css/Line.css';

/**
 * The props for the {@link CompleteThreadComponent} component.
 */
export interface CompleteThreadProps {
    /** The id of the thread. */
    threadId: number;

    /** All possible categories */
    categories: ForumCategory[];
}

/**
 * A complete thread component. It shows all information on the thread together with it's posts.
 * @param props {@link CompleteThreadProps}
 * @see {@link ThreadPostsComponent}
 */
export default function CompleteThreadComponent(props: CompleteThreadProps) {
    const [thread, setThread] = useState<CompleteThread>({} as CompleteThread)
    const history = useHistory();
    const { loading, error, startLoading, stopLoading, snackbar, setErrorMessage, open, openElement, closeElement, t, i18n } = useBasicState()
    
    const getThread = useCallback(async () => {
        await ForumService.getThreadById(props.threadId, t, i18n)
        .then((response: CompleteThread) => setThread(response))
        .catch((error: BackendError) => {
            snackbar(error.message, snackbarError)
            setErrorMessage(error.message)
        })
    }, [snackbar, setErrorMessage, props.threadId, t, i18n])

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

        await ForumService.updateThread(thread.threadId, { ...editThread, threadId: thread.threadId }, t, i18n)
        .then((response: CompleteThread) => {
            setThread(response)
            snackbar(t("forum.thread.threadUpdatesSuccessfully"), snackBarSuccess)
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

                <div onClick={_ => history.push(`/user/${thread.creator.userId}`)} className="ThreadUser ThreadLink">{thread.creator.username}</div>

                <div className="ThreadText">{thread.text}</div>
                <div></div>

                <div className="ThreadTimes">
                    <div><AddIcon sx={{ fontSize: '0.8rem', verticalAlign: 'text-top', color: primaryColor }} />{t("forum.thread.created")}: {new Date(thread.creation).toLocaleString()}</div>
                    <div><EditIcon sx={{ fontSize: '0.8rem', verticalAlign: 'text-top', color: primaryColor }} />{t("forum.thread.lastModified")}: {new Date(thread.modification).toLocaleString()}</div>
                </div>

                <div className="ThreadCategory"><i title="Category">{thread.category.categoryName}</i></div>

                <div className="ThreadReactForm">
                    <ThreadReactionForm threadUserStatus={thread.threadUserStatus}
                        isLoggedUser={isLoggedUser}
                        color={primaryColor}
                    />
                </div>

                {isLoggedUser &&
                    <div className="ThreadEditText" style={{color: primaryColor}}>
                        <i onClick={() => openElement()}>{t("forum.thread.editThreadForm.editThread")}</i>

                        <ThreadForm title={t("forum.thread.editThreadForm.title")} open={open} close={() => closeElement()} categories={props.categories} data={thread} onSubmit={editThread} />
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