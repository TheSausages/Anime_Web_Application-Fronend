import { Select, SelectChangeEvent } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ReactNode } from "react";
import { ControllerRenderProps, FieldError, FieldPath, FieldValues } from "react-hook-form";

interface SelectColloredProps {
    field: ControllerRenderProps<FieldValues, FieldPath<FieldValues>>;
    labelId: string;
    className?: string;
    onChange: (event: SelectChangeEvent<any>, child: ReactNode) => void;
    color?: string;
    errors?: FieldError;
    options: ReactNode[];
}

export default function SelectCollored(props: SelectColloredProps) {
    let color = props.color ?? "rgb(36, 185, 44)";

    const useStyles = makeStyles({
        select: {
            width: '100%',
             '&:before': {
                borderColor: color,
            },
            '&:after': {
                borderColor: color,
            },
            '&:focus': {
                borderColor: color,
            },
            '&:hover:not(.Mui-disabled):before': {
                borderColor: color,
            },
            '& .MuiSvgIcon-root.MuiSelect-icon.MuiSelect-iconOutline': {
                color: color,
            },
            '& .MuiSvgIcon-root.MuiSelect-icon.MuiSelect-iconOutlined': {
                color: color,
            },
        },
    })
    //Same as DatePickerCollored, not a functional so no styled()

    return (
        <Select
            {...props.field}
            onChange={props.onChange}
            className={`${props.className} ${useStyles().select}`}
            labelId={props.labelId}
            error={props.errors !== undefined}
        >
        {
            props.options
        }
        </Select>
    )
}