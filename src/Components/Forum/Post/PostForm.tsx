import { Dialog, DialogTitle, DialogActions, DialogContent } from "@material-ui/core";
import { CreatePost, UpdatePost } from "../../../data/Forum/Post";
import * as yup from "yup"
import ButtonCollored from "../../Miscellaneous/ButtonCollored";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextFieldColored from "../../Miscellaneous/TextFieldColored";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    dialogContent: {
        display: "flex",
        flexDirection: "column",
        rowGap: 15,
        width: '95%',
        paddingBottom: 20,
        '@media (max-width: 960px)': {
            width: '85%',
        },
    },
    paddingTop: {
        paddingTop: 1,
    },
    
}));

interface NewPostFormProps {
    title: string;
    open: boolean;
    close: () => void;
    data?: UpdatePost;
    onSubmit: (post: UpdatePost) => void;
}

export default function PostForm(props: NewPostFormProps) {
    const classes = useStyles();
    const { title, open, close, data, onSubmit } = props;

    const schema = yup.object().shape({
        title: yup.string().required("Post title cannot be empty"),
        text: yup.string().required("Post text cannot be empty")
    })

    const { control, handleSubmit, formState: { errors, isValid } } = useForm<CreatePost>({
        resolver: yupResolver(schema),
        mode: 'all',
        defaultValues: {
            title: data?.title ?? '',
            text: data?.text ?? ''
        }
    })

    return (
        <Dialog open={open} fullWidth maxWidth="lg">
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>
                    {title}
                </DialogTitle>

                <DialogContent className={classes.dialogContent}>
                    <TextFieldColored errors={errors.title}
                        label="Post Title"
                        formControlName="title"
                        control={control}
                    />

                    <TextFieldColored errors={errors.text}
                        label="Post Text"
                        multiline={true}
                        rows={8}
                        formControlName="text"
                        control={control}
                    />
                </DialogContent>

                <DialogActions>
                    <ButtonCollored onClick={close} text="Close" />
                    <ButtonCollored type="submit" disabled={!isValid} onClick={close} text="Submit" />
                </DialogActions>
            </form>
        </Dialog>
    )
}