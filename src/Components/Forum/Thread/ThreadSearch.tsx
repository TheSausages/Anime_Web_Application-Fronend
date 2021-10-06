import { useSnackbar } from "notistack"
import { useState, useCallback, useEffect } from "react"
import { ForumCategory } from "../../../data/Forum/ForumCategory"
import { Tag } from "../../../data/Forum/Tag"
import { BackendError } from "../../../data/General/BackendError"
import { snackbarError } from "../../../data/General/SnackBar"
import { ForumService } from "../../../Scripts/Services/ForumService"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { TagImportance, ThreadStatus, ThreadStatusArray } from "../../../data/Forum/Types"
import { ForumQuery } from "../../../data/Forum/ForumQuery"
import { Controller, useForm } from "react-hook-form"
import { SimpleThreadPage } from "../../../data/Forum/Thread"
import ThreadQueryResults from "./ThreadQueryResults"
import Loading from "../../Loading/Loading"
import { makeStyles } from "@material-ui/styles"
import { checkIfObjectIsEmpty, getRandomColor } from "../../../Scripts/Utilities"
import { FormControl, TextFieldProps, TextField, InputLabel, MenuItem } from "@material-ui/core"
import DatePickerCollored from "../../Miscellaneous/DatePickerCollored"
import ButtonCollored from "../../Miscellaneous/ButtonCollored"
import TextFieldColored from "../../Miscellaneous/TextFieldColored"
import SelectCollored from "../../Miscellaneous/SelectCollored"
import TagInput from "../TagInput"

import "../css/ThreadSearch.css"

interface ThreadSearchProps {
    categories: ForumCategory[];
}

const color = getRandomColor(true);
const useStyles = makeStyles((theme) => ({
    datePicker: {
        '& .MuiOutlinedInput-input.MuiInputBase-input': {
            padding: '12px 0',
        },
        '& .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium': {
            color: color,
        },
        "& .MuiFormHelperText-root": {
            position: "absolute",
            bottom: "-20px",
        },
        "& .MuiInputLabel-root.MuiInputLabel-formControl.MuiInputLabel-animated.MuiInputLabel-outlined": {
            left: "-0.7vw",
            '@media (max-width: 960px)': {
                left: "-3vw",
            },
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderTop: 'none',
            borderRight: 'none',
            borderLeft: 'none',
            borderBottom: `2px solid ${color}`,
            borderRadius: 0,
        },
        '@media (max-width: 960px)': {
            width: '40vw',
        },
    },
    select: {
        "& .MuiInputLabel-root.MuiInputLabel-formControl.MuiInputLabel-animated.MuiInputLabel-outlined": {
            left: "-0.7vw",  
            '@media (max-width: 960px)': {
                left: "-3vw",
            },
        },
        '& .MuiSelect-select.MuiSelect-outlined.MuiOutlinedInput-input': {
            padding: '12px 0',
        },
        '@media (max-width: 960px)': {
            width: '40vw',
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderTop: 'none',
            borderRight: 'none',
            borderLeft: 'none',
            borderBottom: `2px solid ${color}`,
            borderRadius: 0,
        },
    },
    label: {
        color: '#101010',
        fontSize: '0.9rem'
    },
    centerContent: {
        justifyContent: 'center',
    },
}));

const setValueOptions = { shouldDirty: true, shouldTouch: true, shouldValidate: true }

