import { CompletePost, CreatePost, UpdatePost } from "../../../data/Forum/Post";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from "react-router";
import PostReactionForm from "./PostReactionForm";
import { checkIfGivenUserLoggedIn, getRandomColor } from "../../../Scripts/Utilities";
import { useState } from "react";
import PostForm from "./PostForm";
import { ForumService } from "../../../Scripts/Services/ForumService";
import { snackbarError, snackBarSuccess } from "../../../data/General/SnackBar";
import { BackendError } from "../../../data/General/BackendError";
import useBasicState from "../../../data/General/BasicState";

import "../css/PostComponent.css"

/**
 * The props for the {@link PostComponent} component.
 */
export interface PostProps {
    /** Post to be shown. */
    post: CompletePost;

    /** The key of the post */
    key: number;

    /** Id of the thread ot which the post belongs. */
    threadId: number;
}

const color = getRandomColor(true);

/**
 * Main component to show posts. Also enables the editing and reaction to the post.
 * @param props {@link PostProps}
 * @see {@link PostForm}
 * @see {@link PostReactionForm}
 */
export default function PostComponent(props: PostProps) {
    const { threadId } = props;
    const [post, setPost] = useState<CompletePost>(props.post)
    const history = useHistory();
    const { snackbar, open, openElement, closeElement, t, i18n } = useBasicState();

    async function editPost(editPost: CreatePost) {
        await ForumService.updatePostForThread(threadId, {...editPost, postId: post.postId} as UpdatePost, t, i18n)
        .then((response: CompletePost) => {
            snackbar(t("forum.post.postUpdatedSuccessfully"), snackBarSuccess);
            setPost(response);
        })
        .catch((error: BackendError) => snackbar(error.message, snackbarError))
    }

    const isLoggedUser = checkIfGivenUserLoggedIn(post.creator.username);

    return (
        <div className="Post" style={{borderColor: color}}>
            <div style={{color: color}} onClick={_ => history.push(`/user/${post.creator.userId}`)} className="PostCreator PostLink">{post.creator.username}</div>
            <div className="PostTimes">
                <div><AddIcon sx={{ fontSize: '0.8rem', verticalAlign: 'text-top', color: color }} />{t("forum.post.created")}: {new Date(post.creation).toLocaleString()}</div>
                <div><EditIcon sx={{ fontSize: '0.8rem', verticalAlign: 'text-top', color: color }} />{t("forum.post.lastModified")}: {new Date(post.modification).toLocaleString()}</div>
            </div>
            <div className="PostTitle">{post.title}</div>
            <div className="PostText">{post.text}</div>

            {isLoggedUser &&
                <div className="PostEditText">
                    <i onClick={() => openElement()} style={{color: color}}>{t("forum.post.editPostForm.editPost")}</i>

                    <PostForm title={t("forum.post.editPostForm.title")} open={open} close={() => closeElement()} data={post} onSubmit={editPost} />
                </div>
            }

            <div className="PostInput"><PostReactionForm nrOfPlus={post.nrOfPlus} nrOfMinus={post.nrOfMinus} postUserStatus={post.postUserStatus} color={color} isLoggedUser={isLoggedUser} /></div>
        </div>
    )
}