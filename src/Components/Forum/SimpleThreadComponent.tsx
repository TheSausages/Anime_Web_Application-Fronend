import { useHistory } from "react-router";
import { Tag } from "../../data/Forum/Tag";
import { SimpleThread } from "../../data/Forum/Thread"
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import ForumIcon from '@material-ui/icons/Forum';

import "./css/SimpleThreadComponent.css"

interface ThreadsProps {
    thread: SimpleThread;
}

export default function Threads(props: ThreadsProps) {
    const history = useHistory();
    const { thread } = props;

    return (
        <div key={thread.threadId} className="SimpleThread">
            <div className="LinkAndCreator">
                <span onClick={_ => history.push("#")} >{thread.title}</span>

                <span onClick={_ => history.push("#")} >{thread.creator.username}</span>
            </div>

            <div className="DatesAndCategory">
                <span>
                    <div title="Creation Time"><AddIcon sx={{ fontSize: '0.7rem', verticalAlign: 'text-top', color: 'rgb(34, 206, 43)' }} />{new Date(thread.creation).toLocaleString()}</div>
                    <div title="Last time Modificated"><EditIcon sx={{ fontSize: '0.7rem', verticalAlign: 'text-top', color: 'rgb(34, 206, 43)' }} />{new Date(thread.modification).toLocaleString()}</div>
                </span>

                <i title="Category">{thread.category.categoryName}</i>
            </div>

            <div className="PostsAndTags">
                <span title="Number of Posts"><ForumIcon sx={{ verticalAlign: 'bottom', color: 'rgb(34, 206, 43)', paddingInline: '5px' }} />{thread.nrOfPosts}</span>

                <span>
                    {thread.tags.map((tag: Tag) => (
                        <span style={{ backgroundColor: tag.tagColor }} title={`Importance: ${tag.tagImportance}`} key={tag.tagId} >{tag.tagName}</span>
                    ))}
                </span>
            </div>
        </div>
    )
}