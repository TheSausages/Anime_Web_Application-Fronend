import { makeStyles } from "@material-ui/styles";
import { Achievement } from "../../data/General/User/Achievement";

interface AchievementProps {
    achievement: Achievement;
    key?: number;
    small?: boolean;
}

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
    console.log(small)
    const classes = useStyles(small);

    return (
        <div className={classes.achievement}>
            <img src={`data:image/png;base64,${achievement.achievementIcon}`} alt="Achievement Icon" className={classes.icon} />

            <div>{achievement.name}</div>

            <div>{achievement.description}</div>
        </div>
    )
}