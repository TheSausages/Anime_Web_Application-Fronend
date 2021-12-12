import { TextField } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import React, { ChangeEventHandler } from "react";
import { Control, Controller, FieldError } from "react-hook-form";

interface TextFieldColoredProps {
    errors?: FieldError;
    label: string;
    type?: string;
    className?: string;
    rows?: number;
    multiline?: boolean;
    color?: string;
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    formControlName: string;
    control: Control<any> | undefined;
    formKey?: string;
}

const TextFieldColoredStyled = styled(TextField)({
    '& .MuiInputLabel-root.Mui-focused': {
        color: `var(--color)`,
    },
    "& .MuiInputBase-root:before": {
        borderBottom: 'none',
    },
    "& .MuiInputBase-root:after": {
        borderBottom: `2px solid var(--color)`,
        "& .Mui-error": {
            borderBottom: '#d32f2f',
        },
    },
    "& .MuiInputBase-input:before": {
        borderBottom: 'none',
    },
    "& .MuiInputBase-input": {
        borderBottom: `2px solid var(--color)`,
        "& .Mui-error": {
            color: '#d32f2f',
            borderBottom: '#d32f2f',
        },
    },
    "& .MuiInputBase-input:after": {
        borderBottom: `2px solid var(--color)`,
        "& .Mui-error": {
            color: '#d32f2f',
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
        borderBottom: `2px solid var(--color)`,
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
    let color = props.color ?? "rgb(36, 185, 44)";

    return (
        <Controller render={({field}) => (
            <TextFieldColoredStyled className={props.className}
                {...field}
                autoComplete="off"
                variant="standard"
                error={props.errors !== undefined}
                helperText={props.errors?.message}
                label={props.label}
                type={props.type}
                rows={props.rows}
                multiline={props.multiline}
                key={props.label}
                maxRows={props.rows === undefined ? 5 : undefined}
                style={{'--color': color} as React.CSSProperties}
            />
        )}
            name={props.formControlName}
            control={props.control}
            key={props.formKey}
        />
    )
}