import { useHistory } from "react-router";
import { Tag } from "../../../data/Forum/Tag";
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
            <ThreadStatusComponent primaryColor={primaryColor} status={thread.status} id={`${thread.threadId}`} />

            <div className="LinkAndCreator">
                <span onClick={_ => history.push(`/forum/thread/${thread.threadId}`)}>{thread.title}</span>

                <span onClick={_ => history.push("#")}>{thread.creator.username}</span>
            </div>

            <div className="DatesAndCategory">
                <span>
                    <div title="Creation Time"><AddIcon sx={{ fontSize: '0.7rem', verticalAlign: 'text-top', color: primaryColor }} />{new Date(thread.creation).toLocaleString()}</div>
                    <div title="Last time Modificated"><EditIcon sx={{ fontSize: '0.7rem', verticalAlign: 'text-top', color: primaryColor }} />{new Date(thread.modification).toLocaleString()}</div>
                </span>

                <i title="Category">{thread.category.categoryName}</i>
            </div>

            <div className="PostsAndTags">
                <span title="Number of Posts"><ForumIcon sx={{ verticalAlign: 'bottom', color: primaryColor, paddingInline: '5px' }} />{thread.nrOfPosts}</span>

                <Tags tags={thread.tags} />
            </div>
        </div>
    )
}