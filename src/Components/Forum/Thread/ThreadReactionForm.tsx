import useBasicState from "../../../data/General/BasicState";
import { MiscellaneousProperties } from "../../../Properties/MiscellaneousProperties";
import * as yup from "yup"
import IconButton from '@mui/material/IconButton';
import { useForm } from "react-hook-form";
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import { ThreadUserStatus } from "../../../data/Forum/Thread";
import { yupResolver } from "@hookform/resolvers/yup";
import { ForumService } from "../../../Scripts/Services/ForumService";
import { BackendError } from "../../../data/General/BackendError";
import { snackBarSuccess, snackbarError } from "../../../data/General/SnackBar";
import { VisibilityOutlined } from "@material-ui/icons";
import { useState } from "react";

interface ThreadReactionFormProps {
    threadUserStatus?: ThreadUserStatus;
    isLoggedUser: boolean;
    color: string;
}

export default function ThreadReactionForm(props: ThreadReactionFormProps) {
    const { isLoggedUser, color } = props;
    const [threadUserStatus, setThreadUserStatus] = useState(props.threadUserStatus)
    const setValueOptions = MiscellaneousProperties.reactHookFormSetValueOption;
    const { snackbar, t, i18n } = useBasicState()

    const schema = yup.object().shape({
        isWatching: yup.boolean().notRequired(),
        isBlocking: yup.boolean().notRequired()
    })

    const { handleSubmit, setValue, getValues } = useForm<ThreadUserStatus>({
        resolver: yupResolver(schema),
        mode: 'all',
        defaultValues: {
            isWatching: threadUserStatus?.isWatching ?? false,
            isBlocked: threadUserStatus?.isBlocked ?? false
        }
    })

    async function updateStatus(status: ThreadUserStatus) {
        if (threadUserStatus !== undefined) {
            await ForumService.updateThreadUserStatus(threadUserStatus.ids.thread.threadId, { ...threadUserStatus, ...status }, t, i18n)
            .then(response => {
                setThreadUserStatus(response)
                snackbar(t("forum.post.generalPostForm.opinionSubmitted"), snackBarSuccess)
            })
            .catch((error: BackendError) => snackbar(error.message, snackbarError))
        }
    }

    return (
        <form onSubmit={handleSubmit(updateStatus)}>
            <IconButton onClick={() => {
                setValue('isWatching', !getValues().isWatching, setValueOptions);
                setValue('isBlocked', false, setValueOptions);
                handleSubmit(updateStatus)();
            }} disabled={isLoggedUser}>
                {getValues().isWatching ? <VisibilityOffIcon htmlColor={color} /> : <VisibilityOutlined htmlColor={color} />}
            </IconButton>

            <IconButton onClick={() => {
                setValue('isBlocked', !getValues().isBlocked, setValueOptions);
                setValue('isWatching', false, setValueOptions);
                handleSubmit(updateStatus)();
            }} disabled={isLoggedUser}>
                {getValues().isBlocked ? <RemoveCircle htmlColor={color} /> : <RemoveCircleOutlineIcon htmlColor={color} />}
            </IconButton>

        </form>
    )
}