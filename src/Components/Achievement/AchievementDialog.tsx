import { Dialog, DialogContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react"
import { Achievement } from "../../data/General/User/Achievement";
import { MiscellaneousProperties } from "../../Properties/MiscellaneousProperties";

interface AchievementProps {
    achievement: Achievement;
}

const useStyles = makeStyles((theme) => ({
    dialogContentAchievement: {
        display: "flex",
        flexDirection: "column",
        paddingBottom: 20,
        alignItems: 'center',
        backgroundColor: 'transparent',
        '@media (max-width: 960px)': {
            width: '85%',
        },
    },
    icon: {
        maxWidth: 250,
    },
}))

export default function AchievementDialog(props: AchievementProps) {
    const [ open, setOpen ] = useState<boolean>(false)
    const { achievement } = props;
    const classes = useStyles();

    useEffect(() => {
        setOpen(true)

        setTimeout(() => setOpen(false), MiscellaneousProperties.achievementDialogCloseInSeconds * 1000)
    }, [])

    return (
        <Dialog open={open}
            onClose={() => setOpen(false)}
            fullWidth 
            maxWidth="xs"
        >
            <DialogContent className={classes.dialogContentAchievement}>
                <img src={`data:image/png;base64,${achievement.achievementIcon}`} alt="Achievement Icon" className={classes.icon} />

                <div>{achievement.name}</div>

                <div>{achievement.description}</div>
            </DialogContent>
        </Dialog>
    )
}