import { Dialog, DialogTitle, DialogActions } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { UpdateThread } from "../../../data/Forum/Thread";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonCollored from "../../Miscellaneous/ButtonCollored";
import { ForumCategory } from "../../../data/Forum/ForumCategory";
import { Tag } from "../../../data/Forum/Tag";
import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { ForumService } from "../../../Scripts/Services/ForumService";
import { BackendError } from "../../../data/General/BackendError";
import { snackbarError } from "../../../data/General/SnackBar";
import { ThreadStatus, ThreadStatusArray } from "../../../data/Forum/Types";
import Loading from "../../Loading/Loading";
import { useForm } from "react-hook-form";

interface NewThreadFormProps {
    title: string;
    open: boolean;
    close: () => void;
    categories: ForumCategory[];
    data?: UpdateThread;
    onSubmit?: (thread: UpdateThread) => void;
}

const useStyles = makeStyles((theme) => ({
    dialogContent: {
        display: "flex",
        flexDirection: "column",
        rowGap: 15,
        width: '95%',
        paddingBottom: 20,
    },
    paddingTop: {
        paddingTop: 1,
    },
}));

export default function ThreadForm(props: NewThreadFormProps) {
    const classes = useStyles();
    const { title, open, close, categories, data, onSubmit } = props;
    const [tags, setTags] = useState<Tag[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const { enqueueSnackbar } = useSnackbar();
    const [error, setError] = useState<string>();

    const getTags = useCallback(async () => {
        await ForumService.getTags()
        .then((response: Tag[]) => setTags({...response}))
        .catch((error: BackendError) => {
            enqueueSnackbar(error.message, snackbarError)
            close();
        })
    }, [enqueueSnackbar])

    useEffect(() => {
        setLoading(true);

        open && getTags()
        
        setLoading(false)
    }, [getTags, open])

    const schema = yup.object().shape({
        title: yup.string().required("Thread title cannot be empty"),
        text: yup.string().required("Thread text cannot be empty"),
        category: yup.mixed<ForumCategory>().required("Thread must have a category!"),
        tags: yup.array().of(yup.mixed<Tag>()).required("Thread must have at least 1 tag!"),
        status: yup.mixed<ThreadStatus>().required("Thread must have a valid status!")
    })

    const { control, handleSubmit, formState: { errors, isValid } } = useForm<UpdateThread>({
        resolver: yupResolver(schema),
        mode: 'all',
        defaultValues: {
            title: data?.title ?? "",
            text: data?.text ?? "",
            category: data?.category ?? categories[0] ?? {
                                            categoryId: 1, 
                                            categoryName: 'Suggestions', 
                                            categoryDescription: 'Suggestions for enhancing the site and service'
                                        },
            tags: data?.tags ?? [],
            status: data?.status ?? "Open"
        }
    })

    if (loading) {
        return <Loading error={error}/>
    }

    return (
        <Dialog open={open} fullWidth maxWidth="lg">
            <form>
                <DialogTitle>
                    {title}
                </DialogTitle>

                <DialogActions>
                    <ButtonCollored onClick={close} text="Close" />
                </DialogActions>
            </form>
        </Dialog>
    )
}