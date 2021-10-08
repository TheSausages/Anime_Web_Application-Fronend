import { useState } from "react";
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

    async function createPost(post: CreatePost) {
        await ForumService.createPostForThread(props.thread.threadId, post)
        .then((response: PageDTO<CompletePost>) => {
            snackbar("Your new post was created!", snackBarSuccess)
            props.setNewPosts(response)
        })
        .catch((error: BackendError) => snackbar(error.message, snackbarError))
    }

    return (
        <div className="newPostButton">
            <ButtonCollored text="new Post" onClick={() => setOpen(true)} />
                
            <PostForm title="Create Post" open={open} close={() => setOpen(false)} onSubmit={createPost} />
        </div>
    )
}