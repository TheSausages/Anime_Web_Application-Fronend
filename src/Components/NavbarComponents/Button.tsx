import { Link } from 'react-router-dom';
import '../Miscellaneous/css/Button.css'

const STYLES = ['btn--primary', 'btn--outline']
type ButtonStyles = 'btn--primary' | 'btn--outline'

const SIZES = ['btn--medium', 'btn--large']
type ButtonSizes = 'btn--medium' | 'btn--large'

/**
 * The props for the {@link Button} component.
 */
export interface ButtonProps {
    /** Any elements that should be rendered inside the button. */
    children?: React.ReactNode,

    /** What should additionaly happen when clicking the button. */
    onClick?: () => void

    /** The style of the button. */
    buttonStyle?: ButtonStyles,

    /** The size of the button. */
    buttonSize?: ButtonSizes,

    /** Is this a mobile */
    mobileDis?: boolean,

    /** What is the path to which the butto should link */
    to?: string
}

/**
 * Button used in the navigation bar. 
 * @param props {@link ButtonProps}
 * @returns A button with a link to a given path.
 */
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
