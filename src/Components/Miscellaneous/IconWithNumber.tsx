import "./css/IconWithNumber.css"

interface IconWithNumberProps {
    numberToShow: number;
    iconToShow: JSX.Element;
}

export function IconWithNumber(props: IconWithNumberProps) {
    return (
        <div className="iconWithNumber">
            {
                props.iconToShow
            }
            {
                props.numberToShow
            }
        </div>
    )
}