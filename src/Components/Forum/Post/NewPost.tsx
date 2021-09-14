import { useSnackbar } from "notistack";
import { useState } from "react";
import { CompletePost, CreatePost } from "../../../data/Forum/Post";
import { CompleteThread } from "../../../data/Forum/Thread";
import { BackendError } from "../../../data/General/BackendError";
import { PageDTO } from "../../../data/General/PageDTO";
import { snackbarError, snackbarInfo } from "../../../data/General/SnackBar";
import { ForumService } from "../../../Scripts/Services/ForumService";
import ButtonCollored from "../../Miscellaneous/ButtonCollored";
import PostForm from "./PostForm";

interface NewPostComponentProps {
    thread: CompleteThread;
    setNewPosts: (posts: PageDTO<CompletePost>) => void
}

export default function NewPostButton(props: NewPostComponentProps) {
    const [open, setOpen] = useState<boolean>(false);
    const { enqueueSnackbar } = useSnackbar();

    function createPost(post: CreatePost) {
        ForumService.createPostForThread(props.thread.threadId, post)
        .then((response: PageDTO<CompletePost>) => {
            enqueueSnackbar("Your new post was created!", snackbarInfo)
            props.setNewPosts(response)
        })
        .catch((error: BackendError) => enqueueSnackbar(error.message, snackbarError))
    }

    return (
        <div className="newPostButton">
            <ButtonCollored text="new Post" onClick={() => setOpen(true)} />
                
            <PostForm title="Create Post" open={open} close={() => setOpen(false)} onSubmit={createPost} />
        </div>
    )
}