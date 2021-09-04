import { Link } from "react-router-dom"
import { SimpleThread, SimpleThreadPage } from "../../data/Forum/Thread"

interface ThreadsProps {
    threads: SimpleThreadPage;
}

export default function Threads(props: ThreadsProps) {
    const { threads } = props;

    return (
        <div>
            <Link to="/forum/search">Link to second</Link>
            {
                threads.content.map((value: SimpleThread) => (
                    <div key={value.threadId}>
                        {value.title}
                        {new Date(threads.content[0].creation).toLocaleString()}
                    </div>
                ))
            }
        </div>
    )
}