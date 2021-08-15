import React from 'react'
import { NavLink } from 'react-router-dom';
import './nav.css';
import HomeIcon from '@material-ui/icons/Home';
import BookmarkIcon from '@material-ui/icons/Bookmark';

const Nav = () => {
    return (
        <header className="navbar">
            <nav>
                <ul className="list">
                    <li className="list-item">
                        <NavLink exact to="/">Home <HomeIcon/></NavLink>
                        <NavLink to="/favorites">Favorites <BookmarkIcon/></NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Nav;