import { MenuItem, Select, InputLabel, FormControl, makeStyles } from "@material-ui/core"
import { ChangeEvent, ReactNode } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { AnimeUserInformation } from "../../../data/Anime/Smaller/AnimeUserInformation";
import { AnimeUserStatus } from "../../../data/Anime/Smaller/Enums";
import { UserService } from "../../../Scripts/Services/UserService";
import { getRandomColor, valueOrNotKnown } from "../../../Scripts/Utilities";

import "../css/UserAnimeInformation.css"

const color = getRandomColor(true);
const useStyles = makeStyles({
    inputSpace: {
        paddingBottom: 15,
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

interface SocialButtonsProps {
    airedEpisodes: number;
    animeUserInformation: AnimeUserInformation;
}

export default function SocialButtons(props: SocialButtonsProps) {
    const { airedEpisodes, animeUserInformation } = props;
    const [animeUserInformationData, setAnimeUserInformationData] = useState<AnimeUserInformation>(
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
    )
    const classes = useStyles();

    const save = useCallback(() => {
        UserService.updateAnimeUserInformationData(animeUserInformationData)
    }, [animeUserInformationData])

    useEffect(() => {
        window.addEventListener('beforeunload', save);

        return (() => {
            window.removeEventListener('beforeunload', save);
            save();
        })
    }, [save])

    function handleAnimeUserInformationDataChange(event: ChangeEvent<{ value: unknown; }>, field: keyof AnimeUserInformation) {
        setAnimeUserInformationData({...animeUserInformationData, [field]: event.target.value})
    }

    return (
        localStorage.getItem('accessToken') ? 
        <div className="reactionButtons">
            <FormControl>
                {
                    <div className={classes.inputSpace}>
                        <InputLabel id="episodesSeenLabel" className={classes.label}>
                            Episodes Seen
                        </InputLabel>
                        <Select 
                            className={classes.select}
                            inputProps={{classes: {icon: classes.icon}}}
                            onChange={e => handleAnimeUserInformationDataChange(e, 'nrOfEpisodesSeen')}
                            labelId="episodesSeenLabel"
                            defaultValue={animeUserInformation.nrOfEpisodesSeen}
                        >
                            {
                                getEpisodeArray(airedEpisodes)
                            }
                        </Select>
                    </div>
                }
            </FormControl>

            <FormControl>
                <div className={classes.inputSpace}>
                        <InputLabel id="StatusLabel" className={classes.label}>
                            Your Status
                        </InputLabel>
                        <Select 
                            className={classes.select}
                            inputProps={{classes: {icon: classes.icon}}}
                            onChange={e => handleAnimeUserInformationDataChange(e, 'status')}
                            labelId="StatusLabel"
                            defaultValue={animeUserInformation.status}
                        >
                            {
                                Object.values(AnimeUserStatus).slice(0, 5).map(status => (
                                    <MenuItem key={status} value={status}>
                                        {valueOrNotKnown(status)}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </div>
            </FormControl>
        </div> 

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