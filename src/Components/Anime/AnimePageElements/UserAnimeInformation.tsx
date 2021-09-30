import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Portal, Select, TextField, TextFieldProps } from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';
import { ReactNode, useState } from "react";
import { useEffect } from "react";
import { AnimeUserInformation, AnimeUserStatus, AnimeUserStatusElements, Grade, Grades } from "../../../data/Anime/Smaller/AnimeUserInformation";
import { getRandomColor } from "../../../Scripts/Utilities";
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { FuzzyDate, getDateFromFuzzy } from "../../../data/Anime/Smaller/FuzzyDate";
import { Controller, useForm } from "react-hook-form";
import { useCallback } from "react";
import { UserService } from "../../../Scripts/Services/UserService";
import { snackbarError, snackbarInfo, snackbarWarning } from "../../../data/General/SnackBar";
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
import DatePickerCollored from '../../Miscellaneous/DatePickerCollored';
import CheckboxCollored from '../../Miscellaneous/CheckboxCollored';
import SelectCollored from '../../Miscellaneous/SelectCollored';

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
    datePicker: {
        '& .css-i4bv87-MuiSvgIcon-root': {
            color: color
        },
        "& .MuiFormHelperText-root": {
            position: "absolute",
            bottom: "-20px",
        }
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
        status: yup.mixed<AnimeUserStatus>().notRequired(),
        watchStartDate: yup.date().nullable(true).min(getDateFromFuzzy(animeStartDate), "Too early!").max(new Date(), "Too late!").notRequired(),
        watchEndDate: yup.date().nullable(true).min(yup.ref('watchStartDate'), "Too early!").max(new Date(), "Too late!").notRequired(),
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

    const { control, formState: { errors, isDirty }, setValue, getValues } = useForm<AnimeUserInformation>({
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
        mode: 'onChange',
        defaultValues: {
            status: animeUserInformation?.status as AnimeUserStatus ?? AnimeUserStatusElements[0],
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
            if (Object.keys(errors).length === 0) {
                UserService.updateAnimeUserInformationData({...getValues(), id: animeUserInformation?.id!})
                .then(() => enqueueSnackbar("Your anime data has been updated!", snackbarInfo))
                .catch((error: BackendError) => {
                    enqueueSnackbar(error.message, snackbarError)
                })
            } else {
                enqueueSnackbar("Your information was not updated, as it contained errors", snackbarWarning)
            }
        }
    }, [getValues, errors, isDirty, enqueueSnackbar, animeUserInformation?.id])

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
                        <CheckboxCollored 
                            field={field}
                            checked={field.value}
                            onChange={data => setValue('isFavourite', Boolean(data.target.checked), setValueOptions)}
                            icon={<FavoriteBorder />} 
                            checkedIcon={<Favorite />} 
                            className={classes.centerContent}
                            label="Is my Favourite"
                            color={color}
                        />
                    )}
                    control={control}
                    name="isFavourite"
                    />
                </FormControl>

                <FormControl className={`${classes.inputSpace} watchStartDate ${classes.datePicker}`}>
                    <Controller render={({field}) => (
                        <DatePickerCollored 
                            field={field}
                            label="Watch start date"
                            color={color}
                            inputFormat="dd/MM/yyyy"
                            onChange={data => setValue('watchStartDate', data as Date, setValueOptions)}
                            renderInput={(params : TextFieldProps) => <TextField {...params} error={errors.watchStartDate !== undefined} helperText={errors.watchStartDate?.message} />}
                        />
                    )}
                    control={control}
                    name="watchStartDate"
                    />
                </FormControl>

                <FormControl className={`${classes.inputSpace} watchEndDate ${classes.datePicker}`}>
                    <Controller render={({field}) => (
                        <DatePickerCollored 
                            field={field}
                            label="Watch end date"
                            color={color}
                            inputFormat="dd/MM/yyyy"
                            onChange={data => setValue('watchEndDate', data as Date, setValueOptions)}
                            renderInput={(params) => <TextField {...params} error={errors.watchEndDate !== undefined} helperText={errors.watchEndDate?.message} />}
                        />
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
                        <SelectCollored
                            field={field}
                            onChange={data => setValue('nrOfEpisodesSeen', data.target.value as number, setValueOptions)}
                            label="episodesSeenLabel"
                            errors={errors.nrOfEpisodesSeen}
                            options={getEpisodeArray(airedEpisodes)}
                            color={color}
                        />
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
                        <SelectCollored 
                            field={field} 
                            onChange={data => setValue('status', data.target.value as AnimeUserStatus, setValueOptions)}
                            label="StatusLabel"
                            errors={errors.status}
                            color={color}
                            options={
                                AnimeUserStatusElements.map(status => (
                                    <MenuItem key={status} value={status}>
                                        {status}
                                    </MenuItem>
                                ))
                            }
                        />
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
                        <SelectCollored 
                            field={field}
                            onChange={data => setValue('grade', data.target.value as number, setValueOptions)}
                            label="GradeLabel"
                            errors={errors.status}
                            color={color}
                            options={
                                Grades.map((grade: Grade) => (
                                    <MenuItem key={grade.scale} value={grade.scale}>
                                        {`${grade.scale}. ${grade.gradeName}`}
                                    </MenuItem>
                                ))
                            }
                        />
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
