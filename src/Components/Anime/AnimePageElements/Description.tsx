import parse from 'html-react-parser';
import { useTranslation } from 'react-i18next';

import "../css/Description.css";

interface DescriptionWithSocialButtonsProps {
    description: string;
}

export function DescriptionWithSocialButtons(props: DescriptionWithSocialButtonsProps) {
    const { t } = useTranslation();

    return (
        <div className="AnimeDescription">
            <div className="line">
                <p>{t("anime.description")}</p>
            </div>

            <div>
                {parse(props.description)}
            </div>
        </div>
    )
}