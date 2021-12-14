import { useState } from "react";
import useBasicState from "../../data/General/BasicState";

import "./css/ExpandingField.css"

/**
 * The props for the {@link ExpandingField} component.
 */
export interface ExpandingFieldProps {
    /** What text should be shown */
    text: string;

    /** How many rows should be shown minumum */
    minRow: number;
}

/**
 * A field that will show a maximum number of rows by default.
 * The user can click to show the whole text.
 * @param props {@link ExpandingFieldProps}
 */
export default function ExpandingField(props: ExpandingFieldProps) {
    const { t } = useBasicState();
    const [collapsed, setCollapsed] = useState<boolean>(true);

    return (
        <div>
            <div className="TextContainer"
                style={{
                    /* maxHeight = lineHeight * maxRows */
                    /* Here its 1 * props.maxRows */
                    maxHeight: collapsed ? `${props.minRow}em` : undefined,
                }}>
                {props.text}
            </div>

            <div id="halfWidth" className="line lineAboveText"><p></p></div>
            <div>
                <span className="CollapseText"
                    onClick={_ => setCollapsed(prevState => !prevState)}>
                    {collapsed ? t("misc.expand") : t("misc.minimize")}
                </span>
            </div>
        </div>
    )
}