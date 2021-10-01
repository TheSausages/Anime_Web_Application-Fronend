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
import NewPostButton from "../Post/NewPost";
import NewThreadComponent from "./NewThreadComponent";
import { CompletePost } from "../../../data/Forum/Post";
import { PageDTO } from "../../../data/General/PageDTO";
import { checkIfObjectIsEmpty } from "../../../Scripts/Utilities";
import { ForumCategory } from "../../../data/Forum/ForumCategory";

import "../css/CompleteThreadComponent.css";
import '../../Miscellaneous/css/Line.css';

interface ThreadProps {
    threadId: number;
    categories: ForumCategory[];
}

export default function CompleteThreadComponent(props: ThreadProps) {
    const [thread, setThread] = useState<CompleteThread>({} as CompleteThread)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    
    const getThread = useCallback(async () => {
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

            getThread();  

            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError("An unknown Error occured!")
        }
    }, [getThread]);

    function setNewPostPage(posts: PageDTO<CompletePost>) {
        //Setting loading to reset the component and hide posts for a second
        setLoading(true)

        setThread({ ...thread, nrOfPosts: thread.nrOfPosts + 1, posts })
        
        setLoading(false)
    }

    if (loading || thread === undefined || checkIfObjectIsEmpty(thread)) {
        return <Loading error={error}/>
    }

    const primaryColor = thread.status === "Open" ? 'rgb(54 192 61)' : 'rgb(255 90 90)';

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

                <Tags tags={thread.tags} className="ThreadTags" />
            </div>

            <div id="Posts">
                <ThreadPostsComponent postsPage={thread.posts} threadId={props.threadId} />
            </div>

            <div className="NewElementButtons">
                <NewThreadComponent categories={props.categories} />
                <NewPostButton setNewPosts={setNewPostPage} thread={thread} />
            </div>
        </div>
    )
}