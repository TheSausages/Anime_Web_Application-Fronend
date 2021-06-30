import React from 'react';
import { Link } from 'react-router-dom';
import '../MiscellaneousCss/Button.css'

const STYLES = [
    'btn--primary',
    'btn--outline'
]

const SIZES = [
    'btn--medium',
    'btn--large'
]

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize,
    mobileDis,
    to
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
    const mobileDissapear = mobileDis ? 'mobileDissapear' : '';

    return (
        <Link className={`btn ${checkButtonStyle} ${checkButtonSize} ${mobileDissapear}`} onClick={onClick} type={type} to={to}>
            {children}
        </Link>
    )
}
