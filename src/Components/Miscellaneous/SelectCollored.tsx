import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ReactNode } from "react";
import { Control, Controller, FieldError } from "react-hook-form";

interface SelectColloredProps {
    labelId: string;
    className?: string;
    onChange: (event: SelectChangeEvent<any>, child: ReactNode) => void;
    color?: string;
    title: string;
    errors?: FieldError;
    options: ReactNode[];
    formControlClassName?: string;
    formControlName: string;
    control: Control<any> | undefined;
    formKey?: string;
    disabled?: boolean;
}

export default function SelectCollored(props: SelectColloredProps) {
    let color = props.color ?? "rgb(36, 185, 44)";

    const useStyles = makeStyles({
        label: {
            color: '#101010',
            fontSize: '0.9rem'
        },
        selectForm: {
            "& .MuiInputLabel-root.MuiInputLabel-formControl.MuiInputLabel-animated": {
                left: "-0.7vw",  
                '@media (max-width: 960px)': {
                    left: "-3vw",
                },
            },
            '& .MuiSelect-select.MuiSelect-outlined.MuiOutlinedInput-input': {
                padding: '12px 0',
            },
            '@media (max-width: 960px)': {
                width: '40vw',
            },
            "& .MuiOutlinedInput-notchedOutline": {
                borderTop: 'none',
                borderRight: 'none',
                borderLeft: 'none',
                borderBottom: `2px solid ${color}`,
                borderRadius: 0,
            },
        },
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
    
    const classes = useStyles();

    let options =[
        <MenuItem key={-1} value="">
            {<i>Clean</i>}
        </MenuItem>,
        ...props.options
    ]

    return (
        <FormControl className={`${classes.selectForm} ${props.formControlClassName}`} disabled={props.disabled}>
            <InputLabel id={props.labelId} className={classes.label}>
                {props.title}
            </InputLabel>

            <Controller render={({field}) => (
                <Select
                    {...field}
                    labelId={props.labelId}
                    onChange={props.onChange}
                    error={props.errors !== undefined}
                    className={`${props.className} ${classes.select}`}
                >
                    {
                        options
                    }
                </Select>
            )}
            name={props.formControlName}
            control={props.control}
            />
        </FormControl>
    )
}