import { CreateThread, SimpleThreadWithUserStatus, UpdateThread } from "../../../data/Forum/Thread";
import { snackbarError, snackBarSuccess } from "../../../data/General/SnackBar";
import { ForumService } from "../../../Scripts/Services/ForumService";
import ButtonCollored from "../../Miscellaneous/ButtonCollored";
import ThreadForm from "./ThreadForm";
import { useHistory } from "react-router";
import { BackendError } from "../../../data/General/BackendError";
import { ForumCategory } from "../../../data/Forum/ForumCategory";
import useBasicState from "../../../data/General/BasicState";

import "../css/NewThreadComponent.css"

interface NewThreadComponentProps {
    categories: ForumCategory[]
}

export default function NewThreadComponent(props: NewThreadComponentProps) {
    const { snackbar, open, openElement, closeElement, t, i18n } = useBasicState()
    const history = useHistory()

    async function createThread(thread: UpdateThread) {
        return await ForumService.createThread({
            title: thread.title,
            text: thread.text,
            category: thread.category,
            tags: thread.tags
        } as CreateThread, t, i18n)
        .then((response: SimpleThreadWithUserStatus) => {
            snackbar(t("forum.thread.threadCreatedSuccessfully"), snackBarSuccess)
            history.push(`/forum/thread/${response.threadId}`);
        })
        .catch((error: BackendError) => snackbar(error.message, snackbarError))
    }

    return (
        <div className="newThreadButton">
            <ButtonCollored text={t("forum.thread.newThreadForm.newThreadButton")} onClick={() => openElement()} />
                
            <ThreadForm title={t("forum.thread.newThreadForm.title")} open={open} close={() => closeElement()} onSubmit={createThread} categories={props.categories} />
        </div>
    )
}