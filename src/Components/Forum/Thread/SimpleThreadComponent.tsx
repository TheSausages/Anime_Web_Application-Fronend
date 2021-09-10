import { useHistory } from "react-router";
import { SimpleThread } from "../../../data/Forum/Thread"
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import ForumIcon from '@material-ui/icons/Forum';
import Tags from "./Tags";
import ThreadStatusComponent from "./ThreadStatusComponent";

import "../css/SimpleThreadComponent.css"

interface ThreadsProps {
    thread: SimpleThread;
}

export default function Threads(props: ThreadsProps) {
    const history = useHistory();
    const { thread } = props;

    const primaryColor = thread.status === "Open" ? 'rgb(29, 133, 34)' : 'rgb(255 90 90)';

    return (
        <div style={{ borderColor: primaryColor }} key={thread.threadId} className="SimpleThread">
            <ThreadStatusComponent primaryColor={primaryColor} status={thread.status} id={`${thread.threadId}`} className="ThreadStatus" />

            <div onClick={_ => history.push(`/forum/thread/${thread.threadId}`)} className="ThreadTitle ThreadLink">{thread.title}</div>

            <div onClick={_ => history.push("#")} className="ThreadCreator ThreadLink">{thread.creator.username}</div>

            <div className="ThreadTimes">
                <div title="Creation Time"><AddIcon sx={{ fontSize: '0.7rem', verticalAlign: 'text-top', color: primaryColor }} />{new Date(thread.creation).toLocaleString()}</div>
                <div title="Last time Modificated"><EditIcon sx={{ fontSize: '0.7rem', verticalAlign: 'text-top', color: primaryColor }} />{new Date(thread.modification).toLocaleString()}</div>
            </div>

            <div className="ThreadCategory"><i title="Category">{thread.category.categoryName}</i></div>

            <div  className="ThreadPosts" title="Number of Posts"><ForumIcon sx={{ verticalAlign: 'bottom', color: primaryColor, paddingInline: '5px' }} />{thread.nrOfPosts}</div>

            <Tags tags={thread.tags} className="ThreadTags" />
        </div>
    )
}