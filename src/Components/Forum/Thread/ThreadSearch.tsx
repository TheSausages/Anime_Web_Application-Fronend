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
import { getRandomColor } from "../../../Scripts/Utilities"
import { TextFieldProps, TextField, MenuItem } from "@material-ui/core"
import DatePickerCollored from "../../Miscellaneous/DatePickerCollored"
import TextFieldColored from "../../Miscellaneous/TextFieldColored"
import SelectCollored from "../../Miscellaneous/SelectCollored"
import TagInput from "../TagInput"
import useBasicState from "../../../data/General/BasicState"

import "../css/ThreadSearch.css"
import { MiscellaneousProperties } from "../../../Properties/MiscellaneousProperties"

interface ThreadSearchProps {
    categories: ForumCategory[];
}

const color = getRandomColor(true);

export default function ThreadSearch(props: ThreadSearchProps) {
    const { categories } = props
    const setValueOptions = MiscellaneousProperties.reactHookFormSetValueOption;
    const [tags, setTags] = useState<Tag[]>([])
    const [threads, setThreads] = useState<SimpleThreadPage>()
    const [actualQuery, setActualQuery] = useState<ForumQuery>({} as ForumQuery)
    const { loading, error, startLoading, stopLoading, snackbar, setErrorMessage } = useBasicState()

    const searchUsingQuery = useCallback((async (query: ForumQuery) => {
        startLoading()
        setActualQuery(query)

        if (query.minCreation === null) query.minCreation = undefined
        if (query.maxCreation === null) query.minCreation = undefined
        if (query.minModification === null) query.minModification = undefined
        if (query.maxModification === null) query.maxModification = undefined

        await ForumService.searchThreadsByQuery(query, threads?.pageNumber ?? -1 + 1)
        .then((response: SimpleThreadPage) => {
            setThreads({...response})
            stopLoading()
        })
        .catch((error: BackendError) => snackbar(error.message, snackbarError))
    }), [snackbar, stopLoading, startLoading, threads?.pageNumber])

    const getTags = useCallback(async () => {
        startLoading()

        await ForumService.getTags()
        .then((response: Tag[]) => {
            setTags([...response])
            stopLoading()
        })
        .catch((error: BackendError) => {
            snackbar(error.message, snackbarError)
            setErrorMessage(error.message)
        })
    }, [snackbar, setErrorMessage, stopLoading, startLoading])

    useEffect(() => {
        startLoading()

        getTags()
        searchUsingQuery({})
        
        stopLoading()
    }, [getTags, searchUsingQuery, startLoading, stopLoading])

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
                <DatePickerCollored formControlClassName="minCreationInput"
                    label="Created after"
                    color={color}
                    inputFormat="dd/MM/yyyy"
                    control={control}
                    formControlName="minCreation"
                    onChange={data => {
                        setValue('minCreation', data as Date, setValueOptions)
                        setThreads({...threads, pageNumber: 0} as SimpleThreadPage)
                    }}
                    renderInput={(params : TextFieldProps) => <TextField {...params} error={errors.minCreation !== undefined} helperText={errors.minCreation?.message} />}
                />
                
                <DatePickerCollored formControlClassName="maxCreationInput"
                    label="Created before"
                    color={color}
                    inputFormat="dd/MM/yyyy"
                    control={control}
                    formControlName="maxCreation"
                    onChange={data => {
                        setValue('maxCreation', data as Date, setValueOptions)
                        setThreads({...threads, pageNumber: 0} as SimpleThreadPage)
                    }}
                    renderInput={(params : TextFieldProps) => <TextField {...params} error={errors.maxCreation !== undefined} helperText={errors.maxCreation?.message} />}
                />

                <DatePickerCollored formControlClassName="minModificationInput"
                    label="Modified after"
                    color={color}
                    inputFormat="dd/MM/yyyy"
                    control={control}
                    formControlName="minModification"
                    onChange={data => {
                        setValue('minModification', data as Date, setValueOptions)
                        setThreads({...threads, pageNumber: 0} as SimpleThreadPage)
                    }}
                    renderInput={(params : TextFieldProps) => <TextField {...params} error={errors.minModification !== undefined} helperText={errors.minModification?.message} />}
                />

                <DatePickerCollored formControlClassName="maxModificationInput"
                    label="Modified before"
                    color={color}
                    inputFormat="dd/MM/yyyy"
                    control={control}
                    formControlName="maxModification"
                    onChange={data => {
                        setValue('maxModification', data as Date, setValueOptions)
                        setThreads({...threads, pageNumber: 0} as SimpleThreadPage)
                    }}
                    renderInput={(params : TextFieldProps) => <TextField {...params} error={errors.maxModification !== undefined} helperText={errors.maxModification?.message} />}
                />

                <div className="minNrOfPostsInput">
                    <TextFieldColored formControlName="minNrOfPosts"
                        control={control}
                        errors={errors.minNrOfPosts}
                        label="Min. nr. of posts"
                        type="number"
                        color={color}
                    />
                </div>

                <div className="maxNrOfPostsInput">
                    <TextFieldColored formControlName="maxNrOfPosts"
                        control={control}
                        errors={errors.maxNrOfPosts}
                        label="Max. nr. of posts"
                        type="number"
                        color={color}
                    />
                </div>

                <div className="TitleInput">
                    <TextFieldColored formControlName="title"
                        control={control}
                        errors={errors.title}
                        label="Title Contains"
                        color={color}
                    />
                </div>

                <div className="CreatorUsernameInput">
                    <TextFieldColored formControlName="creatorUsername"
                        control={control}
                        errors={errors.creatorUsername}
                        label="Creator Username Contains"
                        color={color}
                    />
                </div>

                <div className="CategoryInput">
                    <SelectCollored labelId="CategoryLabel"
                        title="Category"
                        onChange={category => setValue('category', category.target.value as ForumCategory, setValueOptions)}
                        errors={errors.category?.categoryDescription || errors.category?.categoryName || errors.category?.categoryId}
                        color={color}
                        options={[
                            ...categories.map((category: ForumCategory) => (
                                <MenuItem key={category.categoryId} value={JSON.stringify(category)} >
                                    {category.categoryName}
                                </MenuItem>
                            ))
                        ]}
                        formControlName="category"
                        control={control}
                    />
                </div>

                <div className="StatusInput">
                    <SelectCollored labelId="StatusLabel"
                        title="Status"
                        onChange={category => setValue('status', category.target.value as ThreadStatus, setValueOptions)}
                        errors={errors.status}
                        color={color}
                        options={[
                            ...ThreadStatusArray.map((status: ThreadStatus) => (
                                <MenuItem key={status} value={status} >
                                    {status}
                                </MenuItem>
                            ))
                        ]}
                        formControlName="status"
                        control={control}
                    />
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