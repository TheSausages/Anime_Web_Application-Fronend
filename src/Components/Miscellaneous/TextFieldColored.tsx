import { TextField } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { FieldError } from "react-hook-form";

interface TextFieldColoredProps {
    field: Object;
    errors: FieldError | undefined;
    label: string;
    type?: string;
}

const TextFieldColoredStyled = styled(TextField)({
    width: '80%',
    "& .css-1480iag-MuiInputBase-root-MuiInput-root:before": {
        borderBottom: 'none',
    },
    "& .MuiInput-input": {
        borderBottom: `2px solid rgb(36, 185, 44)`,
    },
    "& .css-1480iag-MuiInputBase-root-MuiInput-root:after": {
        borderBottom: `2px solid green`,
    },
    "& .MuiFormHelperText-root": {
        position: "absolute",
        bottom: "-20px"
    }
})

export default function TextFieldColored(props: TextFieldColoredProps) {
    return (
        <TextFieldColoredStyled
            {...props.field}
            autoComplete="off"
            variant="standard"
            error={props.errors !== undefined}
            helperText={props.errors?.message}
            label={props.label}
            type={props.type}
        />
    )
}