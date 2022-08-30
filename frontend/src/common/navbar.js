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
    }].map(menu => (
        <li className="nav-item" key={menu.id}>
            <NavLink
                className={({ isActive }) => (isActive ? "nav-link active bold" : "nav-link bold")}
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