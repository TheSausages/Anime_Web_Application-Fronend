import "./css/IconWithNumber.css"

/**
 * The props for the {@link IconWithNumber} component.
 */
export interface IconWithNumberProps {
    /** What number should be shown. */
    numberToShow: number;

    /** What icon should be used. */
    iconToShow: JSX.Element;
}

/**
 * Small utility method to show an icon with a number together.
 * @param props {@link IconWithNumberProps}
 */
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