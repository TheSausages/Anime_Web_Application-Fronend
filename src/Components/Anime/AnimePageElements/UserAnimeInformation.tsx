import { MenuItem, Portal, TextField, TextFieldProps } from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';
import { ReactNode, useState } from "react";
import { useEffect } from "react";
import { AnimeUserInformation, AnimeUserStatus, AnimeUserStatusElements, Grade, Grades } from "../../../data/Anime/Smaller/AnimeUserInformation";
import { getRandomColor } from "../../../Scripts/Utilities";
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { FuzzyDate, getDateFromFuzzy } from "../../../data/Anime/Smaller/FuzzyDate";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { snackbarError, snackBarSuccess } from "../../../data/General/SnackBar";
import { BackendError } from "../../../data/General/BackendError";
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import ReviewFormComponent from './ReviewForm';
import React from 'react';
import ButtonCollored from '../../Miscellaneous/ButtonCollored';
import DatePickerCollored from '../../Miscellaneous/DatePickerCollored';
import CheckboxCollored from '../../Miscellaneous/CheckboxCollored';
import SelectCollored from '../../Miscellaneous/SelectCollored';
import useBasicState from '../../../data/General/BasicState';
import { MiscellaneousProperties } from '../../../Properties/MiscellaneousProperties';
import {AnimeService} from "../../../Scripts/Services/AnimeService";

import "../css/UserAnimeInformation.css"

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
    centerContent: {
        justifyContent: 'center',
    },
}));

/**
 * The props for the {@link UserAnimeInformation} component.
 */
export interface UserAnimeInformationProps {
    /** How many episodes where aired to this day. */
    airedEpisodes: number;

    /** If exists, use those information as default values. */
    animeUserInformation?: AnimeUserInformation;

    /** Date when the anime started. */
    animeStartDate: FuzzyDate;
}

/**
 * Component for displaying and editing user information on an Anime.
 * This component should only be displayed when logged in.
 * @param props {@link UserAnimeInformation}
 */
