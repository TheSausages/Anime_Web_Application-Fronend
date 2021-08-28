import styled from "@emotion/styled";
import { Button } from "@material-ui/core";

interface ButtonColloredProps {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset" | undefined;
}

const ReviewButton = styled(Button)({
    backgroundColor: 'rgb(34, 206, 43)',
    background: 'rgb(34, 206, 43)',
    '&:hover': {
        backgroundColor: 'rgb(56, 133, 49)',
        borderColor: 'rgb(56, 133, 49)',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: 'rgb(47, 100, 42)',
        borderColor: 'rgb(47, 100, 42)',
    },
});

export default function ButtonCollored(props: ButtonColloredProps) {
    return (
        <ReviewButton variant="contained"
            onClick={props.onClick}
            type={props.type}
            disabled={props.disabled}
        >
            {props.text}
        </ReviewButton>
    )
}