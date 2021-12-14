import styled from "@emotion/styled";
import { Button } from "@material-ui/core";

/**
 * The props for the {@link ButtonCollored} component.
 */
export interface ButtonColloredProps {
    /** What text should appear on the button. */
    text: string;

    /** What should happen when the button is clicked. */
    onClick?: () => void;

    /** Should the button be disabled. */
    disabled?: boolean;

    /** What is the type of the button. */
    type?: "button" | "submit" | "reset" | undefined;

    /** What color should the button be? */
    color?: string;
}

const CustomButton = styled(Button)({
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

/**
 * A customised button component.
 * The default color for the button is rgb(36, 185, 44) - light green.
 * @param props {@link ButtonColloredProps}
 */
export default function ButtonCollored(props: ButtonColloredProps) {
    let color = props.color ?? "rgb(36, 185, 44)";

    return (
        <CustomButton variant="contained"
            onClick={props.onClick}
            type={props.type}
            disabled={props.disabled}
            style={{'--color': color} as React.CSSProperties}
        >
            {props.text}
        </CustomButton>
    )
}