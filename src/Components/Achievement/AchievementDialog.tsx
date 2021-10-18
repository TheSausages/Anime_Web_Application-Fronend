import { Dialog, DialogContent } from "@material-ui/core";
import { useEffect, useState } from "react"
import { Achievement } from "../../data/General/User/Achievement";

interface AchievementProps {
    achievement: Achievement;
}


const closeDelay: number = 5;
export default function AchievementDialog(props: AchievementProps) {
    const [ open, setOpen ] = useState<boolean>(false)
    const { achievement } = props;

    useEffect(() => {
        setOpen(true)

        setTimeout(() => setOpen(false), closeDelay * 1000)
    }, [])

    return (
        <Dialog open={open}
            onClose={() => setOpen(false)}
            fullWidth 
            maxWidth="xs"
        >
            <DialogContent>
                <div>
                    <img src={`data:image/png;base64,${achievement.achievementIcon}`} alt="Achievement Icon" />
                </div>

                <div>
                    {achievement.name}
                </div>
            </DialogContent>
        </Dialog>
    )
}