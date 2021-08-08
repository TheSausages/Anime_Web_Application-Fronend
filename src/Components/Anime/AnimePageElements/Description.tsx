import parse from 'html-react-parser';

import "../css/Description.css";

interface DescriptionWithSocialButtonsProps {
    description: string;
}

export function DescriptionWithSocialButtons(props: DescriptionWithSocialButtonsProps) {
    return (
        <div className="AnimeDescription">
            <div className="line">
                <p>Description</p>
            </div>

            <div>
                {parse(props.description)}
            </div>
        </div>
    )
}