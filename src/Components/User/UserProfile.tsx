import { CompleteUser } from "../../data/General/User/User";

interface UserProfileProps {
    user: CompleteUser;
}

export default function UserProfile(props: UserProfileProps) {
    return (
        <div>
            {props.user.username}
        </div>
    )
}