import { useSnackbar } from "notistack";
import { useState } from "react";
import { CreateThread, SimpleThread, UpdateThread } from "../../../data/Forum/Thread";
import { snackbarError, snackBarSuccess } from "../../../data/General/SnackBar";
import { ForumService } from "../../../Scripts/Services/ForumService";
import ButtonCollored from "../../Miscellaneous/ButtonCollored";
import ThreadForm from "./ThreadForm";
import { useHistory } from "react-router";
import { BackendError } from "../../../data/General/BackendError";
import { ForumCategory } from "../../../data/Forum/ForumCategory";

import "../css/NewThreadComponent.css"

interface NewThreadComponentProps {
    categories: ForumCategory[]
}

export default function NewThreadComponent(props: NewThreadComponentProps) {
    const [open, setOpen] = useState<boolean>(false);
    const history = useHistory()
    const { enqueueSnackbar } = useSnackbar();

    function createThread(thread: UpdateThread) {
        return ForumService.createThread({
            title: thread.title,
            text: thread.text,
            category: thread.category,
            tags: thread.tags
        } as CreateThread)
        .then((response: SimpleThread) => {
            enqueueSnackbar("Your thread was created!", snackBarSuccess)
            history.push(`/forum/thread/${response.threadId}`);
        })
        .catch((error: BackendError) => enqueueSnackbar(error.message, snackbarError))
    }

    return (
        <div className="newThreadButton">
            <ButtonCollored text="new Thread" onClick={() => setOpen(true)} />
                
            <ThreadForm title="Create Thread" open={open} close={() => setOpen(false)} onSubmit={createThread} categories={props.categories} />
        </div>
    )
}