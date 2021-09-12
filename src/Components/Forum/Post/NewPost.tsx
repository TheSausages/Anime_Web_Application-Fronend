import { useState } from "react";
import { CreatePost } from "../../../data/Forum/Post";
import ButtonCollored from "../../Miscellaneous/ButtonCollored";
import PostForm from "./PostForm";

interface NewPostComponentProps {
    threadId: number;
}

export default function NewPostButton(props: NewPostComponentProps) {
    const [open, setOpen] = useState<boolean>(false);

    function createPost(post: CreatePost) {

    }

    return (
        <div className="newPostButton">
            <ButtonCollored text="new Post" onClick={() => setOpen(true)} />
                
            <PostForm title="Create Post" open={open} close={() => setOpen(false)} threadId={props.threadId} onSubmit={createPost} />
        </div>
    )
}