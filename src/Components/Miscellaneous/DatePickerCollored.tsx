import { Control, Controller } from "react-hook-form";
import { FormControl, TextFieldProps } from "@material-ui/core";
import DatePicker from "@material-ui/lab/DatePicker";
import { LocalizationProvider } from "@material-ui/lab";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import { makeStyles } from "@material-ui/styles";

//Errors in renderInput
interface DatePickerColloredProps {
    label: string;
    datePickerClassName?: string;
    formControlClassName?: string;
    formControlName: string;
    control: Control<any> | undefined
    inputFormat: string;
    renderInput: (params: TextFieldProps) => JSX.Element;
    onChange: (date: unknown, keyboardInputValue?: string | undefined) => void;
    color?: string;
}

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