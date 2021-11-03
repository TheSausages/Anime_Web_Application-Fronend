import { Dialog, DialogTitle, DialogActions, DialogContent, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { CompleteThread, UpdateThread } from "../../../data/Forum/Thread";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonCollored from "../../Miscellaneous/ButtonCollored";
import { ForumCategory } from "../../../data/Forum/ForumCategory";
import { Tag } from "../../../data/Forum/Tag";
import { useCallback, useEffect, useState } from "react";
import { ForumService } from "../../../Scripts/Services/ForumService";
import { BackendError } from "../../../data/General/BackendError";
import { snackbarError } from "../../../data/General/SnackBar";
import { ThreadStatus, ThreadStatusArray, TagImportance } from "../../../data/Forum/Types";
import Loading from "../../Loading/Loading";
import { Controller, useForm } from "react-hook-form";
import TextFieldColored from "../../Miscellaneous/TextFieldColored";
import SelectCollored from "../../Miscellaneous/SelectCollored";
import { checkIfObjectIsEmpty } from "../../../Scripts/Utilities";
import TagInput from "../TagInput";
import useBasicState from "../../../data/General/BasicState";
import { MiscellaneousProperties } from "../../../Properties/MiscellaneousProperties";

interface NewThreadFormProps {
    title: string;
    open: boolean;
    close: () => void;
    categories: ForumCategory[];
    data?: CompleteThread;
    onSubmit: (thread: UpdateThread) => void;
}

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
    firstLine: {
        display: "flex",
        width: '100%',
        gap: 15,
        '& :first-child': {
            width: '100%',
            '@media (max-width: 960px)': {
                paddingBottom: 10,
            }
        },
        '@media (max-width: 960px)': {
            display: "flex",
            flexDirection: "column",
            alignItems: 'center',
        },
    },
    selectWidth: {
        width: '18vw',
        justifyContent: 'flex-end',
        '@media (max-width: 960px)': {
            width: '40vw',
        },
    },
    paddingTop: {
        paddingTop: 12,
    },
}));

export default function ThreadForm(props: NewThreadFormProps) {
    const classes = useStyles();
    const setValueOptions = MiscellaneousProperties.reactHookFormSetValueOption;
    const { title, open, close, categories, data, onSubmit } = props;
    const [tags, setTags] = useState<Tag[]>([])
    const { loading, error, startLoading, stopLoading, snackbar, setErrorMessage, t, i18n } = useBasicState()

    const getTags = useCallback(async () => {
        await ForumService.getTags(t, i18n)
        .then((response: Tag[]) => setTags([...response]))
        .catch((error: BackendError) => {
            snackbar(error.message, snackbarError)
            setErrorMessage(error.message)
            close();
        })
    }, [snackbar, setErrorMessage, close, t, i18n])

    useEffect(() => {
        startLoading()

        open && getTags()
        
        stopLoading()
    }, [getTags, open, startLoading, stopLoading])

    const schema = yup.object().shape({
        title: yup.string().required(t("fieldErrors.fieldCannotBeEmpty", { field: "forum.thread.titleField" })),
        text: yup.string().required(t("fieldErrors.fieldCannotBeEmpty", { field: "forum.thread.textField" })),
        category: yup.object().shape({
            categoryId: yup.number(),
            categoryName: yup.string(),
            categoryDescription: yup.string()
        }).required(t("forum.thread.generalThread.threadMustHaveCategoryError")),
        tags: yup.array().of(yup.object().shape({
            tagId: yup.number(),
            tagName: yup.string(),
            tagImportance: yup.mixed<TagImportance>(),
            tagColor: yup.string()
        })).min(1, t("forum.thread.generalThread.threadMustHaveAtLeast1Tag")),
        status: yup.mixed<ThreadStatus>().required(t("forum.thread.generalThread.threadMustHaveValidStatus")).transform((curr, orig) => orig === "" ? undefined : curr)
    })

    let cat1 = JSON.stringify(data?.category) ?? ""
    const { control, handleSubmit, setValue, formState: { errors, isValid } } = useForm<UpdateThread>({
        resolver: yupResolver(schema),
        mode: 'all',
        defaultValues: {
            title: data?.title ?? "",
            text: data?.text ?? "",
            category: cat1 as any as ForumCategory,
            tags: data?.tags ?? [],
            status: data?.status ?? "Open"
        }
    })

    if (loading) {
        return <Loading error={error}/>
    }
    
    return (
        <Dialog open={open} fullWidth maxWidth="lg">
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>
                    {title}
                </DialogTitle>

                <DialogContent className={classes.dialogContent} >
                    <div className={`${classes.firstLine} ${classes.paddingTop}`} >
                        <TextFieldColored errors={errors.title}
                            label={t("forum.thread.generalThread.titleLabel")}
                            formControlName="title"
                            control={control}
                        />

                        <SelectCollored labelId="CategoryLabel"
                            formControlClassName={classes.selectWidth}
                            title={t("forum.thread.generalThread.categoryTitle")}
                            onChange={category => setValue('category', category.target.value as ForumCategory, setValueOptions)}
                            errors={errors.category?.categoryDescription || errors.category?.categoryName || errors.category?.categoryId}
                            options={
                                categories.map((category: ForumCategory) => (
                                    <MenuItem key={category.categoryId} value={JSON.stringify(category)} >
                                        {category.categoryName}
                                    </MenuItem>
                                ))
                            }
                            formControlName="category"
                            control={control}
                        />

                        <SelectCollored  labelId="StatusLabel"
                            formControlClassName={classes.selectWidth}
                            title={t("forum.thread.generalThread.statusTitle")}
                            onChange={category => setValue('status', category.target.value as ThreadStatus, setValueOptions)}
                            errors={errors.status}
                            disabled={!(data && !checkIfObjectIsEmpty(data))}
                            options={
                                ThreadStatusArray.map((status: ThreadStatus) => (
                                    <MenuItem key={status} value={status} >
                                        {status}
                                    </MenuItem>
                                ))
                            }
                            formControlName="status"
                            control={control}
                        />
                    </div>

                    <TextFieldColored errors={errors.text}
                        label={t("forum.thread.generalThread.textLabel")}
                        multiline={true}
                        rows={8}
                        formControlName="text"
                        control={control}
                    />

                    <Controller render={({field}) => (
                        tags && <TagInput
                            availableTags={tags}
                            field={field}
                            errors={errors.tags}
                            onChange={(event, tags: Tag[]) => setValue('tags', tags, setValueOptions)}
                        />
                    )}
                        name="tags"
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