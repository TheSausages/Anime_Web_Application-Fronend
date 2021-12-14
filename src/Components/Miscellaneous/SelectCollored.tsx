import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ReactNode } from "react";
import { Control, Controller, FieldError } from "react-hook-form";

/**
 * The props for the {@link SelectCollored} component.
 */
export interface SelectColloredProps {
    /** What should the select label Id be? */
    labelId: string;

    /** what should the select component className (html class) be? */
    className?: string;

    /** What should happen when the value changes. */
    onChange: (event: SelectChangeEvent<any>, child: ReactNode) => void;

    /** What should the color of the picker be. */
    color?: string;

    /** The label of the picker. */
    label: string;

    /** The react-hook-form errors of the component. */
    errors?: FieldError;

    /** 
     * What options should the select have.
     * One additioan option, *clean* is always added.
     * It is used to clean the select value.
    */
    options: ReactNode[];

    /** What className (html class) should the form control of the select be. */
    formControlClassName?: string;

    /** What should be the react-hook-form name of the controller. */
    formControlName: string;

    /** The react-hook-form control object. */
    control?: Control<any>;

    /** Should the select be disabled. */
    disabled?: boolean;
}

/**
 * A highy customizable Select field.
 * Form Control, Label and Controller have already been used - do not use them yourself!
 * The default color of the component is rgb(36, 185, 44) - light green.
 * @param props {@link SelectColloredProps}
 */
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
                {props.label}
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