import { styled } from "@material-ui/styles"
import { Link } from "react-router-dom"
import { MediaB } from "../../data/Anime/MediaInformation"
import { TitlesInWantedOrder, getRandomColor } from "../../Scripts/Utilities"
import ScrollContainer from 'react-indiana-drag-scroll'
import { useTranslation } from "react-i18next"

import "./css/AnimeLink.css"

/**
 * The props for {@link AnimeLink} component.
 */
export interface AnimeLinkProps {
    /** Elements that should be displayed. */
    elements: MediaB[];

    /** Id of the html element. */
    id?: string;

    /** Should the elements be displayed as a grid and not as a flex? */
    grid?: boolean;

    /** Should the index of the element be seen? */
    showIndex?: boolean;
}

/**
 * Component for displaying Media elements af a grid/flex of images.
 * These images are also links to their respective detailed page.
 * @param props {@link AnimeLinkProps}
 */
export default function AnimeLink(props: AnimeLinkProps) {
    const { t } = useTranslation();

    const StyledDiv = styled('div')({
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        justifyItems: 'center',
        gridGap: 30,
        '@media (max-width: 1500px)': {
            gridTemplateColumns: 'repeat(4, 1fr)',
        },
        '@media (max-width: 1200px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
        },
        '@media (max-width: 850px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
        '@media (max-width: 560px)': {
            gridTemplateColumns: '1fr',
        }
    })

    function restOfCode(): JSX.Element[] {
        return ( props.elements.map((anime, index) => (
                    <Link key={index} to={`/anime/${anime.id}`} title={TitlesInWantedOrder(anime.title, t)}>
                        { props.showIndex ? <div><span>{index + 1}</span></div> : null }
                        <img src={anime.coverImage.large} style={{ 'border': '1px solid ' + getRandomColor() }} alt='new'></img>
                        <p title={TitlesInWantedOrder(anime.title, t)}></p>
                    </Link>
                )
            ))
    }

    if (props.grid) {
        return (
            <StyledDiv className='animeLink' id={props.id}>
                {restOfCode()}
            </StyledDiv>
        )
    } else {
        return (
            <div className='animeLink' id={props.id}>
                <ScrollContainer vertical={false}>
                    {restOfCode()}
                </ScrollContainer>
            </div>
        )
    }
}