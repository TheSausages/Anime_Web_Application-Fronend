import { makeStyles } from "@material-ui/styles";
import { Achievement } from "../../data/General/User/Achievement";

/**
 * The props for the {@link AchievementComponent} component.
 */
export interface AchievementProps {
    /** The achievement to be displayed. */
    achievement: Achievement;

    /** The optional key when the component is used in a list. */
    key?: number;

    /** Should the compontent be 'small' (smaller icon and text). */
    small?: boolean;
}

/**
 * Component for displaying an Achievement. 
 * The component has 2 sizes: normal and small (controlled with {@link AchievementProps.small})
 */
export default function AchievementComponent(props: AchievementProps) {
    const { achievement, small } = props;

    const useStyles = makeStyles((theme) => ({
        achievement: {
            display: "flex",
            flexDirection: "column",
            paddingBottom: 20,
            alignItems: 'center',
            fontSize: small => small ? "0.9rem" : "1rem",
            backgroundColor: 'transparent',
            '@media (max-width: 960px)': {
                width: '85%',
            },
        },
        icon: {
            maxWidth: small => small === true ? 150 : 250,
        },
    }))

    const classes = useStyles(small);

    return (
        <div className={classes.achievement}>
            <img src={`data:image/png;base64,${achievement.achievementIcon}`} alt="Achievement Icon" className={classes.icon} />

            <div>{achievement.name}</div>

            <div>{achievement.description}</div>
        </div>
    )
}