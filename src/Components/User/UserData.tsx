import _ from "lodash";
import { AnimeUserInformation } from "../../data/Anime/Smaller/AnimeUserInformation";
import useBasicState from "../../data/General/BasicState";
import { Achievement } from "../../data/General/User/Achievement";
import { CompleteUser } from "../../data/General/User/User";
import AchievementComponent from "../Achievement/AchievementComponent";
import ReviewComponent from "../Anime/AnimePageElements/ReviewComponent";

import "./css/UserData.css";

/**
 * The props for the {@link UserData} component.
 */
export interface UserDataProps {
    /** The user for whom the data should be rendered. */
    user: CompleteUser;
}

/**
 * Component used to show more complicated data of the user.
 * @param props {@link UserDataProps}
 */
export default function UserData(props: UserDataProps) {
    const { user } = props;
    const { t } = useBasicState();

    return (
        <div className="UserData">
            {/*Reviews*/}
            <div className="line">
                <p>{t("user.reviews")}</p>

                <div className="Reviews">
                    {
                        _.sampleSize(user.animeUserInfos.filter((value: AnimeUserInformation) => value.didReview), 3)
                        .map((value: AnimeUserInformation, index) => (
                            <ReviewComponent review={value.review!} key={index} />
                        ))
                    }
                </div>
            </div>

            {/*Achievemnts*/}
            <div className="line">
                <p>{t("user.achievemnts")}</p>

                <div className="Achievemnts">
                    {
                        _.sampleSize(user.achievements, 3)
                        .map((value: Achievement, index) => (
                            <AchievementComponent achievement={value} key={index} small={true} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}