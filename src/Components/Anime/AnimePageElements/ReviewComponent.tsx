import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { Control, Controller, useForm, UseFormSetValue } from "react-hook-form";
import { AnimeUserInformation, Review, ReviewForm } from "../../../data/Anime/Smaller/AnimeUserInformation";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles } from "@material-ui/styles";
import { getRandomColor } from "../../../Scripts/Utilities";
import { IconWithNumber } from "../../Miscellaneous/IconWithNumber";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ButtonCollored from "../../Miscellaneous/ButtonCollored";

const color = getRandomColor(true);
const useStyles = makeStyles((theme) => ({
    dialogContent: {
        display: "flex",
        flexDirection: "column",
        rowGap: 15,
        width: '95%',
        paddingBottom: 0,
    },
    paddingTop: {
        paddingTop: 1,
    },
    inputSpace: {
        "& .MuiOutlinedInput-notchedOutline": {
            borderTop: 'none',
            borderRight: 'none',
            borderLeft: 'none',
            borderBottom: `1px solid ${color}`,
            borderRadius: 0,
        },
    },
    reviewNumbers: {
        display: 'flex',
        "& *": {
            paddingInline: 5,
        }
    }
}));

interface ReviewProps {
    open: boolean;
    control: Control<AnimeUserInformation>;
    setReviewOpen: (value: boolean) => void;
    setMainValue: UseFormSetValue<AnimeUserInformation>;
    review: Review | undefined;
}

const setValueOptions = { shouldDirty: true, shouldTouch: true, shouldValidate: true }

const schema = yup.object().shape({
    reviewTitle: yup.string().required(),
    reviewText: yup.string().required(),
})

export function ReviewComponent(props: ReviewProps) {
    const classes = useStyles();

    const { control, handleSubmit, setValue } = useForm<ReviewForm>({
        resolver: yupResolver(schema),
        mode: "all",
        defaultValues: {
            reviewTitle:  props.review?.reviewTitle ?? '',
            reviewText: props.review?.reviewText ?? ''
        }
    })

    function setReview(data: ReviewForm) {
        props.setMainValue('review', { ...props.review, reviewTitle: data.reviewTitle, reviewText: data.reviewText }, setValueOptions)
        props.setMainValue('didReview', true, setValueOptions)
    }

    return (
            <Dialog open={props.open} fullWidth maxWidth="lg">
                <form onSubmit={handleSubmit(setReview)}>
                    <DialogTitle>You Review</DialogTitle>
            
                    <DialogContent className={classes.dialogContent}>
                        <div className={classes.paddingTop} />

                        <Controller render={({field}) => (
                            <TextField
                                {...field}
                                onChange={data => setValue('reviewTitle', data.target.value, setValueOptions)}
                                label="Review Title"
                                autoFocus 
                                className={classes.inputSpace}
                            />
                        )}
                        name="reviewTitle"
                        control={control}
                        />

                        <Controller render={({field}) => (
                            <TextField
                                {...field}
                                onChange={data => setValue('reviewText', data.target.value, setValueOptions)}
                                label="Review Text"
                                multiline={true}
                                rows={8}
                                className={classes.inputSpace}
                            />
                        )}
                        name="reviewText"
                        control={control}
                        />

                        <div className={classes.reviewNumbers}>
                            <IconWithNumber numberToShow={props.review?.nrOfPlus ?? 0} iconToShow={<ThumbUpIcon htmlColor={color} />}/>
                            <IconWithNumber numberToShow={props.review?.nrOfMinus ?? 0} iconToShow={<ThumbDownIcon htmlColor={color} />}/>
                            <IconWithNumber numberToShow={props.review?.nrOfHelpful ?? 0} iconToShow={<FavoriteIcon htmlColor={color} />}/>
                        </div>
                    </DialogContent>

                    <DialogActions>
                        <ButtonCollored onClick={() => props.setReviewOpen(false)} text="Close" />
                        <ButtonCollored type="submit" onClick={() => props.setReviewOpen(false)} text="Submit" />
                    </DialogActions>    
                </form>
            </Dialog>
    );
}