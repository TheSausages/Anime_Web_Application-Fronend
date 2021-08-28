import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Portal, Select, TextField } from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';
import { ReactNode, useState } from "react";
import { useEffect } from "react";
import { AnimeUserInformation, Grade, Grades } from "../../../data/Anime/Smaller/AnimeUserInformation";
import { AnimeUserStatus } from "../../../data/Anime/Smaller/Enums";
import { getRandomColor, valueOrNotKnown } from "../../../Scripts/Utilities";
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { FuzzyDate, getDateFromFuzzy } from "../../../data/Anime/Smaller/FuzzyDate";
import { Controller, useForm } from "react-hook-form";
import { useCallback } from "react";
import { UserService } from "../../../Scripts/Services/UserService";
import { snackbarError, snackbarInfo } from "../../../data/General/SnackBar";
import { BackendError } from "../../../data/General/BackendError";
import { useSnackbar } from "notistack";
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import { DatePicker } from '@material-ui/lab';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import { ReviewComponent } from './ReviewComponent';
import React from 'react';

import "../css/UserAnimeInformation.css"
import ButtonCollored from '../../Miscellaneous/ButtonCollored';

const color = getRandomColor(true);
const useStyles = makeStyles((theme) => ({
    inputSpace: {
        width: '15vw',
        '@media (max-width: 960px)': {
            width: '40vw',
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderTop: 'none',
            borderRight: 'none',
            borderLeft: 'none',
            borderBottom: `1px solid ${color}`,
            borderRadius: 0,
        },
    },
    label: {
        color: '#101010',
        fontSize: '0.9rem'
    },
    datePicker: {
        '& .css-i4bv87-MuiSvgIcon-root': {
            color: color
        },
        "& .MuiFormHelperText-root": {
            position: "absolute",
            bottom: "-20px",
        }
    },
    select: {
        width: '100%',
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
        },
        '& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon': {
            color: color,
        }
    },
    centerContent: {
        justifyContent: 'center',
    },
}));

const setValueOptions = { shouldDirty: true, shouldTouch: true, shouldValidate: true }

interface UserAnimeInformationProps {
    airedEpisodes: number;
    animeUserInformation?: AnimeUserInformation;
    animeStartDate: FuzzyDate;
}

export default function UserAnimeInformation(props: UserAnimeInformationProps) {
    const classes = useStyles();
    const [openReview, setOpenReview] = useState<boolean>(false)
    const container = React.useRef(null);
    const { enqueueSnackbar } = useSnackbar();
    const { airedEpisodes, animeUserInformation, animeStartDate } = props;

    const schema = yup.object().shape({
        status: yup.mixed<AnimeUserStatus>().oneOf(Object.values(AnimeUserStatus).slice(0, 5).map(status => status as AnimeUserStatus)).notRequired(),
        watchStartDate: yup.date().nullable(true).min(getDateFromFuzzy(animeStartDate), "Too early!").notRequired(),
        watchEndDate: yup.date().nullable(true).min(yup.ref('watchStartDate'), "Too early!").notRequired(),
        nrOfEpisodesSeen: yup.number().integer().min(0, "Must be positive").notRequired(),
        isFavourite: yup.boolean().notRequired(),
        didReview: yup.boolean().notRequired(),
        review: yup.object({
            id: yup.number().integer().notRequired().default(undefined),
            reviewTitle: yup.string(),
            reviewText: yup.string(),
            nrOfHelpful: yup.number().integer(),
            nrOfPlus: yup.number().integer(),
            nrOfMinus: yup.number().integer()
        }).notRequired(),
        grade: yup.number().integer().nullable(true).notRequired()
    })

    const { control, formState: { errors, isDirty, isValid }, setValue, getValues } = useForm<AnimeUserInformation>({
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
        if (isDirty && isValid) {
            UserService.updateAnimeUserInformationData({...getValues(), id: animeUserInformation?.id!})
            .then(() => enqueueSnackbar("Your anime data has been updated!", snackbarInfo))
            .catch((error: BackendError) => {
                enqueueSnackbar(error.message, snackbarError)
            })
        }
    }, [getValues, isDirty, isValid, enqueueSnackbar, animeUserInformation?.id])

    useEffect(() => {
        window.addEventListener('onbeforeunload', (e: Event) => save);

        return (() => {
            save()
            window.removeEventListener('onbeforeunload', (e: Event) => save);
        })
    }, [save])
    
    return (
        <div className="userAnimeInformation">
            <form className="mainAnimeInformationForm">
                <FormControl className={`${classes.inputSpace} isFavourite`}>
                    <Controller render={({field}) => (
                        <FormControlLabel 
                            control={
                                <Checkbox 
                                {...field}
                                checked={field.value}
                                onChange={data => setValue('isFavourite', Boolean(data.target.checked), setValueOptions)}
                                icon={<FavoriteBorder />} 
                                checkedIcon={<Favorite />} 
                            />}
                            className={classes.centerContent}
                            label="Is my Favourite"
                        />
                    )}
                    control={control}
                    name="isFavourite"
                    />
                </FormControl>

                <FormControl className={`${classes.inputSpace} watchStartDate ${classes.datePicker}`}>
                    <Controller render={({field}) => (
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker 
                                {...field}
                                label="Watch start date"
                                inputFormat="dd/MM/yyyy"
                                onChange={data => setValue('watchStartDate', data as Date, setValueOptions)}
                                renderInput={(params) => <TextField {...params} error={errors.watchStartDate !== undefined} helperText={errors.watchStartDate?.message} />}
                            />
                        </LocalizationProvider>
                    )}
                    control={control}
                    name="watchStartDate"
                    />
                </FormControl>

                <FormControl className={`${classes.inputSpace} watchEndDate ${classes.datePicker}`}>
                    <Controller render={({field}) => (
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker 
                                {...field}
                                label="Watch end date"
                                className={classes.datePicker}
                                inputFormat="dd/MM/yyyy"
                                onChange={data => setValue('watchEndDate', data as Date, setValueOptions)}
                                renderInput={(params) => <TextField {...params} error={errors.watchEndDate !== undefined} helperText={errors.watchEndDate?.message}  />}
                            />
                        </LocalizationProvider>
                    )}
                    control={control}
                    name="watchEndDate"
                    />
                </FormControl>

                <FormControl className={`${classes.inputSpace} episodesSeen`}>
                    <InputLabel id="episodesSeenLabel" className={classes.label}>
                        Episodes Seen
                    </InputLabel>
                    <Controller render={({ field }) => (
                        <Select
                            {...field}
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

                <FormControl className={`${classes.inputSpace} status`}>
                    <InputLabel id="StatusLabel" className={classes.label}>
                        Status
                    </InputLabel>
                    <Controller render={({field}) => (
                        <Select
                            {...field}   
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

                <FormControl className={`${classes.inputSpace} grade`}>
                    <InputLabel id="GradeLabel" className={classes.label}>
                        Opinion
                    </InputLabel>
                    <Controller render={({field}) => (
                        <Select
                            {...field}
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

                <div className="review">
                    <ButtonCollored text="Review Editor"
                        onClick={() => setOpenReview(true)}
                    />
                    <Portal container={container.current} />
                </div>
            </form>

            <div ref={container}>
                <ReviewComponent open={openReview} control={control} setReviewOpen={setOpenReview} setMainValue={setValue} review={animeUserInformation?.review}/>
            </div>
        </div>
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
