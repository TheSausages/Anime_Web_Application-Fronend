import { Dialog, DialogTitle, DialogActions, DialogContent } from "@material-ui/core";
import { CreatePost, PutPost } from "../../../data/Forum/Post";
import * as yup from "yup"
import ButtonCollored from "../../Miscellaneous/ButtonCollored";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface NewPostFormProps {
    title: string,
    open: boolean;
    close: () => void;
    threadId: number;
    data?: PutPost;
    onSubmit: (post: PutPost) => void;
}

export default function PostForm(props: NewPostFormProps) {
    const { title, open, close, threadId, data } = props;

    const schema = yup.object().shape({
        title: yup.string().required("Post title cannot be empty"),
        postText: yup.string().required("Post text cannot be empty")
    })

    const { control, handleSubmit } = useForm<CreatePost>({
        resolver: yupResolver(schema),
        mode: 'all',
        defaultValues: {
            title: data?.title ?? '',
            postText: data?.postText ?? ''
        }
    })

    return (
        <Dialog open={open} fullWidth maxWidth="lg">
            <DialogTitle>
                {title}
            </DialogTitle>

            <DialogContent>

            </DialogContent>

            <DialogActions>
                <ButtonCollored onClick={close} text="Close" />
                <ButtonCollored type="submit" onClick={close} text="Submit" />
            </DialogActions>
        </Dialog>
    )
}