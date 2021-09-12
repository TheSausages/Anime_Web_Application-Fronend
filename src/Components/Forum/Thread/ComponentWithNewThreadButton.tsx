import NewThreadComponent from "./NewThreadComponent";

interface ComponentWithNewThreadButtonProps {
    children: JSX.Element;
}

export default function ComponentWithNewThreadButton(props: ComponentWithNewThreadButtonProps) {
    return (
        <div>
            {props.children}

            <NewThreadComponent />
        </div>
    )
}