export default function UserAnimeInformation(props: UserAnimeInformationProps) {
    const classes = useStyles();
    const setValueOptions = MiscellaneousProperties.reactHookFormSetValueOption;
    const [openReview, setOpenReview] = useState<boolean>(false)
    const container = React.useRef(null);
    const { snackbar, t, i18n } = useBasicState()
    const { airedEpisodes, animeUserInformation, animeStartDate } = props;

    const schema = yup.object().shape({
        status: yup.mixed<AnimeUserStatus>().notRequired().nullable(true).transform((curr, orig) => orig === "" ? undefined : curr),
        watchStartDate: yup.date().nullable(true).typeError(t("fieldErrors.dateTypeError"))
            .min(getDateFromFuzzy(animeStartDate), t("fieldErrors.dateTooEarly"))
            .max(new Date(), t("fieldErrors.dateTooLate")).notRequired().transform((curr, orig) => orig === "" ? undefined : curr),
        watchEndDate: yup.date().nullable(true).typeError(t("fieldErrors.dateTypeError"))
            .min(yup.ref('watchStartDate'), t("fieldErrors.dateTooEarly"))
            .max(new Date(), t("fieldErrors.dateTooLate")).notRequired().transform((curr, orig) => orig === "" ? undefined : curr),
        nrOfEpisodesSeen: yup.number().integer().min(0, t("fieldErrors.numberMustBePositive")).notRequired().nullable(true)
        .transform((curr, orig) => orig === "" ? 0 : curr),
        isFavourite: yup.boolean().notRequired().nullable(true),
        didReview: yup.boolean().notRequired().nullable(true),
        review: yup.object({
            id: yup.number().integer().notRequired().default(undefined),
            reviewTitle: yup.string(),
            reviewText: yup.string(),
            nrOfHelpful: yup.number().integer(),
            nrOfPlus: yup.number().integer(),
            nrOfMinus: yup.number().integer()
        }).notRequired().nullable(true),
        grade: yup.number().integer().nullable(true).notRequired().transform((curr, orig) => orig === "" ? undefined : curr)
    })

    const { control, formState: { errors, isDirty }, setValue, getValues } = useForm<AnimeUserInformation>({
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
        mode: 'onChange',
        defaultValues: {
            status: animeUserInformation?.status as AnimeUserStatus ?? "No Status",
            watchStartDate: animeUserInformation?.watchStartDate ?? "",
            watchEndDate: animeUserInformation?.watchEndDate ?? "",
            nrOfEpisodesSeen: animeUserInformation?.nrOfEpisodesSeen ?? 0,
            isFavourite: animeUserInformation?.isFavourite ?? false,
            didReview: animeUserInformation?.didReview ?? false,
            review: animeUserInformation?.review ?? undefined,
            grade: animeUserInformation?.grade ?? ""
        }
    })

    const save = useCallback(async () => {
        if (isDirty) {
            if (Object.keys(errors).length === 0) {
                let inf: AnimeUserInformation = getValues()

                if (inf.status === "") inf.status = "No Status";
                if (inf.watchStartDate === null) inf.watchStartDate = undefined;
                if (inf.watchEndDate === null) inf.watchEndDate = undefined;

                await AnimeService.updateAnimeUserInformationData({...inf, id: animeUserInformation?.id!}, t, i18n)
                .then(() => snackbar(t("anime.userAnimeInformation.updateSuccessfull"), snackBarSuccess))
                .catch((error: BackendError) => {
                    snackbar(error.message, snackbarError)
                })
            } else {
                snackbar(t("anime.userAnimeInformation.updateError"), snackbarError)
            }
        }
    }, [getValues, errors, isDirty, snackbar, animeUserInformation?.id, t, i18n])

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
                <CheckboxCollored className={classes.centerContent}
                    onChange={data => {
                        setValue('isFavourite', Boolean(data.target.checked), setValueOptions);
                        save();
                    }}
                    icon={<FavoriteBorder />} 
                    checkedIcon={<Favorite />} 
                    label={t("anime.userAnimeInformation.favouriteLabel")}
                    color={color}
                    control={control}
                    formControlName="isFavourite"
                    formControlClassName={`${classes.inputSpace} isFavourite`}
                />

                <DatePickerCollored formControlClassName={`${classes.inputSpace} watchStartDate`}
                    label={t("anime.userAnimeInformation.watchStartDateLabel")}
                    color={color}
                    inputFormat="dd/MM/yyyy"
                    control={control}
                    formControlName="watchStartDate"
                    onChange={data => {
                        setValue('watchStartDate', data as Date, setValueOptions);
                        save();
                    }}
                    renderInput={(params: TextFieldProps) => <TextField {...params} error={errors.watchStartDate !== undefined} helperText={errors.watchStartDate?.message} />}
                />

                <DatePickerCollored formControlClassName={`${classes.inputSpace} watchEndDate`}
                    label={t("anime.userAnimeInformation.watchEndDateLabel")}
                    color={color}
                    inputFormat="dd/MM/yyyy"
                    control={control}
                    formControlName="watchEndDate"
                    onChange={data => {
                        setValue('watchEndDate', data as Date, setValueOptions);
                        save();
                    }}
                    renderInput={(params: TextFieldProps) => <TextField {...params} error={errors.watchEndDate !== undefined} helperText={errors.watchEndDate?.message} />}
                />

                <SelectCollored labelId="episodesSeenLabel"
                    label={t("anime.userAnimeInformation.episodesSeenLabel")}
                    formControlClassName={`${classes.inputSpace} episodesSeen`}
                    onChange={data => {
                        setValue('nrOfEpisodesSeen', data.target.value as number, setValueOptions);
                        save();
                    }}
                    errors={errors.nrOfEpisodesSeen}
                    options={getEpisodeArray(airedEpisodes)}
                    color={color}
                    control={control}
                    formControlName="nrOfEpisodesSeen"
                />

                <SelectCollored labelId="StatusLabel"
                    label={t("anime.userAnimeInformation.statusLabel")}
                    formControlClassName={`${classes.inputSpace} status`}
                    onChange={data => {
                        setValue('status', data.target.value as AnimeUserStatus, setValueOptions);
                        save();
                    }}
                    errors={errors.status}
                    color={color}
                    options={
                        AnimeUserStatusElements.map(status => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))
                    }
                    control={control}
                    formControlName="status"
                />

                <SelectCollored labelId="GradeLabel"
                    label={t("anime.userAnimeInformation.gradeLabel")}
                    formControlClassName={`${classes.inputSpace} grade`}
                    onChange={data => {
                        setValue('grade', data.target.value as number, setValueOptions);
                        save();
                    }}
                    errors={errors.status}
                    color={color}
                    options={
                        Grades.map((grade: Grade) => (
                            <MenuItem key={grade.scale} value={grade.scale}>
                                {`${grade.scale}. ${grade.gradeName}`}
                            </MenuItem>
                        ))
                    }
                    control={control}
                    formControlName="grade"
                />

                <div className="review">
                    <ButtonCollored text={t("anime.userAnimeInformation.reviewButton")}
                        onClick={() => setOpenReview(true)}
                    />
                    <Portal container={container.current} />
                </div>

                <div className="submit">
                    <ButtonCollored text={t("input.submit")} 
                        onClick={() => save()}
                    />
                </div>
            </form>

            <div ref={container}>
                <ReviewFormComponent 
                    open={openReview} 
                    control={control} 
                    setReviewOpen={setOpenReview} 
                    setMainValue={setValue} 
                    updateInfo={save}
                    review={animeUserInformation?.review} 
                />
            </div>
        </div>
    )
}

function getEpisodeArray(episodesAired: number): Array<ReactNode> {
    return Array.from(Array(episodesAired), (e,i)=>i)
    .map((option: number) => (
        <MenuItem key={option} value={option}>
            {option}
        </MenuItem>
    ))
}
