import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { Control, useForm, UseFormSetValue } from "react-hook-form";
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
import TextFieldColored from "../../Miscellaneous/TextFieldColored";
import { MiscellaneousProperties } from "../../../Properties/MiscellaneousProperties";
import { useTranslation } from "react-i18next";

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

export function ReviewComponent(props: ReviewProps) {
    const classes = useStyles();
    const { t } = useTranslation();
    const setValueOptions = MiscellaneousProperties.reactHookFormSetValueOption;

    const schema = yup.object().shape({
        reviewTitle: yup.string().required(t("fieldErrors.fieldCannotBeEmpty", { field: "Title" })),
        reviewText: yup.string().required(t("fieldErrors.fieldCannotBeEmpty", { field: "Text" })),
    })

    const { control, handleSubmit, formState: { errors, isValid } } = useForm<ReviewForm>({
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
                    <DialogTitle>{t("anime.userAnimeInformation.review.reviewDialogTitle")}</DialogTitle>
            
                    <DialogContent className={classes.dialogContent}>
                        <div className={classes.paddingTop} />

                        <TextFieldColored errors={errors.reviewTitle}
                            label={t("anime.userAnimeInformation.review.reviewTitle")}
                            key="Review Title"
                            formControlName="reviewTitle"
                            control={control}
                            formKey="reviewTitle"
                        />

                        <TextFieldColored label={t("anime.userAnimeInformation.review.reviewText")}
                            errors={undefined}
                            multiline={true}
                            rows={8}
                            key="Review Text"
                            formControlName="reviewText"
                            control={control}
                            formKey="reviewText"
                        />

                        <div className={classes.reviewNumbers}>
                            <IconWithNumber numberToShow={props.review?.nrOfPlus ?? 0} iconToShow={<ThumbUpIcon htmlColor={color} />}/>
                            <IconWithNumber numberToShow={props.review?.nrOfMinus ?? 0} iconToShow={<ThumbDownIcon htmlColor={color} />}/>
                            <IconWithNumber numberToShow={props.review?.nrOfHelpful ?? 0} iconToShow={<FavoriteIcon htmlColor={color} />}/>
                        </div>
                    </DialogContent>

                    <DialogActions>
                        <ButtonCollored onClick={() => props.setReviewOpen(false)} text={t("input.close")} />
                        <ButtonCollored type="submit" 
                            disabled={!isValid} 
                            onClick={() => props.setReviewOpen(false)} 
                            text={t("input.submit")} 
                        />
                    </DialogActions>    
                </form>
            </Dialog>
    );
}