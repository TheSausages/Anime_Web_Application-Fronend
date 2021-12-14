import { Control, Controller } from "react-hook-form";
import { FormControl, TextFieldProps } from "@material-ui/core";
import DatePicker from "@material-ui/lab/DatePicker";
import { LocalizationProvider } from "@material-ui/lab";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import { makeStyles } from "@material-ui/styles";

/**
 * The props for the {@link DatePickerCollored} component.
 * Errors should be shown inside the renderInput field!
 */
interface DatePickerColloredProps {
    /** What label should the picker have. */
    label: string;

    /** What should the picker className (html class) be? */
    datePickerClassName?: string;

    /** What should the form controll className (html class) be? */
    formControlClassName?: string;

    /** What should be the react-hook-form name of the controller. */
    formControlName: string;

    /** The react-hook-form control object. */
    control?: Control<any>;

    /** What should the date format be? */
    inputFormat: string;

    /** 
     * What should be used for rendering the value.
     * Example:
     * ```typescript
     * (params: TextFieldProps) => <TextField 
     *      {...params} 
     *      error={errors.watchEndDate !== undefined} 
     *      helperText={errors.watchEndDate?.message} 
     * />
     * ```
     */
    renderInput: (params: TextFieldProps) => JSX.Element;

    /** What should happen when the value changes. */
    onChange: (date: unknown, keyboardInputValue?: string | undefined) => void;

    /** What color should the picker be? */
    color?: string;
}

/**
 * A highy customizavle Date Picker component.
 * Form Control and Controller have already been used - do not use them yourself!
 * The default color of the component is rgb(36, 185, 44) - light green.
 * It uses the AdapterDateFns as the Localization Provider.
 * @param props {@link DatePickerColloredProps}
 */
export default function DatePickerCollored(props: DatePickerColloredProps) {
    let color = props.color ?? "rgb(36, 185, 44)";

    const useStyles = makeStyles((theme) => ({
        datePicker: {
            '& .MuiOutlinedInput-input.MuiInputBase-input': {
                padding: '12px 0',
            },
            '& .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium': {
                color: color,
            },
            "& .MuiFormHelperText-root": {
                position: "absolute",
                bottom: "-20px",
            },
            "& .MuiInputLabel-root.MuiInputLabel-formControl.MuiInputLabel-animated.MuiInputLabel-outlined": {
                left: "-0.7vw",
                '@media (max-width: 960px)': {
                    left: "-3vw",
                },
            },
            "& .MuiOutlinedInput-notchedOutline": {
                borderTop: 'none',
                borderRight: 'none',
                borderLeft: 'none',
                borderBottom: `2px solid ${color}`,
                borderRadius: 0,
            },
            '@media (max-width: 960px)': {
                width: '40vw',
            },
        }
    }));


    return (
        <FormControl className={`${useStyles().datePicker} ${props.formControlClassName}`}>
            <Controller render={({field}) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        {...field}
                        label={props.label}
                        inputFormat={props.inputFormat}
                        onChange={props.onChange}
                        renderInput={props.renderInput}
                        className={props.datePickerClassName}
                    />
                </LocalizationProvider>
                )}
            control={props.control}
            name={props.formControlName}
            />
        </FormControl>
    )
}