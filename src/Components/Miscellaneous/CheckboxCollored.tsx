import { Checkbox, FormControl, FormControlLabel } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { Control, Controller } from "react-hook-form";

interface CheckboxColloredProps {
    color?: string;
    label: string;
    className?: string;
    icon: JSX.Element;
    checkedIcon: JSX.Element;
    onChange?: ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void);
    formControlClassName?: string;
    formControlName: string;
    control: Control<any> | undefined;
}

const CheckboxColloredStyled = styled(Checkbox)({
    '& .MuiSvgIcon-root': {
        color: `var(--color)`,
    },
})

export default function CheckboxCollored(props: CheckboxColloredProps) {
    let color = props.color ?? "rgb(36, 185, 44)";

    return (
        <FormControl className={props.formControlClassName}>
            <Controller render={({field}) => (
                <FormControlLabel 
                    control={
                        <CheckboxColloredStyled
                            {...field}
                            checked={field.value}
                            onChange={props.onChange}
                            icon={props.icon} 
                            checkedIcon={props.checkedIcon} 
                        
                            style={{'--color': color} as React.CSSProperties}
                        />
                    }
                    className={props.className}
                    label={props.label}
                />
                )}
                control={props.control}
                name={props.formControlName}
            />
        </FormControl>
    )
}