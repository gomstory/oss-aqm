import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
    const menus = [{
        id: 'request-project',
        path: 'new',
        name: 'Request Project'
    }, {
        id: 'compare-project',
        path: 'compare',
        name: 'Compare Project'
    }, {
        id: 'about-us',
        path: 'about-us',
        name: 'About Us'
    }].map(menu => (
        <li className="nav-item" key={menu.id}>
            <NavLink
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                to={`/${menu.path}`}
                key={menu.id}>
                {menu.name}
            </NavLink>
        </li>
    ))

    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                {menus}
            </ul>
        </nav>
    );
}

export default Navbar;