import { Dialog, DialogTitle, DialogActions, DialogContent, FormControl, InputLabel, MenuItem } from "@material-ui/core";
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
import { Controller, useForm } from "react-hook-form";
import TextFieldColored from "../../Miscellaneous/TextFieldColored";
import SelectCollored from "../../Miscellaneous/SelectCollored";
import { checkIfObjectIsEmpty } from "../../../Scripts/Utilities";

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
            rowGap: 15,
            alignItems: 'center',
        },
    },
    paddingTop: {
        paddingTop: 12,
    },
    label: {
        color: '#101010',
        fontSize: '0.9rem'
    },
    select: {
        width: '18vw',
        position: 'absolute',
        bottom: 6,
        '@media (max-width: 960px)': {
            width: '40vw',
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderTop: 'none',
            borderRight: 'none',
            borderLeft: 'none',
            borderBottom: '2px solid rgb(36, 185, 44)',
            borderRadius: 0,
        },
    },
}));

const setValueOptions = { shouldDirty: true, shouldTouch: true, shouldValidate: true }

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
        category: yup.object().shape({
            categoryId: yup.number(),
            categoryName: yup.string(),
            categoryDescription: yup.string()
        }).required("Thread must have a category!"),
        tags: yup.array().of(yup.mixed<Tag>()).required("Thread must have at least 1 tag!"),
        status: yup.mixed<ThreadStatus>().required("Thread must have a valid status!")
    })

    const { control, handleSubmit, setValue, getValues, formState: { errors, isValid } } = useForm<UpdateThread>({
        resolver: yupResolver(schema),
        mode: 'all',
        defaultValues: {
            title: data?.title ?? "",
            text: data?.text ?? "",
            category: data?.category as ForumCategory ?? "",
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

                <DialogContent className={classes.dialogContent} >
                    <div className={`${classes.firstLine} ${classes.paddingTop}`} >
                        <Controller render={({field}) => (
                                <TextFieldColored 
                                    field={field}
                                    errors={errors.title}
                                    label="Thread Title"
                                />
                            )}
                            name="title"
                            control={control}
                        />

                        <FormControl className={classes.select}>
                            <InputLabel id="CategoryLabel" className={classes.label}>
                                Category
                            </InputLabel>
                            <Controller render={({field}) => (
                                <SelectCollored 
                                    field={field}
                                    labelId="CategoryLabel"
                                    onChange={category => setValue('category', category.target.value as ForumCategory, setValueOptions)}
                                    errors={errors.category?.categoryDescription || errors.category?.categoryName || errors.category?.categoryId}
                                    options={
                                        props.categories.map((category: ForumCategory) => (
                                            <MenuItem key={category.categoryId} value={`{categoryId: ${category.categoryId}, categoryName: ${category.categoryName}, categoryDescription: ${category.categoryDescription}}`} >
                                                {category.categoryName}
                                            </MenuItem>
                                        ))
                                    }
                                />
                            )}
                                name="category"
                                control={control}
                            />
                        </FormControl>

                        <FormControl className={classes.select} disabled={!(data && !checkIfObjectIsEmpty(data))} >
                            <InputLabel id="StatusLabel" className={classes.label}>
                                Status
                            </InputLabel>
                            <Controller render={({field}) => (
                                <SelectCollored 
                                    field={field}
                                    labelId="StatusLabel"
                                    onChange={category => setValue('status', category.target.value as ThreadStatus, setValueOptions)}
                                    errors={errors.category?.categoryDescription || errors.category?.categoryName || errors.category?.categoryId}
                                    options={
                                        ThreadStatusArray.map((status: ThreadStatus) => (
                                            <MenuItem key={status} value={status} >
                                                {status}
                                            </MenuItem>
                                        ))
                                    }
                                />
                            )}
                                name="status"
                                control={control}
                            />
                        </FormControl>
                    </div>

                    <Controller render={({field}) => (
                        <TextFieldColored 
                            field={field}
                            errors={errors.text}
                            label="Thread Text"
                            multiline={true}
                            rows={8}
                        />
                    )}
                        name="text"
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