import { CompleteUser } from "../../data/General/User/User";
import UserData from "./UserData";
import UserStatistics from "./UserStatistics";

import "./css/UserProfile.css"

/**
 * The props for the {@link UserProfile} component.
 */
export interface UserProfileProps {
    /** User for thich the profile shoulds be shown. */
    user: CompleteUser;
}

/**
 * Component used to show a users profile.
 * This component is accessable from {@link CurrentUserProfile} and {@link ExternalUserProfile}
 * @param props {@link UserProfileProps}
 * @see {@link UserStatistics}
 * @see {@link UserData}
 */
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