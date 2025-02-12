import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function MyHeader() {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            // Clear token and userId from localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("userId");

            // Redirect to login page
            navigate("/");
        }
    };

    return (
        <div>
            <header className="site-navbar site-navbar-target" role="banner">
                <div className="container">
                    <div className="row align-items-center position-relative">
                        <div className="col-3">
                            <div className="site-logo">
                                <a href="/home" className="font-weight-bold">
                                    <img src="images/logo.png" alt="Logo" className="img-fluid"></img>
                                </a>
                            </div>
                        </div>

                        <div className="col-9 text-right">
                            <span className="d-inline-block d-lg-none">
                                <a href="#" className="text-white site-menu-toggle js-menu-toggle py-5 text-white">
                                    <span className="icon-menu h3 text-white"></span>
                                </a>
                            </span>

                            <nav className="site-navigation text-right ml-auto d-none d-lg-block" role="navigation">
                                <ul className="site-menu main-menu js-clone-nav ml-auto">
                                    <li><NavLink className="nav-link" to="/home">Home</NavLink></li>
                                    <li><NavLink className="nav-link" to="/trips">Trips</NavLink></li>
                                    <li><NavLink className="nav-link" to="/category">Categories</NavLink></li>
                                    <li><NavLink className="nav-link" to="/addtrip">Create Trip</NavLink></li>
                                    <li><NavLink className="nav-link" to="/Mytrips">My Trips</NavLink></li>
                                    <li><NavLink className="nav-link" to="/profile">Profile</NavLink></li>
                                    <li><NavLink className="nav-link" to="/about">About</NavLink></li>
                                    <li><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
                                    <li>
                                        <button className="btn btn-danger btn-sm ml-2" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}
