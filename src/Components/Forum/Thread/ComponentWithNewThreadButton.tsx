import { ForumCategory } from "../../../data/Forum/ForumCategory";
import NewThreadComponent from "./NewThreadComponent";

interface ComponentWithNewThreadButtonProps {
    children: JSX.Element;
    categories: ForumCategory[];
}

export default function ComponentWithNewThreadButton(props: ComponentWithNewThreadButtonProps) {
    return (
        <div>
            {props.children}

            <NewThreadComponent categories={props.categories} />
        </div>
    )
}