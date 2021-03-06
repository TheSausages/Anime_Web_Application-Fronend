import { useHistory } from "react-router";
import { SimpleThreadWithUserStatus } from "../../../data/Forum/Thread"
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import ForumIcon from '@material-ui/icons/Forum';
import Tags from "./Tags";
import ThreadStatusComponent from "./ThreadStatusComponent";
import { useTranslation } from "react-i18next";
import ThreadReactionForm from "./ThreadReactionForm";
import { checkIfGivenUserLoggedIn } from "../../../Scripts/Utilities";

import "../css/SimpleThreadComponent.css"

/**
 * The props for the {@link SimpleThreadComponent} component.
 */
export interface ThreadsProps {
    /** Thread to be shown. */
    thread: SimpleThreadWithUserStatus;
}

/**
 * Component for showing simple information on a thread.
 * It enables to react to a thread using {@link ThreadReactionForm}.
 * @param props {@link SimpleThreadComponent}
 */
export default function SimpleThreadComponent(props: ThreadsProps) {
    const history = useHistory();
    const { thread } = props;
    const { t } = useTranslation();

    const primaryColor = thread.status === "Open" ? 'rgb(29, 133, 34)' : 'rgb(255 90 90)';

    return (
        <div style={{ borderColor: primaryColor }} key={thread.threadId} className="SimpleThread">
            <ThreadStatusComponent primaryColor={primaryColor} status={thread.status} id={`${thread.threadId}`} className="ThreadStatus" />

            <div style={{color: primaryColor}} onClick={_ => history.push(`/forum/thread/${thread.threadId}`)} className="ThreadTitle ThreadLink">{thread.title}</div>

            <div style={{color: primaryColor}} onClick={_ => history.push(`/user/${thread.creator.userId}`)} className="ThreadCreator ThreadLink">{thread.creator.username}</div>

            <div className="ThreadTimes">
                <div title={t("forum.thread.generalThread.creationTimeTitle")}><AddIcon sx={{ fontSize: '0.7rem', verticalAlign: 'text-top', color: primaryColor }} />{new Date(thread.creation).toLocaleString()}</div>
                <div title={t("forum.thread.generalThread.modifyTimeTitle")}><EditIcon sx={{ fontSize: '0.7rem', verticalAlign: 'text-top', color: primaryColor }} />{new Date(thread.modification).toLocaleString()}</div>
            </div>

            <div className="ThreadCategory"><i title={t("forum.thread.generalThread.categoryTitle")}>{thread.category.categoryName}</i></div>

            <div className="ThreadReactForm">
                    <ThreadReactionForm threadUserStatus={thread.threadUserStatus}
                        isLoggedUser={checkIfGivenUserLoggedIn(thread.creator.username)}
                        color={primaryColor}
                    />
                </div>

            <div className="ThreadPosts" title={t("forum.thread.generalThread.nrOfPostsTitle")}><ForumIcon sx={{ verticalAlign: 'bottom', color: primaryColor, paddingInline: '5px' }} />{thread.nrOfPosts}</div>

            <Tags tags={thread.tags} className="ThreadTags" />
        </div>
    )
}