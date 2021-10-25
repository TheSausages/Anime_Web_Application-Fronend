import { useState } from 'react';
import { MenuItems } from './MenuItems'
import Button from './Button';
import { Link } from "react-router-dom";
import { useAuth } from '../AuthenticationAndLogin/Auth';
import { useEffect } from 'react';
import { checkIfLoggedIn } from '../../Scripts/Utilities';
import { useTranslation } from 'react-i18next';
import { LanguageObject, languages } from '../../i18n/Languages';
import { MenuItem, Select, SelectChangeEvent } from '@material-ui/core';

import './css/Navbar.css'

interface NavbarProps {
}

export default function Navbar(props: NavbarProps) {
    const [clicked, setClicked] = useState(false);
    const { t, i18n } = useTranslation();
    const rerender = useAuth().rerenderThisComponent()

    useEffect(() => {},[rerender])

    function getCurrentLanguage(): LanguageObject {
        return Object.keys(languages).filter((key) => languages[key].name === i18n.language ? true : false).map((key) => languages[key])[0] ?? languages.english;
    }
    
    return(
        <nav className="NavbarItems">
            <h1 className="navbar-logo">
                <Link to='/'>
                    BachAni<i className="fab fa-phoenix-framework"></i>
                </Link>
            </h1>

            <div className="menu-icon" onClick={() => setClicked(!clicked)}>
                <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>

            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems
                    .filter( 
                        function(elem) {
                            if (!elem.auth.includes(checkIfLoggedIn() ? 'loggedIn' : 'anonymous')) {
                                return false;
                            }
        
                            return true;
                        }
                    )
                    .map((item, index) => {
                        return (
                            <li key={index}>
                                <Link className={item.cName} to={item.url} onClick={() => setClicked(!clicked)}>
                                    {t(item.title)}
                                </Link>
                            </li>
                        )
                    })}
            </ul>   

            <div className="languageSelect">
                        <Select defaultValue={languages.english.name}
                            value={getCurrentLanguage().name}
                            onChange={(event: SelectChangeEvent) => i18n.changeLanguage(event.target.value)}
                            variant="standard"
                            IconComponent={() => <div></div>}
                            disableUnderline
                            sx={{
                                "& .MuiSelect-select.MuiSelect-standard.MuiInput-input.MuiInputBase-input": {
                                    display: "flex",
                                    padding: 0,
                                    margin: "10px",
                                },
                                "& .MuiSelect-select.MuiSelect-standard.MuiInput-input.MuiInputBase-input:focus": {
                                    background: "transparent",
                                }
                            }}
                        >
                            {
                                Object.keys(languages).map((key, index) => {
                                    let lan = languages[key];
                                
                                    return (
                                        <MenuItem key={index} value={lan.name ?? languages.english.name} >
                                            <img key={lan.countryFlagPath} className="languageIcon" src={`/images/${lan.countryFlagPath}`} alt={lan.name} />
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </div>   

            {checkIfLoggedIn() ? <Button to='/logout' mobileDis={true}>{t('navbar.signout')}</Button> : <Button to='/login' mobileDis={true}>{t('navbar.signin')}</Button>}
           
        </nav>
    )
}