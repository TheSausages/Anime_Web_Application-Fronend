import { CompletePost } from "../../../data/Forum/Post";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from "react-router";
import PostReactionForm from "./PostReactionForm";

import "../css/PostComponent.css"

interface PostProps {
    post: CompletePost;
    key: number;
}

export default function PostComponent(props: PostProps) {
    const { post } = props;
    const history = useHistory();

    return (
        <div className="Post">
            <div onClick={_ => history.push("#")} className="PostCreator PostLink">{post.user.username}</div>
            <div className="PostTimes">
                <div><AddIcon sx={{ fontSize: '0.8rem', verticalAlign: 'text-top', color: 'rgb(54 192 61)' }} />Created: {new Date(post.creation).toLocaleString()}</div>
                <div><EditIcon sx={{ fontSize: '0.8rem', verticalAlign: 'text-top', color: 'rgb(54 192 61)' }} />Last Modified: {new Date(post.modification).toLocaleString()}</div>
            </div>
            <div className="PostTitle">{post.title}</div>
            <div className="PostText">{post.postText}</div>
            <div className="PostInput"><PostReactionForm nrOfPlus={post.nrOfPlus} nrOfMinus={post.nrOfMinus} postUserStatus={post.postUserStatus} /></div>
        </div>
    )
}