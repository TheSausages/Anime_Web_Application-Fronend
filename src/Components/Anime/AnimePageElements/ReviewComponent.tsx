import { Review } from "../../../data/Anime/Smaller/AnimeUserInformation";
import { IconWithNumber } from "../../Miscellaneous/IconWithNumber";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { getRandomColor } from "../../../Scripts/Utilities";
import ExpandingField from "../../Miscellaneous/ExpandingField";

import "../css/ReviewComponent.css";

/**
 * The props for the {@link ReviewComponent} component.
 */
export interface ReviewProps {
    /** The displayed review. */
    review: Review;

    /** Key used when component is part of a list. */
    key: number;
}

const color = getRandomColor(true);

/**
 * Component for displaying information on a review.
 * @returns 
 */
export default function ReviewComponent(props: ReviewProps) {
    const { review } = props;

    return (
        <div className="Review" style={{ 'border': '1px solid ' + getRandomColor() }}>
            <div className="line">
                <p>{review.reviewTitle}</p>
            </div>

            <ExpandingField maxRown={2} text={review.reviewText} />

            <div className="ReviewNumbers">
                <IconWithNumber numberToShow={review?.nrOfPlus ?? 0} iconToShow={<ThumbUpIcon htmlColor={color} />}/>
                <IconWithNumber numberToShow={review?.nrOfMinus ?? 0} iconToShow={<ThumbDownIcon htmlColor={color} />}/>
                <IconWithNumber numberToShow={review?.nrOfHelpful ?? 0} iconToShow={<FavoriteIcon htmlColor={color} />}/>
            </div>
        </div>
    )
}