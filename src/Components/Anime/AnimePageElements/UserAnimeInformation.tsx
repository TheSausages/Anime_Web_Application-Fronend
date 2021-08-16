import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';
import { ReactNode } from "react";
import { useEffect } from "react";
import { AnimeUserInformation, Grade, Grades, Review } from "../../../data/Anime/Smaller/AnimeUserInformation";
import { AnimeUserStatus } from "../../../data/Anime/Smaller/Enums";
import { getRandomColor, valueOrNotKnown } from "../../../Scripts/Utilities";
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { FuzzyDate } from "../../../data/Anime/Smaller/FuzzyDate";
import { Controller, useForm } from "react-hook-form";
import { useCallback } from "react";
import { UserService } from "../../../Scripts/Services/UserService";
import { snackbarError, snackbarInfo } from "../../../data/General/SnackBar";
import { BackendError } from "../../../data/General/BackendError";
import { useSnackbar } from "notistack";
import { DatePicker } from '@material-ui/lab';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';

import "../css/UserAnimeInformation.css"

const color = getRandomColor(true);
const useStyles = makeStyles((theme) => ({
    inputSpace: {
        paddingBottom: 5,
        width: '10vw',
    },
    label: {
        color: '#101010',
        fontSize: '0.9rem'
    },
    select: {
        width: '100%',
        borderRadius: 5,
        '&:before': {
            borderColor: color,
        },
        '&:after': {
            borderColor: color,
        },
        '&:focus': {
            borderColor: color,
        },
        '&:hover:not(.Mui-disabled):before': {
            borderColor: color,
        },
        '& .MuiSelect-select.MuiSelect-select': {
            paddingRight: 0,
        }
    },
    icon: {
        fill: color,
    },
    border: {
        border: `1px solid ${color}`,
        borderRadius: 5,
    }
}));

interface UserAnimeInformationProps {
    airedEpisodes: number;
    animeUserInformation?: AnimeUserInformation;
    animeStartDate: FuzzyDate;
    animeEndDate: FuzzyDate;
}

