import { yupResolver } from "@hookform/resolvers/yup"
import { MenuItem, TextField, TextFieldProps } from "@material-ui/core"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { AnimeQuery, SeasonYear, SeasonYearArray } from "../../data/Anime/AnimeQuery"
import { Page } from "../../data/Anime/Page"
import { Format, FormatArray, Season, Status, StatusArray } from "../../data/Anime/Smaller/Enums"
import { BackendError } from "../../data/General/BackendError"
import useBasicState from "../../data/General/BasicState"
import { snackbarError } from "../../data/General/SnackBar"
import { MiscellaneousProperties } from "../../Properties/MiscellaneousProperties"
import { AnimeService } from "../../Scripts/Services/AnimeService"
import { Capitalize, getRandomColor } from "../../Scripts/Utilities"
import AnimeLinkScroll from "../AnimeLink/AnimeListScroll"
import Loading from "../Loading/Loading"
import ButtonCollored from "../Miscellaneous/ButtonCollored"
import DatePickerCollored from "../Miscellaneous/DatePickerCollored"
import SelectCollored from "../Miscellaneous/SelectCollored"
import TextFieldColored from "../Miscellaneous/TextFieldColored"

import "./css/AnimeSearch.css"

interface AnimeSearchProps {}

interface PageWithNumber {
    items: Page;
    currentPage: number;
}

const color = getRandomColor(true);

