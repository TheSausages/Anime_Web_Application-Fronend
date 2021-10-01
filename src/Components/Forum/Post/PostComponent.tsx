import { CompletePost, CreatePost, UpdatePost } from "../../../data/Forum/Post";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from "react-router";
import PostReactionForm from "./PostReactionForm";
import { checkIfGivenUserLoggedIn, getRandomColor } from "../../../Scripts/Utilities";
import { useState } from "react";
import PostForm from "./PostForm";
import { ForumService } from "../../../Scripts/Services/ForumService";
import { useSnackbar } from "notistack";

import "../css/PostComponent.css"
import { snackbarError, snackbarInfo } from "../../../data/General/SnackBar";
import { BackendError } from "../../../data/General/BackendError";
import { useAuth } from "../../AuthenticationAndLogin/Auth";

interface PostProps {
    post: CompletePost;
    key: number;
    threadId: number;
}

export default function PostComponent(props: PostProps) {
    const [post, setPost] = useState<CompletePost>(props.post)
    const { threadId } = props;
    const color = getRandomColor(true);
    const [open, setOpen] = useState<boolean>(false);
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    function editPost(editPost: CreatePost) {
        ForumService.updatePostForThread(threadId, {...editPost, postId: post.postId})
        .then((response: CompletePost) => {
            enqueueSnackbar("Post updated successfully!", snackbarInfo);
            setPost(response);
        })
        .catch((error: BackendError) => enqueueSnackbar(error.message, snackbarError))
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
                    <i onClick={() => setOpen(true)} style={{color: color}}>edit post</i>

                    <PostForm title="Edit Post" open={open} close={() => setOpen(false)} data={post} onSubmit={editPost} />
                </div>
            }

            <div className="PostInput"><PostReactionForm nrOfPlus={post.nrOfPlus} nrOfMinus={post.nrOfMinus} postUserStatus={post.postUserStatus} color={color} isLoggedUser={isLoggedUser} /></div>
        </div>
    )
}