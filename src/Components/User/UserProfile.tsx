import { CompleteUser } from "../../data/General/User/User";

import "./css/UserProfile.css"
import UserData from "./UserData";
import UserStatistics from "./UserStatistics";

interface UserProfileProps {
    user: CompleteUser;
}

export default function UserProfile(props: UserProfileProps) {
    return (
        <div id="MainUserProfileContainer">
            <div className='line Username'>
                <p>{props.user.username}</p>
            </div>

            <div className="UserStatistics">
                <UserStatistics user={props.user} />
            </div>

            <div className="UserData">
                <UserData user={props.user} />
            </div>
        </div>
    )
}