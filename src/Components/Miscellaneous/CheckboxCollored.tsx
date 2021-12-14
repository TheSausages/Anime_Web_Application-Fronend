import { Checkbox, FormControl, FormControlLabel } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { Control, Controller } from "react-hook-form";

/**
 * The props for the {@link CheckboxCollored} component.
 */
export interface CheckboxColloredProps {
    /** What color should the checkbox be. */
    color?: string;

    /** What should the label of the checkbox be. */
    label: string;

    /** What className (html class) should the checkbox be. */
    className?: string;

    /** What should the checkbox icon be when the value is false (not checked). */
    icon: JSX.Element;

    /** What should the checkbox icon be when the value is true (checked). */
    checkedIcon: JSX.Element;

    /** What should happen when the value changes */
    onChange?: ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void);

    /** What className (html class) should the form control of the checkbox be. */
    formControlClassName?: string;

    /** What should be the react-hook-form name of the controller. */
    formControlName: string;

    /** The react-hook-form control object. */
    control?: Control<any>;
}

const CheckboxColloredStyled = styled(Checkbox)({
    '& .MuiSvgIcon-root': {
        color: `var(--color)`,
    },
})

/**
 * A highy customizable Checkbox field.
 * Form Control and Controller have already been used - do not use them yourself!
 * The default color of the component is rgb(36, 185, 44) - light green.
 * @param props {@link CheckboxColloredProps}
 */
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