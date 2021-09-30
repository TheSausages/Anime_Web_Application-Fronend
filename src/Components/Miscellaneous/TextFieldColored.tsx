import { TextField } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { FieldError } from "react-hook-form";

interface TextFieldColoredProps {
    field: Object;
    errors?: FieldError;
    label: string;
    type?: string;
    className?: string;
    rows?: number;
    multiline?: boolean;
    color?: string;
}


export default function TextFieldColored(props: TextFieldColoredProps) {
    let color = props.color ?? "rgb(36, 185, 44)";

    const TextFieldColoredStyled = styled(TextField)({
        '& .MuiInputLabel-root.Mui-focused': {
            color: color,
        },
        "& .MuiInputBase-root:before": {
            borderBottom: 'none',
        },
        "& .MuiInputBase-root:after": {
            borderBottom: `2px solid ${color}`,
            "& .Mui-error": {
                borderBottom: '#d32f2f',
            },
        },
        "& .MuiInputBase-input:before": {
            borderBottom: 'none',
        },
        "& .MuiInputBase-input": {
            borderBottom: `2px solid ${color}`,
            "& .Mui-error": {
                borderBottom: '#d32f2f',
            },
        },
        "& .MuiInputBase-input:after": {
            borderBottom: `2px solid ${color}`,
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
            borderBottom: `2px solid ${color}`,
            "& .Mui-error": {
                borderBottom: '#d32f2f',
            },
        },
        "& .MuiFormHelperText-root": {
            position: "absolute",
            bottom: "-20px"
        },
    })

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