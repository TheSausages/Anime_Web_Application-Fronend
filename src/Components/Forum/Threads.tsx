import { Link } from "react-router-dom"
import { SimpleThread, SimpleThreadPage } from "../../data/Forum/Thread"

interface ThreadsProps {
    threads: SimpleThreadPage;
}

export default function Threads(props: ThreadsProps) {
    console.log(props.threads)
    return (
        <div>
            <Link to="/forum/search">Link to second</Link>
            {
                props.threads.content.map((value: SimpleThread) => (
                    <div>
                        {value.title}
                    </div>
                ))
            }
        </div>
    )
}