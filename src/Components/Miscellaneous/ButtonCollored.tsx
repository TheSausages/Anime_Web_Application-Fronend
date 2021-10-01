import styled from "@emotion/styled";
import { Button } from "@material-ui/core";

interface ButtonColloredProps {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset" | undefined;
    color?: string;
}

const ReviewButton = styled(Button)({
    background: `var(--color)`,
    color: 'white',
    '&:hover': {
        backgroundColor: `var(--color)`,
        borderColor: `var(--color)`,
        color: 'white',
        filter: 'brightness(92%)',
    },
    '&:active': {
        backgroundColor: `var(--color)`,
        borderColor: `var(--color)`,
        color: 'white',
        filter: 'brightness(90%)',
    },
});

export default function ButtonCollored(props: ButtonColloredProps) {
    let color = props.color ?? "rgb(36, 185, 44)";

    return (
        <ReviewButton variant="contained"
            onClick={props.onClick}
            type={props.type}
            disabled={props.disabled}

            style={{'--color': color} as React.CSSProperties}
        >
            {props.text}
        </ReviewButton>
    )
}