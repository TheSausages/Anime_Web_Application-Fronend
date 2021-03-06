import { useState } from "react";
import { CompletePostPage, CreatePost } from "../../../data/Forum/Post";
import { CompleteThread } from "../../../data/Forum/Thread";
import { BackendError } from "../../../data/General/BackendError";
import useBasicState from "../../../data/General/BasicState";
import { snackbarError, snackBarSuccess } from "../../../data/General/SnackBar";
import { ForumService } from "../../../Scripts/Services/ForumService";
import ButtonCollored from "../../Miscellaneous/ButtonCollored";
import PostForm from "./PostForm";

/**
 * The props for the {@link NewPostButton} component.
 */
export interface NewPostComponentProps {
    /** Thread for which the post should be created. */
    thread: CompleteThread;

    /** Method to add the new post to the thread posts. */
    setNewPosts: (posts: CompletePostPage) => void
}

/**
 * Component containing the button to open the new thread component.
 * @param props {@link NewPostComponentProps}
 * @see {@link PostForm}
 */
export default function NewPostButton(props: NewPostComponentProps) {
    const [open, setOpen] = useState<boolean>(false);
    const { snackbar, t, i18n } = useBasicState()

    async function createPost(post: CreatePost) {
        await ForumService.createPostForThread(props.thread.threadId, post, t, i18n)
        .then((response: CompletePostPage) => {
            snackbar(t("forum.post.postCreatedSuccessfully"), snackBarSuccess)
            props.setNewPosts(response)
        })
        .catch((error: BackendError) => snackbar(error.message, snackbarError))
    }

    return (
        <div className="newPostButton">
            <ButtonCollored text={t("forum.post.newPostForm.newPostButton")} onClick={() => setOpen(true)} />
                
            <PostForm title={t("forum.post.newPostForm.title")} open={open} close={() => setOpen(false)} onSubmit={createPost} />
        </div>
    )
}