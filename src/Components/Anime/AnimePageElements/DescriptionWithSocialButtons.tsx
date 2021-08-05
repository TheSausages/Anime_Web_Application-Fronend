import parse from 'html-react-parser';
import { EpisodeArray } from "../Anime";
import SocialButtons from "../SocialButtons";

import "../css/DescriptionWithSocialButtons.css";

interface DescriptionWithSocialButtonsProps {
    description: string;
    airedEpisodes: number;
}

export function DescriptionWithSocialButtons(props: DescriptionWithSocialButtonsProps) {
    return (
        <div className="AnimeDescription">
            {
                <SocialButtons airedEpisodes={getEpisodeArray(props.airedEpisodes)}/>
            }

            <div className="line">
                <p>Description</p>
            </div>

            <div>
                {parse(props.description)}
            </div>
        </div>
    )
}

function getEpisodeArray(episodesAired: number): EpisodeArray[]  {
    if (episodesAired === undefined) {
        return [{ value: 'Not Available', label: 'Not Available', disabled: true }]
    }

    var epAiredArray =  Array.from(Array(episodesAired).keys()).map((elem) => {
        return {value: elem, label: elem, disabled: false}
    })

    return [{value: 'Nr. of Episodes watched', label: 'Nr. of Episodes watched', disabled: true}, ...epAiredArray]
}