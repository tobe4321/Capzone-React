import React, { Component } from 'react';

export default class Nav2 extends Component{
    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-primary mb-2 py-3">
                    <a className="navbar-brand" href="/">CapZone</a>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="/cfb">CFB</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/ecu">ECU Football</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/ff">Fantasy Football</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/nba">NBA</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="/mlb" role="button" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">MLB</a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className='dropdown-item' href='/mlb'>Home</a></li>
                                        <li><a className="dropdown-item" href="#">Standings</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="/nhl" role='button' id='navbarDropdown' data-bs-toggle='dropdown' aria-expanded='false'>NHL</a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className='dropdown-item' href='/nhl'>Home</a></li>
                                        <li><a className="dropdown-item" href="/standings">Standings</a></li>
                                        <li><a className="dropdown-item" href="/teams">Teams</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                </nav>
            </div>
        );
    }
}

