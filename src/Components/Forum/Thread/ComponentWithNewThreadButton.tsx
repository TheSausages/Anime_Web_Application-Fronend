import { ForumCategory } from "../../../data/Forum/ForumCategory";
import NewThreadComponent from "./NewThreadComponent";

/**
 * The props for the {@link ComponentWithNewThreadButton} component.
 */
export interface ComponentWithNewThreadButtonProps {
    /** The component, to which the button should be added. */
    children: JSX.Element;

    /** All categories, used in the new thread form.*/
    categories: ForumCategory[];
}

/**
 * Component that adds a *new thread* button to any component.
 * @param props {@link ComponentWithNewThreadButtonProps}
 * @see {@link NewThreadComponent}
 */
export default function ComponentWithNewThreadButton(props: ComponentWithNewThreadButtonProps) {
    return (
        <div>
            {props.children}

            <NewThreadComponent categories={props.categories} />
        </div>
    )
}