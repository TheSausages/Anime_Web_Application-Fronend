import { useState } from "react";
import useBasicState from "../../data/General/BasicState";

import "./css/ExpandingField.css"

interface ExpandingFieldProps {
    text: string;
    maxRown: number;
}

export default function ExpandingField(props: ExpandingFieldProps) {
    const { t } = useBasicState();
    const [collapsed, setCollapsed] = useState<boolean>(true);

    return (
        <div>
            <div className="TextContainer"
            style={{
                /* maxHeight = lineHeight * maxRows */
                /* Here its 1 * props.maxRows */
                maxHeight: collapsed ? `${props.maxRown}em` : undefined,
            }}>
                {props.text}
            </div>

            <div id="halfWidth" className="line lineAboveText"><p></p></div>
            <div><span className="CollapseText"
                    onClick={_ => setCollapsed(prevState => !prevState)}>
                    {collapsed ? t("misc.expand") : t("misc.minimize")}
                </span>
            </div>
        </div>
    )
}