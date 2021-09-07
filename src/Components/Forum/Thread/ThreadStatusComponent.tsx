import { useEffect } from "react";
import { ThreadStatus } from "../../../data/Forum/Types";

import "../css/ThreadStatusComponent.css";

interface ThreadStatusProps {
    primaryColor: string;
    status: ThreadStatus;
    id: string;
}

export default function ThreadStatusComponent(props: ThreadStatusProps) {

    useEffect(() => {
        // small method that adds overflow: hiiden to parent of element
        document.getElementById(`Status${props.id}`)!.parentElement!.style.overflow = "hidden"
    });

    return (
        <div className="Status" id={`Status${props.id}`} style={{ backgroundColor: props.primaryColor }}>
            {props.status}
        </div>
    )
}