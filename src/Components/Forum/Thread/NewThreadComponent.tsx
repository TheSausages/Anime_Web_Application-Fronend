import { CreateThread, SimpleThread, UpdateThread } from "../../../data/Forum/Thread";
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
    const { snackbar, open, openElement, closeElement } = useBasicState()
    const history = useHistory()

    async function createThread(thread: UpdateThread) {
        return await ForumService.createThread({
            title: thread.title,
            text: thread.text,
            category: thread.category,
            tags: thread.tags
        } as CreateThread)
        .then((response: SimpleThread) => {
            snackbar("Your thread was created!", snackBarSuccess)
            history.push(`/forum/thread/${response.threadId}`);
        })
        .catch((error: BackendError) => snackbar(error.message, snackbarError))
    }

    return (
        <div className="newThreadButton">
            <ButtonCollored text="new Thread" onClick={() => openElement()} />
                
            <ThreadForm title="Create Thread" open={open} close={() => closeElement()} onSubmit={createThread} categories={props.categories} />
        </div>
    )
}