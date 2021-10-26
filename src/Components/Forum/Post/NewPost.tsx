import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CompletePost, CreatePost } from "../../../data/Forum/Post";
import { CompleteThread } from "../../../data/Forum/Thread";
import { BackendError } from "../../../data/General/BackendError";
import useBasicState from "../../../data/General/BasicState";
import { PageDTO } from "../../../data/General/PageDTO";
import { snackbarError, snackBarSuccess } from "../../../data/General/SnackBar";
import { ForumService } from "../../../Scripts/Services/ForumService";
import ButtonCollored from "../../Miscellaneous/ButtonCollored";
import PostForm from "./PostForm";

interface NewPostComponentProps {
    thread: CompleteThread;
    setNewPosts: (posts: PageDTO<CompletePost>) => void
}

export default function NewPostButton(props: NewPostComponentProps) {
    const [open, setOpen] = useState<boolean>(false);
    const { snackbar } = useBasicState()
    const { t } = useTranslation();

    async function createPost(post: CreatePost) {
        await ForumService.createPostForThread(props.thread.threadId, post)
        .then((response: PageDTO<CompletePost>) => {
            snackbar(t("postCreatedSuccessfully"), snackBarSuccess)
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