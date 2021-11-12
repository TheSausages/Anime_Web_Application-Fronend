import _ from "lodash";
import { AnimeUserInformation } from "../../data/Anime/Smaller/AnimeUserInformation";
import useBasicState from "../../data/General/BasicState";
import { CompleteUser } from "../../data/General/User/User";
import ReviewComponent from "../Anime/AnimePageElements/ReviewComponent";

import "./css/UserData.css";

interface UserDataProps {
    user: CompleteUser;
}

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
        </div>
    )
}