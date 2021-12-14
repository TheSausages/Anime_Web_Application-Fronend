import { TextField } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import React, { ChangeEventHandler } from "react";
import { Control, Controller, FieldError } from "react-hook-form";

/**
 * The props for the {@link TextFieldColored} component.
 */
export interface TextFieldColoredProps {
    /** The react-hook-form errors of the component. */
    errors?: FieldError;

    /** The label of the picker. */
    label: string;

    /** What type of text field should this be? */
    type?: string;

    /** what should the text field component className (html class) be? */
    className?: string;

    /** How many rows should the text field have. */
    rows?: number;

    /** Should the text field have multiple lines? */
    multiline?: boolean;

    /** The react-hook-form control object. */
    color?: string;

    /** What should happen when the value changes. */
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    /** What should be the react-hook-form name of the controller. */
    formControlName: string;

    /** The react-hook-form control object. */
    control?: Control<any>;

    /** The key of the controller. */
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

/**
 * A customized text field input. The controller is already used - dont use it yourself!
 * The default color of the component is rgb(36, 185, 44) - light green. 
 * @param props {@link TextFieldColoredProps}
 */
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