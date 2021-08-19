import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";

interface ReviewProps {
    open: boolean;
    setReviewOpen: (value: boolean) => void
}

export function ReviewComponent(props: ReviewProps) {
    return (
        <Dialog open={props.open}>
            <DialogTitle>You Review</DialogTitle>
            <DialogActions>
                <Button onClick={_ => props.setReviewOpen(false)}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}