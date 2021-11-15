import { Dialog, DialogContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react"
import { Achievement } from "../../data/General/User/Achievement";
import { MiscellaneousProperties } from "../../Properties/MiscellaneousProperties";
import AchievementComponent from "./AchievementComponent";

interface AchievementDialogProps {
    achievement: Achievement;
}

export default function AchievementDialog(props: AchievementDialogProps) {
    const [ open, setOpen ] = useState<boolean>(false)

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
            <DialogContent>
                <AchievementComponent achievement={props.achievement} />
            </DialogContent>
        </Dialog>
    )
}