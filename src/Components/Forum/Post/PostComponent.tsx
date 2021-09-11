import { CompletePost } from "../../../data/Forum/Post";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from "react-router";
import PostReactionForm from "./PostReactionForm";
import { getRandomColor } from "../../../Scripts/Utilities";

import "../css/PostComponent.css"

interface PostProps {
    post: CompletePost;
    key: number;
}

export default function PostComponent(props: PostProps) {
    const { post } = props;
    const color = getRandomColor(true);
    const history = useHistory();

    return (
        <div className="Post" style={{borderColor: color}}>
            <div onClick={_ => history.push("#")} className="PostCreator PostLink">{post.user.username}</div>
            <div className="PostTimes">
                <div><AddIcon sx={{ fontSize: '0.8rem', verticalAlign: 'text-top', color: color }} />Created: {new Date(post.creation).toLocaleString()}</div>
                <div><EditIcon sx={{ fontSize: '0.8rem', verticalAlign: 'text-top', color: color }} />Last Modified: {new Date(post.modification).toLocaleString()}</div>
            </div>
            <div className="PostTitle">{post.title}</div>
            <div className="PostText">{post.postText}</div>
            <div className="PostInput"><PostReactionForm nrOfPlus={post.nrOfPlus} nrOfMinus={post.nrOfMinus} postUserStatus={post.postUserStatus} color={color} /></div>
        </div>
    )
}