export default function ThreadSearch(props: ThreadSearchProps) {
    const { categories } = props
    const classes = useStyles();
    const [tags, setTags] = useState<Tag[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const { enqueueSnackbar } = useSnackbar();
    const [error, setError] = useState<string>();
    const [threads, setThreads] = useState<SimpleThreadPage>()
    const [actualQuery, setActualQuery] = useState<ForumQuery>({} as ForumQuery)

    const searchUsingQuery = useCallback((async (query: ForumQuery) => {
        setLoading(true)
        setActualQuery(query)

        if (query.minCreation === null) query.minCreation = undefined
        if (query.maxCreation === null) query.minCreation = undefined
        if (query.minModification === null) query.minModification = undefined
        if (query.maxModification === null) query.maxModification = undefined

        await ForumService.searchThreadsByQuery(query, threads?.pageNumber ?? -1 + 1)
        .then((response: SimpleThreadPage) => {
            setThreads({...response})
            setLoading(false)
        })
        .catch((error: BackendError) => enqueueSnackbar(error.message, snackbarError))
    }), [enqueueSnackbar, threads?.pageNumber])

    const getTags = useCallback(async () => {
        setLoading(true)

        await ForumService.getTags()
        .then((response: Tag[]) => {
            setTags([...response])
            setLoading(false)
        })
        .catch((error: BackendError) => enqueueSnackbar(error.message, snackbarError))
    }, [enqueueSnackbar])

    useEffect(() => {
        setLoading(true);

        getTags()
        searchUsingQuery({})
        
        setLoading(false)
    }, [getTags])

    const schema = yup.object().shape({
        title: yup.string().nullable(true),
        creatorUsername: yup.string().nullable(true),
        status: yup.mixed<ThreadStatus>().nullable(true).transform((curr, orig) => orig === "" ? undefined : curr),
        category: yup.object().shape({
            categoryId: yup.number(),
            categoryName: yup.string(),
            categoryDescription: yup.string()
        }).nullable(true),
        tags: yup.array().of(yup.object().shape({
            tagId: yup.number(),
            tagName: yup.string(),
            tagImportance: yup.mixed<TagImportance>(),
            tagColor: yup.string()
        })).nullable(true),
        minCreation: yup.date().typeError("Wrong format").nullable(true).max(new Date(), "Can't be future").transform((curr, orig) => orig === "" ? undefined : curr),
        maxCreation: yup.date().typeError("Wrong format").nullable(true).max(new Date(), "Can't be future").transform((curr, orig) => orig === "" ? undefined : curr),
        minModification: yup.date().typeError("Wrong format").nullable(true).max(new Date(), "Can't be future").transform((curr, orig) => orig === "" ? undefined : curr),
        maxModification: yup.date().typeError("Wrong format").nullable(true).max(new Date(), "Can't be future").transform((curr, orig) => orig === "" ? undefined : curr),
        minNrOfPosts: yup.number().nullable(true).min(0, "Must be positive").transform((value, originalValue) => String(originalValue).trim() === "" ? undefined: value),
        maxNrOfPosts: yup.number().nullable(true).min(0, "Must be positive").transform((value, originalValue) => String(originalValue).trim() === "" ? undefined: value)
    })

    const { control, handleSubmit, setValue, formState: { errors } } = useForm<ForumQuery>({
        resolver: yupResolver(schema),
        mode: 'all',
        defaultValues: {
            title: undefined,
            creatorUsername: undefined,
            status: "",
            category: "" as any as ForumCategory,
            tags: [],
            minCreation: "",
            maxCreation: "",
            minModification: "",
            maxModification: "",
            minNrOfPosts: "",
            maxNrOfPosts: ""
        }
    })

    if (loading) {
        return <Loading error={error}/>
    }

    return (
        <div>
            <form onSubmit={handleSubmit(searchUsingQuery)} className="SearchOptions">
                <div className="minCreationInput">
                    <FormControl className={classes.datePicker}>
                        <Controller render={({field}) => (
                            <DatePickerCollored 
                                field={field}
                                label="Created after"
                                color={color}
                                inputFormat="dd/MM/yyyy"
                                onChange={data => {
                                    setValue('minCreation', data as Date, setValueOptions)
                                    setThreads({...threads, pageNumber: 0} as SimpleThreadPage)
                                }}
                                renderInput={(params : TextFieldProps) => <TextField {...params} error={errors.minCreation !== undefined} helperText={errors.minCreation?.message} />}
                            />
                        )}
                        control={control}
                        name="minCreation"
                        />
                    </FormControl>
                </div>

                <div className="maxCreationInput">
                    <FormControl className={classes.datePicker}>
                        <Controller render={({field}) => (
                            <DatePickerCollored 
                                field={field}
                                label="Created before"
                                color={color}
                                inputFormat="dd/MM/yyyy"
                                onChange={data => {
                                    setValue('maxCreation', data as Date, setValueOptions)
                                    setThreads({...threads, pageNumber: 0} as SimpleThreadPage)
                                }}
                                renderInput={(params : TextFieldProps) => <TextField {...params} error={errors.maxCreation !== undefined} helperText={errors.maxCreation?.message} />}
                            />
                        )}
                        control={control}
                        name="maxCreation"
                        />
                    </FormControl>
                </div>

                <div className="minModificationInput">
                    <FormControl className={classes.datePicker}>
                        <Controller render={({field}) => (
                            <DatePickerCollored 
                                field={field}
                                label="Modified after"
                                color={color}
                                inputFormat="dd/MM/yyyy"
                                onChange={data => {
                                    setValue('minModification', data as Date, setValueOptions)
                                    setThreads({...threads, pageNumber: 0} as SimpleThreadPage)
                                }}
                                renderInput={(params : TextFieldProps) => <TextField {...params} error={errors.minModification !== undefined} helperText={errors.minModification?.message} />}
                            />
                        )}
                        control={control}
                        name="minModification"
                        />
                    </FormControl>
                </div>

                <div className="maxModificationInput">
                    <FormControl className={classes.datePicker}>
                        <Controller render={({field}) => (
                            <DatePickerCollored 
                                field={field}
                                label="Modified before"
                                color={color}
                                inputFormat="dd/MM/yyyy"
                                onChange={data => {
                                    setValue('maxModification', data as Date, setValueOptions)
                                    setThreads({...threads, pageNumber: 0} as SimpleThreadPage)
                                }}
                                renderInput={(params : TextFieldProps) => <TextField {...params} error={errors.maxModification !== undefined} helperText={errors.maxModification?.message} />}
                            />
                        )}
                        control={control}
                        name="maxModification"
                        />
                    </FormControl>
                </div>

                <div className="minNrOfPostsInput">
                    <Controller render={({field}) => (
                        <TextFieldColored 
                            field={field}
                            errors={errors.minNrOfPosts}
                            label="Min. nr. of posts"
                            type="number"
                            color={color}
                        />
                    )}
                        name="minNrOfPosts"
                        control={control}
                    />
                </div>

                <div className="maxNrOfPostsInput">
                    <Controller render={({field}) => (
                        <TextFieldColored 
                            field={field}
                            errors={errors.maxNrOfPosts}
                            label="Max. nr. of posts"
                            type="number"
                            color={color}
                        />
                    )}
                        name="maxNrOfPosts"
                        control={control}
                    />
                </div>

                <div className="TitleInput">
                    <Controller render={({field}) => (
                        <TextFieldColored 
                            field={field}
                            errors={errors.title}
                            label="Title Contains"
                            color={color}
                        />
                    )}
                        name="title"
                        control={control}
                    />
                </div>

                <div className="CreatorUsernameInput">
                    <Controller render={({field}) => (
                        <TextFieldColored 
                            field={field}
                            errors={errors.creatorUsername}
                            label="Creator Username Contains"
                            color={color}
                        />
                    )}
                        name="creatorUsername"
                        control={control}
                    />
                </div>

                <div className="CategoryInput">
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
                            color={color}
                            options={[
                                <MenuItem key={0} value="">
                                    {<i>Clean</i>}
                                </MenuItem>,
                                ...categories.map((category: ForumCategory) => (
                                    <MenuItem key={category.categoryId} value={JSON.stringify(category)} >
                                        {category.categoryName}
                                    </MenuItem>
                                ))
                            ]}
                        />
                    )}
                    name="category"
                    control={control}
                    />
                    </FormControl>
                </div>

                <div className="StatusInput">
                    <FormControl className={classes.select} >
                        <InputLabel id="StatusLabel" className={classes.label}>
                            Status
                        </InputLabel>
                        <Controller render={({field}) => (
                            <SelectCollored 
                                field={field}
                                labelId="StatusLabel"
                                onChange={category => setValue('status', category.target.value as ThreadStatus, setValueOptions)}
                                errors={errors.status}
                                color={color}
                                options={[
                                    <MenuItem key={0} value="">
                                        {<i>Clean</i>}
                                    </MenuItem>,
                                    ...ThreadStatusArray.map((status: ThreadStatus) => (
                                        <MenuItem key={status} value={status} >
                                            {status}
                                        </MenuItem>
                                    ))
                                ]}
                                />
                            )}
                            name="status"
                            control={control}
                        />
                    </FormControl>
                </div>

                <Controller render={({field}) => (
                    tags && <TagInput
                        availableTags={tags}
                        field={field}
                        errors={errors.tags}
                        onChange={(event, tags: Tag[]) => setValue('tags', tags, setValueOptions)}
                        className="TagsInput"
                        color={color}
                    />
                )}
                    name="tags"
                    control={control}
                />
            </form>

            {
                threads &&
                <ThreadQueryResults threads={threads} getMore={(threads: SimpleThreadPage) => searchUsingQuery(actualQuery)} />
            }
        </div>
    )
}