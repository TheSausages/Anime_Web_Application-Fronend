import { Checkbox, FormControlLabel } from "@material-ui/core";
import { styled } from "@material-ui/styles";

interface CheckboxColloredProps {
    color?: string;
    checked?: boolean;
    field: Object;
    label: string;
    className?: string;
    icon: JSX.Element;
    checkedIcon: JSX.Element;
    onChange?: ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void);
}

const CheckboxColloredStyled = styled(Checkbox)({
    '& .MuiSvgIcon-root': {
        color: `var(--color)`,
    },
})

export default function CheckboxCollored(props: CheckboxColloredProps) {
    let color = props.color ?? "rgb(36, 185, 44)";

    return (
        <FormControlLabel 
            control={
                <CheckboxColloredStyled
                    {...props.field}
                    checked={props.checked}
                    onChange={props.onChange}
                    icon={props.icon} 
                    checkedIcon={props.checkedIcon} 
                
                    style={{'--color': color} as React.CSSProperties}
            />}
            className={props.className}
            label={props.label}
        />
    )
}