import { Dialog, DialogTitle, DialogActions } from "@material-ui/core";
import { useState } from "react";
import ButtonCollored from "../../Miscellaneous/ButtonCollored";

import "../css/NewThreadComponent.css"

interface NewThreadComponentProps {}

export default function NewThreadComponent(props: NewThreadComponentProps) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="newThreadButton">
            <ButtonCollored text="new Thread" onClick={() => setOpen(true)} />
                
            <Dialog open={open} fullWidth maxWidth="lg">
                <DialogTitle>
                    New Thread
                </DialogTitle>

                <DialogActions>
                    <ButtonCollored onClick={() => setOpen(false)} text="Close" />
                </DialogActions>
            </Dialog>
        </div>
    )
}