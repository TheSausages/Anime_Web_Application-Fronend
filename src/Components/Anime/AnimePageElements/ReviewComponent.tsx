import { Review } from "../../../data/Anime/Smaller/AnimeUserInformation";
import { IconWithNumber } from "../../Miscellaneous/IconWithNumber";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { getRandomColor } from "../../../Scripts/Utilities";
import ExpandingField from "../../Miscellaneous/ExpandingField";

import "../css/ReviewComponent.css";

interface ReviewProps {
    review: Review;
    key: number;
}

const color = getRandomColor(true);
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