import { TFunction } from "i18next";
import useBasicState from "../../data/General/BasicState";
import { CompleteUser } from "../../data/General/User/User";
import { getRandomColor } from "../../Scripts/Utilities";

import "./css/UserStatistics.css"

interface UserStatisticsProps {
    user: CompleteUser;
}

interface UserStatisticInformationArrayElement {
    name: string;
    value: string | number;
}

export default function UserStatistics(props: UserStatisticsProps) {
    const { t } = useBasicState();

    return (
        <div>
            {
                createUserStatisticsInformation(props.user, t).map((elem: UserStatisticInformationArrayElement, index) => (
                    <div key={index} className="UserStatisticInformationArrayElement">
                        <div className='line' style={{ 'borderBottom': '1px solid ' + getRandomColor(true)}} id="noMargin"><p>{elem.name}</p></div>
                        <div>{elem.value}</div>
                    </div>
                ))
            }
        </div>
    )
}

function createUserStatisticsInformation(user: CompleteUser, t: TFunction): Array<UserStatisticInformationArrayElement> {
    return [
        {
            name: t("user.userStatistics.watchTime"),
            value: user.watchTime
        },
        {
            name: t("user.userStatistics.achievementPoints"),
            value: user.achievementPoints
        },
        {
            name: t("user.userStatistics.nrOfPosts"),
            value: user.nrOfPosts
        },
        {
            name: t("user.userStatistics.nrOfThreads"),
            value: user.threads ? user.threads.length : 0
        }
    ]
}