export default function AnimeSearch(props: AnimeSearchProps) {
    const setValueOptions = MiscellaneousProperties.reactHookFormSetValueOption;
    const [actualQuery, setActualQuery] = useState<AnimeQuery>({} as AnimeQuery)
    const [items, setItems] = useState<PageWithNumber>({} as PageWithNumber)
    const { loading, error, startLoading, stopLoading, snackbar, setErrorMessage } = useBasicState()

    const searchUsingQuery = useCallback((async (query: AnimeQuery, currentPage: number) => {
        startLoading()

        await AnimeService.searchUsingQuery(query, currentPage + 1)
        .then((response: Page) => {
            setItems((itemsWithPage: PageWithNumber) => ({
                currentPage: currentPage + 1,
                items: {
                    pageInfo: response.pageInfo,
                    media: [ ...itemsWithPage?.items?.media ?? [], ...response.media ?? [] ]
                } as Page
            } as PageWithNumber))

            stopLoading()
        })
        .catch((error: BackendError) => {
            snackbar(error.message, snackbarError)
            setErrorMessage(error.message)
        })
    }), [snackbar, stopLoading, startLoading, setErrorMessage])

    const formSearch = useCallback(async (query: AnimeQuery) => {
        setItems({} as PageWithNumber)
        setActualQuery(query)
        searchUsingQuery(query, 0)
    }, [searchUsingQuery])

    useEffect(() => {
        startLoading()

        searchUsingQuery({} , 0)

        stopLoading()
    }, [startLoading, stopLoading, searchUsingQuery])

    const schema = yup.object().shape({
        title: yup.string().nullable(true),
        status: yup.mixed<Status>().nullable(true).transform((curr, orig) => orig === "" ? undefined : curr),
        format: yup.mixed<Format>().nullable(true).transform((curr, orig) => orig === "" ? undefined : curr),
        season: yup.object().shape({
            season: yup.mixed<Season>(),
            year: yup.number(),
        }).nullable(true),
        minStartDate: yup.date().typeError("Wrong format").nullable(true).transform((curr, orig) => orig === "" ? undefined : curr),
        maxStartDate: yup.date().typeError("Wrong format").nullable(true).transform((curr, orig) => orig === "" ? undefined : curr),
        minEndDate: yup.date().typeError("Wrong format").nullable(true).transform((curr, orig) => orig === "" ? undefined : curr),
        maxEndDate: yup.date().typeError("Wrong format").nullable(true).transform((curr, orig) => orig === "" ? undefined : curr),
        minNrOfEpisodes: yup.number().nullable(true).min(0, "Must be positive").transform((value, originalValue) => String(originalValue).trim() === "" ? undefined: value),
        maxNrOfEpisodes: yup.number().nullable(true).min(0, "Must be positive").transform((value, originalValue) => String(originalValue).trim() === "" ? undefined: value),
        minAverageScore: yup.number().nullable(true).min(0, "Must be positive").max(101, "Must not exceed 100").transform((value, originalValue) => String(originalValue).trim() === "" ? undefined: value),
        maxAverageScore: yup.number().nullable(true).min(0, "Must be positive").max(101, "Must not exceed 100").transform((value, originalValue) => String(originalValue).trim() === "" ? undefined: value),
    })

    const { control, handleSubmit, setValue, formState: { errors } } = useForm<AnimeQuery>({
        resolver: yupResolver(schema),
        mode: 'all',
        defaultValues: {
            title: "",
            status: "" as any as Status,
            format: "" as any as Format,
            season: "" as any as SeasonYear,
            minStartDate: "",
            maxStartDate: "",
            minEndDate: "",
            maxEndDate: "",
            minNrOfEpisodes: "",
            maxNrOfEpisodes: "",
            minAverageScore: "",
            maxAverageScore: ""
        }
    })

    return (
        <div>
            <form onSubmit={handleSubmit(formSearch)} className="AnimeSearchOptions">
                <DatePickerCollored formControlClassName="minStartDateInput"
                    label="Started after"
                    color={color}
                    inputFormat="dd/MM/yyyy"
                    control={control}
                    formControlName="minStartDate"
                    onChange={data => setValue('minStartDate', data as Date, setValueOptions)}
                    renderInput={(params : TextFieldProps) => <TextField {...params} error={errors.minStartDate !== undefined} helperText={errors.minStartDate?.message} />}
                />

                <DatePickerCollored formControlClassName="maxStartDateInput"
                    label="Started before"
                    color={color}
                    inputFormat="dd/MM/yyyy"
                    control={control}
                    formControlName="maxStartDate"
                    onChange={data => setValue('maxStartDate', data as Date, setValueOptions)}
                    renderInput={(params : TextFieldProps) => <TextField {...params} error={errors.maxStartDate !== undefined} helperText={errors.maxStartDate?.message} />}
                />

                <DatePickerCollored formControlClassName="minEndDateInput"
                    label="Ender after"
                    color={color}
                    inputFormat="dd/MM/yyyy"
                    control={control}
                    formControlName="minEndDate"
                    onChange={data => setValue('minEndDate', data as Date, setValueOptions)}
                    renderInput={(params : TextFieldProps) => <TextField {...params} error={errors.minEndDate !== undefined} helperText={errors.minEndDate?.message} />}
                />

                <DatePickerCollored formControlClassName="maxEndDateInput"
                    label="Ended before"
                    color={color}
                    inputFormat="dd/MM/yyyy"
                    control={control}
                    formControlName="maxEndDate"
                    onChange={data => setValue('maxEndDate', data as Date, setValueOptions)}
                    renderInput={(params : TextFieldProps) => <TextField {...params} error={errors.maxEndDate !== undefined} helperText={errors.maxEndDate?.message} />}
                />

                <div className="minNrOfEpisodesInput">
                    <TextFieldColored formControlName="minNrOfEpisodes"
                        control={control}
                        errors={errors.minNrOfEpisodes}
                        label="Min. nr. of episodes"
                        type="number"
                        color={color}
                    />
                </div>

                <div className="maxNrOfEpisodesInput">
                    <TextFieldColored formControlName="maxNrOfEpisodes"
                        control={control}
                        errors={errors.maxNrOfEpisodes}
                        label="Max. nr. of episodes"
                        type="number"
                        color={color}
                    />
                </div>

                <div className="minAverageScoreInput">
                    <TextFieldColored formControlName="minAverageScore"
                        control={control}
                        errors={errors.minAverageScore}
                        label="Min. average score"
                        type="number"
                        color={color}
                    />
                </div>

                <div className="maxAverageScoreInput">
                    <TextFieldColored formControlName="maxAverageScore"
                        control={control}
                        errors={errors.maxAverageScore}
                        label="Max. average score"
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

                <div className="StatusInput">
                    <SelectCollored labelId="StatusLabel"
                        title="Status"
                        onChange={category => setValue('status', category.target.value as Status, setValueOptions)}
                        errors={errors.status}
                        color={color}
                        options={[
                            ...StatusArray.map((status: Status) => (
                                <MenuItem key={status} value={status} >
                                    {Capitalize(status)}
                                </MenuItem>
                            ))
                        ]}
                        formControlName="status"
                        control={control}
                    />
                </div>

                <div className="FormatInput">
                    <SelectCollored labelId="FormatLabel"
                        title="Format"
                        onChange={format => setValue('format', format.target.value as Format, setValueOptions)}
                        errors={errors.format}
                        color={color}
                        options={[
                            ...FormatArray.map((format: Format) => (
                                <MenuItem key={format} value={format} >
                                    {Capitalize(format)}
                                </MenuItem>
                            ))
                        ]}
                        formControlName="format"
                        control={control}
                    />
                </div>

                <div className="SeasonInput">
                    <SelectCollored labelId="SeasonLabel"
                        title="Season"
                        onChange={season => setValue('season', season.target.value as SeasonYear, setValueOptions)}
                        errors={errors.season?.season || errors.season?.year}
                        color={color}
                        options={[
                            ...SeasonYearArray.map((season: SeasonYear, index: number) => (
                                <MenuItem key={index} value={JSON.stringify(season)} >
                                    {`${Capitalize(season.season)} ${season.year} `}
                                </MenuItem>
                            ))
                        ]}
                        formControlName="season"
                        control={control}
                    />
                </div>

                <div className="AnimeSearchSubmitButton">
                    <ButtonCollored text="Search" type="submit" />
                </div>
            </form>

            {
                loading &&
                    <Loading error={error}/>
            }

            {
                items?.items?.media &&
                    <AnimeLinkScroll getMore={() => searchUsingQuery(actualQuery, items.currentPage)} items={items.items} />
            }
        </div>
    )
}