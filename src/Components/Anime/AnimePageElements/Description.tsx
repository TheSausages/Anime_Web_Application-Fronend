import parse from 'html-react-parser';
import { useTranslation } from 'react-i18next';

import "../css/Description.css";

/**
 * The props for the {@link Description} component.
 */
export interface DescriptionProps {
    /** The description of an Anime. Can be plain or formatted (for html) text. */
    description: string;
}

/**
 * Component for displaying information on an Anime description.
 * The description is additionaly parsed for htlm elements using *html-react-parser*.
 * @param props {@link DescriptionProps}
 */
export function Description(props: DescriptionProps) {
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