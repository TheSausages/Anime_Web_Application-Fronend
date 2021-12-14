import { useEffect } from "react";
import { ThreadStatus } from "../../../data/Forum/Types";

import "../css/ThreadStatusComponent.css";

/**
 * The props for the {@link ThreadStatusComponent} component.
 */
export interface ThreadStatusProps {
    /** Primary color of the whole component. */
    primaryColor: string;

    /** Thew current status */
    status: ThreadStatus;

    /** Id of the thread, used to set overflow for a given element. */
    id: string;

    /** Classname (html class) of the status. */
    className?: string;
}

export default function ThreadStatusComponent(props: ThreadStatusProps) {

    useEffect(() => {
        // small method that adds overflow: hiden to parent of element
        document.getElementById(`Status${props.id}`)!.parentElement!.style.overflow = "hidden"
    }, [props.id]);

    return (
        <div className={`Status ${props.className}`} id={`Status${props.id}`} style={{ backgroundColor: props.primaryColor }}>
            {props.status}
        </div>
    )
}