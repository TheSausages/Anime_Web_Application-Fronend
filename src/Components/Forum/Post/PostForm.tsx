import { Dialog, DialogTitle, DialogActions, DialogContent } from "@material-ui/core";
import { CreatePost, UpdatePost } from "../../../data/Forum/Post";
import * as yup from "yup"
import ButtonCollored from "../../Miscellaneous/ButtonCollored";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextFieldColored from "../../Miscellaneous/TextFieldColored";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();
    const { title, open, close, data, onSubmit } = props;

    const schema = yup.object().shape({
        title: yup.string().required(t("fieldErrors.fieldCannotBeEmpty", { field: t("forum.post.titleField") })),
        text: yup.string().required(t("fieldErrors.fieldCannotBeEmpty", { field: t("forum.post.textField") }))
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
                        label={t("forum.post.generalPostForm.titleLabel")}
                        formControlName="title"
                        control={control}
                    />

                    <TextFieldColored errors={errors.text}
                        label={t("forum.post.generalPostForm.textLabel")}
                        multiline={true}
                        rows={8}
                        formControlName="text"
                        control={control}
                    />
                </DialogContent>

                <DialogActions>
                    <ButtonCollored onClick={close} text={t("input.close")} />
                    <ButtonCollored type="submit" disabled={!isValid} onClick={close} text={t("input.submit")} />
                </DialogActions>
            </form>
        </Dialog>
    )
}