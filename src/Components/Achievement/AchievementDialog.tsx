import { Dialog, DialogContent } from "@material-ui/core";
import { useEffect, useState } from "react"
import { Achievement } from "../../data/General/User/Achievement";
import { MiscellaneousProperties } from "../../Properties/MiscellaneousProperties";
import AchievementComponent from "./AchievementComponent";

/**
 * The props for the {@link AchievementDialog} component.
 */
export interface AchievementDialogProps {
    /** Achievement to be displayed in the dialog. */
    achievement: Achievement;
}

/**
 * Display an achievement in a Material-UI dialog (popup window).
 * The time after which it dissapears is deterninated using `achievementDialogCloseInSeconds` in {@link MiscellaneousProperties}.
 * @returns Achievement popup that will disappear after a given time.
 */
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