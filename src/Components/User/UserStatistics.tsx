import { TFunction } from "i18next";
import useBasicState from "../../data/General/BasicState";
import { CompleteUser } from "../../data/General/User/User";
import { getRandomColor } from "../../Scripts/Utilities";

import "./css/UserStatistics.css"

/**
 * The props for the {@link UserStatistics} component.
 */
export interface UserStatisticsProps {
    /**
     * The user for whom the Statistics should be shown.
     */
    user: CompleteUser;
}

/**
 * Elements that should be shown as the statistics. Created using {@link createUserStatisticsInformation}.
 */
export interface UserStatisticInformationArrayElement {
    name: string;
    value: string | number;
}

/**
 * Component used to show basic information about a user.
 * @param props {@link UserStatisticsProps}
 */
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

/**
 * Method used to create the array of basic information on the user.
 * @param user The user for whom the information will be shown.
 * @param t The translation functions.
 * @returns Array of basic information on a user.
 */
export function createUserStatisticsInformation(user: CompleteUser, t: TFunction): Array<UserStatisticInformationArrayElement> {
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