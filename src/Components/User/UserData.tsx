import _ from "lodash";
import { AnimeUserInformation } from "../../data/Anime/Smaller/AnimeUserInformation";
import { CompleteUser } from "../../data/General/User/User";
import ReviewComponent from "../Anime/AnimePageElements/ReviewComponent";

interface UserDataProps {
    user: CompleteUser;
}

export default function UserData(props: UserDataProps) {
    const { user } = props;

    return (
        <div>
            {/*Reviews*/}
            <div className="line">
                {
                    _.sampleSize(user.animeUserInfos.filter((value: AnimeUserInformation) => value.didReview), 3)
                    .map((value: AnimeUserInformation, index) => (
                        <ReviewComponent review={value.review!} key={index} />
                    ))
                }
            </div>
        </div>
    )
}