import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, Chip, styled, TextField } from "@mui/material";
import { SyntheticEvent } from "react";
import { ControllerRenderProps, FieldError, FieldPath, FieldValues } from "react-hook-form";
import { Tag } from "../../data/Forum/Tag";
import AddIcon from '@material-ui/icons/Add';

interface TagInputProps {
    availableTags: Tag[];
    field: ControllerRenderProps<FieldValues, FieldPath<FieldValues>>;
    className?: string;
    errors?: FieldError;
    onChange: (event: SyntheticEvent<Element, Event>, value: any[], reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<any> | undefined) => void;
}

//Bacause a lot of options in renderInput, need to use normal TextField and customize it here
export default function TagInput(props: TagInputProps) {


    return (
        <Autocomplete multiple 
            value={props.field.value}
            onChange={props.onChange}
            options={props.availableTags}
            getOptionLabel={(option: Tag) => option.tagName}
            popupIcon={<AddIcon htmlColor="rgb(36, 185, 44)" />}
            renderTags={(tagValue, getTagProps) =>
                tagValue.map((tag: Tag, index) => (
                    <Chip
                        label={tag.tagName}
                        {...getTagProps({ index })}
                    />
                ))
            }
            renderInput={(params) => (
                <TextFieldStyled {...params} label="Tags" variant="standard" 
                    error={props.errors !== undefined} helperText={props.errors?.message} />
            )}
        />
    )
}

const TextFieldStyled = styled(TextField)({
    '& .MuiInputLabel-root.Mui-focused': {
        color: 'rgb(36, 185, 44)',
    },
    "& .MuiInputBase-root:before": {
        borderBottom: `2px solid rgb(36, 185, 44)`,
        "& .Mui-error": {
            borderBottom: '#d32f2f',
        },
    },
    "& .MuiInputBase-root:after": {
        borderBottom: '2px solid rgb(36, 185, 44)',
        "& .Mui-error": {
            borderBottom: '#d32f2f',
        },
    },
    "& .MuiInputBase-input:before": {
        borderBottom: '2px solid rgb(36, 185, 44)',
    },
    "& .MuiInputBase-input": {
        borderBottom: 'none',
        "& .Mui-error": {
            color: '#d32f2f',
            borderBottom: '#d32f2f',
        },
    },
    "& .MuiInputBase-input:after": {
        borderBottom: `2px solid rgb(36, 185, 44)`,
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