import { Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import { useState } from "react";
import ButtonCollored from "../../Miscellaneous/ButtonCollored";

interface NewPostComponentProps {}

export default function NewPostComponent() {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="newPostButton">
            <ButtonCollored text="new Post" onClick={() => setOpen(true)} />
                
            <Dialog open={open} fullWidth maxWidth="lg">
                <DialogTitle>
                    New Post
                </DialogTitle>

                <DialogActions>
                    <ButtonCollored onClick={() => setOpen(false)} text="Close" />
                </DialogActions>
            </Dialog>
        </div>
    )
}