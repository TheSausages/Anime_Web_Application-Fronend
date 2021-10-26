import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, Chip, styled, TextField } from "@mui/material";
import React, { SyntheticEvent } from "react";
import { ControllerRenderProps, FieldError, FieldPath, FieldValues } from "react-hook-form";
import { Tag } from "../../data/Forum/Tag";
import AddIcon from '@material-ui/icons/Add';
import { useTranslation } from "react-i18next";

interface TagInputProps {
    availableTags: Tag[];
    field: ControllerRenderProps<FieldValues, FieldPath<FieldValues>>;
    className?: string;
    errors?: FieldError;
    color?: string;
    onChange: (event: SyntheticEvent<Element, Event>, value: any[], reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<any> | undefined) => void;
}

//Bacause a lot of options in renderInput, need to use normal TextField and customize it here
export default function TagInput(props: TagInputProps) {
    const { t } = useTranslation();
    let color = props.color ?? "rgb(36, 185, 44)";

    return (
        <Autocomplete multiple 
            className={props.className}
            value={props.field.value}
            onChange={props.onChange}
            options={props.availableTags}
            getOptionLabel={(option: Tag) => option.tagName}
            popupIcon={<AddIcon htmlColor={color} />}
            isOptionEqualToValue={
                (option, value) => option.tagId === value.tagId &&
                                option.tagColor === value.tagColor &&
                                option.tagImportance === value.tagImportance &&
                                option.tagName === value.tagName
            }
            renderTags={(tagValue, getTagProps) =>
                tagValue.map((tag: Tag, index) => (
                    <Chip
                        label={tag.tagName}
                        {...getTagProps({ index })}
                    />
                ))
            }
            renderInput={(params) => (
                <TextFieldStyled {...params} label={t("forum.thread.generalThread.tagsTitle")} variant="standard" style={{'--color': color} as React.CSSProperties}
                    error={props.errors !== undefined} helperText={props.errors?.message} />
            )}
        />
    )
}

const TextFieldStyled = styled(TextField)({
    '& .MuiInputLabel-root.Mui-focused': {
        color: `var(--color)`,
    },
    "& .MuiInputBase-root:before": {
        borderBottom: `2px solid var(--color)`,
        "& .Mui-error": {
            borderBottom: '#d32f2f',
        },
    },
    "& .MuiInputBase-root:after": {
        borderBottom: `2px solid var(--color)`,
        "& .Mui-error": {
            borderBottom: '#d32f2f',
        },
    },
    "& .MuiInputBase-input:before": {
        borderBottom: `2px solid var(--color)`,
    },
    "& .MuiInputBase-input": {
        borderBottom: 'none',
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
    "& .MuiFormHelperText-root": {
        position: "absolute",
        bottom: "-20px"
    },
})