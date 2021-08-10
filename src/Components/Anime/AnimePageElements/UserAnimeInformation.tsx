import { MenuItem, Select, InputLabel, FormControl, makeStyles } from "@material-ui/core"
import { ReactNode } from "react";
import { useEffect } from "react";
import { AnimeUserInformation, Grade, Grades } from "../../../data/Anime/Smaller/AnimeUserInformation";
import { AnimeUserStatus } from "../../../data/Anime/Smaller/Enums";
import { UserService } from "../../../Scripts/Services/UserService";
import { getRandomColor, valueOrNotKnown } from "../../../Scripts/Utilities";
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { FuzzyDate } from "../../../data/Anime/Smaller/FuzzyDate";
import { Controller, useForm } from "react-hook-form";

import "../css/UserAnimeInformation.css"
import { useCallback } from "react";

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
        status: yup.mixed<AnimeUserStatus | string>().oneOf(Object.values(AnimeUserStatus).slice(0, 5)).notRequired().default(animeUserInformation?.status ?? AnimeUserStatus.NO_STATUS),
        watchStartDate: yup.date().nullable(true).notRequired().default(animeUserInformation?.watchStartDate ?? new Date()),
        watchEndDate: yup.date().nullable(true).notRequired().default(animeUserInformation?.watchEndDate ?? new Date()),
        nrOfEpisodesSeen: yup.number().integer().min(0, "Must be positive").default(animeUserInformation?.nrOfEpisodesSeen ?? 0),
        isFavourite: yup.boolean().default(animeUserInformation?.isFavourite ?? false),
        didReview: yup.boolean().default(animeUserInformation?.isFavourite ?? false),
        review: yup.object({
            id: yup.number().integer().notRequired(),
            reviewText: yup.string(),
            nrOfHelpful: yup.number().integer(),
            nrOfPlus: yup.number().integer(),
            nrOfMinus: yup.number().integer()
        }).default(animeUserInformation?.review ?? {}),
        grade: yup.object({
            scale: yup.number().integer(),
            gradeName: yup.string()
        }).default(animeUserInformation?.grade ?? {})
    })

    /*const [animeUserInformationData, setAnimeUserInformationData] = useState<AnimeUserInformation>(
        {
            status: animeUserInformation.status,
            watchStartDate: animeUserInformation.watchStartDate,
            watchEndDate: animeUserInformation.watchEndDate,
            nrOfEpisodesSeen: animeUserInformation.nrOfEpisodesSeen,
            isFavourite: animeUserInformation.isFavourite,
            didReview: animeUserInformation.didReview,
            review: animeUserInformation.review,
            grade: animeUserInformation.grade
        }
    )*/

    const classes = useStyles();
    const { control, formState: { errors }, reset, getValues } = useForm<AnimeUserInformation>({
        resolver: yupResolver(schema),
        mode: 'all',
        defaultValues: {
            status: animeUserInformation?.status ?? AnimeUserStatus.NO_STATUS,
            watchStartDate: animeUserInformation?.watchStartDate ?? new Date(),
            watchEndDate: animeUserInformation?.watchEndDate ?? new Date(),
            nrOfEpisodesSeen: animeUserInformation?.nrOfEpisodesSeen ?? 0,
            isFavourite: animeUserInformation?.isFavourite ?? false,
            didReview: animeUserInformation?.isFavourite ?? false,
            review: animeUserInformation?.review ?? {},
            grade: animeUserInformation?.grade ?? {}
        }
    })

    const save = useCallback(() => {
        console.log(getValues())
    }, [getValues])

    useEffect(() => {
        window.addEventListener('onbeforeunload', (e: Event) => save);

        return (() => {
            save()
            window.removeEventListener('onbeforeunload', (e: Event) => save);
        })
    }, [save])

    return (
        localStorage.getItem('accessToken') ? 
        <form className="userAnimeInformation">
                <Controller  render={(props) => {
                    const { fieldState, formState, field } = props;
                    return <FormControl className={classes.inputSpace} 
                        >
                            <InputLabel id="episodesSeenLabel" className={classes.label}>
                                Episodes Seen
                            </InputLabel>
                            <Select
                                inputProps={{classes: {icon: classes.icon}, }}
                                className={classes.select}
                                labelId="episodesSeenLabel"
                                error={errors.nrOfEpisodesSeen !== undefined}
                                ref={field.ref}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                value={field.value}
                            >
                                {
                                    getEpisodeArray(airedEpisodes)
                                }
                            </Select>
                    </FormControl>
                }}
                control={control}
                name="nrOfEpisodesSeen"
                />

            {/*<FormControl>
                <div className={classes.inputSpace}>
                        <InputLabel id="StatusLabel" className={classes.label}>
                            Your Status
                        </InputLabel>
                        <Select 
                            className={classes.select}
                            inputProps={{classes: {icon: classes.icon}}}
                            //onChange={e => handleAnimeUserInformationDataChange(e, 'status')}
                            labelId="StatusLabel"
                            //defaultValue={animeUserInformation.status}
                        >
                            {
                                slice(0, half of enum) to get only enum names, not elements
                                Object.values(AnimeUserStatus).slice(0, 5).map(status => (
                                    <MenuItem key={status} value={status}>
                                        {valueOrNotKnown(status)}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                </div>
            </FormControl>*/}
        </form>

    : 
        null
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
