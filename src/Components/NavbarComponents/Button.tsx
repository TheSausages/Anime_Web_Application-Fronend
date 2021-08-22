import { Link } from 'react-router-dom';
import '../Miscellaneous/css/Button.css'

const STYLES = ['btn--primary', 'btn--outline']
type ButtonStyles = 'btn--primary' | 'btn--outline'

const SIZES = ['btn--medium', 'btn--large']
type ButtonSizes = 'btn--medium' | 'btn--large'

interface ButtonProps {
    children?: React.ReactNode,
    onClick?: () => void
    buttonStyle?: ButtonStyles,
    buttonSize?: ButtonSizes,
    mobileDis?: boolean,
    to?: string
}

export default function Button(props: ButtonProps) {
    const checkButtonStyle = STYLES.includes(props.buttonStyle!) ? props.buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(props.buttonSize!) ? props.buttonSize : SIZES[0];
    const mobileDissapear = props.mobileDis ? 'mobileDissapear' : '';

    return (
        <Link className={`btn ${checkButtonStyle} ${checkButtonSize} ${mobileDissapear}`} onClick={props.onClick} to={props.to!}>
            {props.children}
        </Link>
    )
}
