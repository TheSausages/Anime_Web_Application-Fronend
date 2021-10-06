import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import { TextFieldProps } from "@material-ui/core";
import DatePicker from "@material-ui/lab/DatePicker";
import { LocalizationProvider } from "@material-ui/lab";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
//Errors in renderInput
interface DatePickerColloredProps {
    field: ControllerRenderProps<FieldValues, FieldPath<FieldValues>>;
    label: string;
    className?: string;
    inputFormat: string;
    renderInput: (params: TextFieldProps) => JSX.Element;
    onChange: (date: unknown, keyboardInputValue?: string | undefined) => void;
    color?: string;
}

//As of now, DatePicker is not a functional component, so styled() wont work(I think) 

/*Add this to formcontroll with the datePicker:
datePicker: {
        '& .MuiOutlinedInput-input.MuiInputBase-input.MuiInputBase-inputAdornedEnd': {
            padding: '12px 14px',
            textAlign: 'start',
        },
        '& .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium': {
            color: color,
        },
        "& .MuiFormHelperText-root": {
            position: "absolute",
            bottom: "-20px",
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderTop: 'none',
            borderRight: 'none',
            borderLeft: 'none',
            borderBottom: `2px solid ${color}`,
            borderRadius: 0,
        },
    },
 */
export default function DatePickerCollored(props: DatePickerColloredProps) {
    /*let color = props.color ?? "rgb(36, 185, 44)";

    const DatePickerColloredStyles = styled(DatePicker)({
        '& .MuiSvgIcon-root': {
            color: color,
        },
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
    })*/


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker className={props.className}
                {...props.field}
                label={props.label}
                inputFormat={props.inputFormat}
                onChange={props.onChange}
                renderInput={props.renderInput}
            />
        </LocalizationProvider>
    )
}