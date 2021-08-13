import { MenuItem, Select, InputLabel, FormControl, makeStyles } from "@material-ui/core"
import { ReactNode } from "react";
import { useEffect } from "react";
import { AnimeUserInformation } from "../../../data/Anime/Smaller/AnimeUserInformation";
import { AnimeUserStatus } from "../../../data/Anime/Smaller/Enums";
import { getRandomColor } from "../../../Scripts/Utilities";
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { FuzzyDate } from "../../../data/Anime/Smaller/FuzzyDate";
import { Controller, useForm } from "react-hook-form";
import { useCallback } from "react";

import "../css/UserAnimeInformation.css"

const color = getRandomColor(true);
const useStyles = makeStyles({
    inputSpace: {
        paddingBottom: 5,
        width: '15vw',
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
});

interface UserAnimeInformationProps {
    airedEpisodes: number;
    animeUserInformation?: AnimeUserInformation;
    animeStartDate: FuzzyDate;
    animeEndDate: FuzzyDate;
}

export default function UserAnimeInformation(props: UserAnimeInformationProps) {
    const { airedEpisodes, animeUserInformation, animeStartDate, animeEndDate } = props;
    const schema = yup.object().shape({
        status: yup.mixed<AnimeUserStatus | string>().oneOf(Object.values(AnimeUserStatus).slice(0, 5)).notRequired(),
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
        grade: yup.object({
            scale: yup.number().integer(),
            gradeName: yup.string()
        }).notRequired()
    })

    const classes = useStyles();
    const { control, formState: { errors, isDirty },setValue, getValues } = useForm<AnimeUserInformation>({
        resolver: yupResolver(schema),
        mode: 'all',
        defaultValues: {
            status: animeUserInformation?.status ?? AnimeUserStatus.NO_STATUS,
            watchStartDate: animeUserInformation?.watchStartDate ?? undefined,
            watchEndDate: animeUserInformation?.watchEndDate ?? undefined,
            nrOfEpisodesSeen: animeUserInformation?.nrOfEpisodesSeen ?? 0,
            isFavourite: animeUserInformation?.isFavourite ?? false,
            didReview: animeUserInformation?.didReview ?? false,
            review: animeUserInformation?.review ?? {},
            grade: animeUserInformation?.grade ?? {}
        }
    })

    const save = useCallback(() => {
        if (isDirty) console.log(getValues())
    }, [getValues, isDirty])

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
                    <InputLabel id="episodesSeenLabel" className={classes.label}>
                        Episodes Seen
                    </InputLabel>
                    <Controller  render={({ field }) => {
                        return <Select
                            {...field}
                            inputProps={{
                                classes: { icon: classes.icon
                                }
                            }}
                            onChange={data => setValue('nrOfEpisodesSeen', data.target.value as number, setValueOptions)}
                            className={classes.select}
                            labelId="episodesSeenLabel"
                            error={errors.nrOfEpisodesSeen !== undefined}
                        >
                            {
                                getEpisodeArray(airedEpisodes)
                            }
                    </Select>
                    }} 
                    control={control}
                    name="nrOfEpisodesSeen"
                    />
                </FormControl>

                {/*{
                                slice(0, half of enum) to get only enum names, not elements
                                Object.values(AnimeUserStatus).slice(0, 5).map(status => (
                                    <MenuItem key={status} value={status}>
                                        {valueOrNotKnown(status)}
                                    </MenuItem>
                                ))
                            }*/}
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
