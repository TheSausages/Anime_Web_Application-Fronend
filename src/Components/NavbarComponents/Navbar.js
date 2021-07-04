import React, { useState } from 'react';
import { MenuItems } from './MenuItems'
import './css/Navbar.css'
import { Button } from './Button';
import { Link } from "react-router-dom";
import { useAuth } from '../AuthenticationAndLogin/Auth';

export default function Navbar(props) {
    const [clicked, setClicked] = useState(false);


    useAuth().rerenderThisComponent(); //rerender when log in / log out
    
    return(
        <nav className="NavbarItems">
            <h1 className="navbar-logo">
                <Link to='/'>
                    Anime<i className="fab fa-phoenix-framework"></i>
                </Link>
            </h1>
            <div className="menu-icon" onClick={() => setClicked(!clicked)}>
                <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'} onClick={() => setClicked(!clicked)}>
                {MenuItems
                    .filter( 
                        function(elem) {
                            if (!elem.auth.includes(localStorage.getItem('accessToken') ? 'loggedIn' : 'anonymous')) {
                                return false;
                            }
        
                            return true;
                        }
                    )
                    .map((item, index) => {
                        return (
                            <li key={index}>
                                <Link className={item.cName} to={item.url}>
                                    {item.title}
                                </Link>
                            </li>
                        )
                    })}
            </ul>      

            {localStorage.getItem('accessToken') ? <Button to='/logout' mobileDis={true}>Sign Out</Button> : <Button to='/login' mobileDis={true}>Sign In</Button>}
           
        </nav>
    )
}