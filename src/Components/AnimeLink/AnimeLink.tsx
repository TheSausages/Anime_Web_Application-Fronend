import { styled } from "@material-ui/styles"
import { Link } from "react-router-dom"
import { MediaB } from "../../data/Anime/MediaInformation"
import { titlesInWantedOrder, getRandomColor } from "../../Scripts/Utilities"
import ScrollContainer from 'react-indiana-drag-scroll'
import { useEffect } from "react"

import "./css/AnimeLink.css"

interface AnimeLinkProps {
    elements: MediaB[];
    id?: string;
    grid?: boolean;
    showIndex?: boolean;
}

export default function AnimeLink(props: AnimeLinkProps) {
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
                    <Link key={index} to={'/anime/' + anime.id + '/'} title={titlesInWantedOrder(anime.title)}>
                        { props.showIndex ? <div><span>{index + 1}</span></div> : null }
                        <img src={anime.coverImage.large} style={{ 'border': '1px solid ' + getRandomColor() }} alt='new'></img>
                        <p title={titlesInWantedOrder(anime.title)}></p>
                    </Link>
                )
            ))
        
    }

    useEffect(() => {
        
    }, [])

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