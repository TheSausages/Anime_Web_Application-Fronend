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

interface PostProps {
    post: CompletePost;
    key: number;
    threadId: number;
}

const color = getRandomColor(true);

export default function PostComponent(props: PostProps) {
    const { threadId } = props;
    const [post, setPost] = useState<CompletePost>(props.post)
    const history = useHistory();

    const { snackbar, open, openElement, closeElement } = useBasicState();

    async function editPost(editPost: CreatePost) {
        await ForumService.updatePostForThread(threadId, {...editPost, postId: post.postId} as UpdatePost)
        .then((response: CompletePost) => {
            snackbar("Post updated successfully!", snackBarSuccess);
            setPost(response);
        })
        .catch((error: BackendError) => snackbar(error.message, snackbarError))
    }

    const isLoggedUser = checkIfGivenUserLoggedIn(post.user.username);

    return (
        <div className="Post" style={{borderColor: color}}>
            <div onClick={_ => history.push("#")} className="PostCreator PostLink">{post.user.username}</div>
            <div className="PostTimes">
                <div><AddIcon sx={{ fontSize: '0.8rem', verticalAlign: 'text-top', color: color }} />Created: {new Date(post.creation).toLocaleString()}</div>
                <div><EditIcon sx={{ fontSize: '0.8rem', verticalAlign: 'text-top', color: color }} />Last Modified: {new Date(post.modification).toLocaleString()}</div>
            </div>
            <div className="PostTitle">{post.title}</div>
            <div className="PostText">{post.text}</div>

            {isLoggedUser &&
                <div className="PostEditText">
                    <i onClick={() => openElement()} style={{color: color}}>edit post</i>

                    <PostForm title="Edit Post" open={open} close={() => closeElement()} data={post} onSubmit={editPost} />
                </div>
            }

            <div className="PostInput"><PostReactionForm nrOfPlus={post.nrOfPlus} nrOfMinus={post.nrOfMinus} postUserStatus={post.postUserStatus} color={color} isLoggedUser={isLoggedUser} /></div>
        </div>
    )
}