export default function UserAnimeInformation(props: UserAnimeInformationProps) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { airedEpisodes, animeUserInformation, animeStartDate, animeEndDate } = props;
    const schema = yup.object().shape({
        status: yup.mixed<AnimeUserStatus>().oneOf(Object.values(AnimeUserStatus).slice(0, 5).map(status => status as AnimeUserStatus)).notRequired(),
        watchStartDate: yup.date().nullable(true).notRequired(),
        watchEndDate: yup.date().nullable(true).notRequired(),
        nrOfEpisodesSeen: yup.number().integer().min(0, "Must be positive").notRequired(),
        isFavourite: yup.boolean().notRequired(),
        didReview: yup.boolean().notRequired(),
        review: yup.object({
            id: yup.number().integer().notRequired(),
            reviewText: yup.string(),
            nrOfHelpful: yup.number().integer(),
            nrOfPlus: yup.number().integer(),
            nrOfMinus: yup.number().integer()
        }).notRequired(),
        grade: yup.number().integer().nullable(true).notRequired().transform((_, val) => val === val ? val : '') 
    })

    const { control, formState: { errors, isDirty },setValue, getValues } = useForm<AnimeUserInformation>({
        resolver: yupResolver(schema),
        mode: 'all',
        defaultValues: {
            status: animeUserInformation?.status as AnimeUserStatus ?? AnimeUserStatus[0],
            watchStartDate: animeUserInformation?.watchStartDate ?? undefined,
            watchEndDate: animeUserInformation?.watchEndDate ?? undefined,
            nrOfEpisodesSeen: animeUserInformation?.nrOfEpisodesSeen ?? 0,
            isFavourite: animeUserInformation?.isFavourite ?? false,
            didReview: animeUserInformation?.didReview ?? false,
            review: animeUserInformation?.review ?? undefined,
            grade: animeUserInformation?.grade ?? ''
        }
    })

    const save = useCallback(() => {
        if (isDirty) {
            UserService.updateAnimeUserInformationData({...getValues(), id: animeUserInformation?.id!})
            .then(() => enqueueSnackbar("Your anime data has been updated!", snackbarInfo))
            .catch((error: BackendError) => {
                enqueueSnackbar(error.message, snackbarError)
            })
        }
    }, [getValues, isDirty, enqueueSnackbar, animeUserInformation?.id])

    useEffect(() => {
        window.addEventListener('onbeforeunload', (e: Event) => save);

        return (() => {
            save()
            window.removeEventListener('onbeforeunload', (e: Event) => save);
        })
    }, [save])

    const setValueOptions = { shouldDirty: true, shouldTouch: true, shouldValidate: true }

    return (
        <form className="userAnimeInformation">
            <FormControl className={classes.inputSpace}>
                <Controller render={({field}) => (
                    <FormControlLabel 
                        control={
                            <Checkbox 
                            {...field}
                            onChange={data => setValue('isFavourite', Boolean(data.target.value), setValueOptions)}
                            icon={<FavoriteBorder />} 
                            checkedIcon={<Favorite />} 
                        />
                        }
                        label="Is my Favourite"
                        className={classes.border}
                    />
                )}
                control={control}
                name="isFavourite"
                />
            </FormControl>

            <FormControl className={classes.inputSpace}>
                <InputLabel id="episodesSeenLabel" className={classes.label}>
                    Episodes Seen
                </InputLabel>
                <Controller render={({ field }) => (
                    <Select
                        {...field}
                        variant="standard"
                        inputProps={{ classes: { icon: classes.icon} }}
                        onChange={data => setValue('nrOfEpisodesSeen', data.target.value as number, setValueOptions)}
                        className={classes.select}
                        labelId="episodesSeenLabel"
                        error={errors.nrOfEpisodesSeen !== undefined}
                    >
                    {
                        getEpisodeArray(airedEpisodes)
                    }
                    </Select>
                )} 
                control={control}
                name="nrOfEpisodesSeen"
                />
            </FormControl>

            <FormControl className={classes.inputSpace}>
                <InputLabel id="StatusLabel" className={classes.label}>
                    Status
                </InputLabel>
                <Controller render={({field}) => (
                    <Select
                        {...field}
                        variant="standard"
                        inputProps={{ classes: { icon: classes.icon} }}
                        onChange={data => setValue('status', data.target.value as AnimeUserStatus, setValueOptions)}
                        className={classes.select}
                        labelId="StatusLabel"
                        error={errors.status !== undefined}
                    >
                    {
                        Object.values(AnimeUserStatus).slice(0, 5).map(status => (
                            <MenuItem key={status} value={status}>
                                {valueOrNotKnown(status)}
                            </MenuItem>
                        ))
                    }
                    </Select>
                )}
                control={control}
                name="status"
                />
            </FormControl>

            <FormControl className={classes.inputSpace}>
                <InputLabel id="GradeLabel" className={classes.label}>
                    Opinion
                </InputLabel>
                <Controller render={({field}) => (
                    <Select
                        {...field}
                        variant="standard"
                        inputProps={{ classes: { icon: classes.icon} }}
                        onChange={data => setValue('grade', data.target.value as number, setValueOptions)}
                        className={classes.select}
                        labelId="GradeLabel"
                        error={errors.status !== undefined}
                    >
                    {
                        Grades.map((grade: Grade) => (
                            <MenuItem key={grade.scale} value={grade.scale}>
                                {`${grade.scale}. ${grade.gradeName}`}
                            </MenuItem>
                        ))
                    }
                    </Select>
                )}
                control={control}
                name="grade"
                />
            </FormControl>

            <FormControl>

            </FormControl>
        </form>
    )
}

function getEpisodeArray(episodesAired: number): Array<ReactNode> {
    return Array.from(Array(episodesAired + 1), (e,i)=>i)
    .map((option: number) => (
        <MenuItem key={option} value={option}>
            {option}
        </MenuItem>
    ))
}
