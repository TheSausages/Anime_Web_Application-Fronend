import { TextField } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { FieldError } from "react-hook-form";

interface TextFieldColoredProps {
    field: Object;
    errors: FieldError | undefined;
    label: string;
    type?: string;
    className?: string;
    rows?: number;
    multiline?: boolean;
}

const TextFieldColoredStyled = styled(TextField)({
    '& .MuiInputLabel-root.Mui-focused': {
        color: 'rgb(36, 185, 44)',
    },
    "& .MuiInputBase-root:before": {
        borderBottom: 'none',
    },
    "& .MuiInputBase-root:after": {
        borderBottom: `2px solid rgb(36, 185, 44)`,
        "& .Mui-error": {
            borderBottom: '#d32f2f',
        },
    },
    "& .MuiInputBase-input:before": {
        borderBottom: 'none',
    },
    "& .MuiInputBase-input": {
        borderBottom: `2px solid rgb(36, 185, 44)`,
        "& .Mui-error": {
            borderBottom: '#d32f2f',
        },
    },
    "& .MuiInputBase-input:after": {
        borderBottom: `2px solid rgb(36, 185, 44)`,
        "& .Mui-error": {
            borderBottom: '#d32f2f',
        },
    },
    "& .MuiInputBase-multiline:before": {
        borderBottom: 'none',
    },
    "& .MuiInputBase-multiline": {
        padding: 0,
        "& .Mui-error": {
            borderBottom: '#d32f2f',
        },
    },
    "& .MuiInputBase-multiline:after": {
        borderBottom: `2px solid rgb(36, 185, 44)`,
        "& .Mui-error": {
            borderBottom: '#d32f2f',
        },
    },
    "& .MuiFormHelperText-root": {
        position: "absolute",
        bottom: "-20px"
    },
})

export default function TextFieldColored(props: TextFieldColoredProps) {
    return (
        <TextFieldColoredStyled className={props.className}
            {...props.field}
            autoComplete="off"
            variant="standard"
            error={props.errors !== undefined}
            helperText={props.errors?.message}
            label={props.label}
            type={props.type}
            rows={props.rows}
            multiline={props.multiline}
        />
    )
}