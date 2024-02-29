import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as jwt_decode from "jwt-decode" // Import jwt_decode library
import UserAvatar from './UserAvatar'; // Import your UserAvatar component
import "./Navbar.css";

function CustomerNavbar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("jwt");

        if (token) {
            const decoded = jwt_decode.default(token); // Use jwt_decode.default to access the default export
            console.log('user info:', decoded)
            setUser(decoded);
        }
    }, []);

    return (
        <div className="home-navbar">
            <div className="left-section">
                <div className="logo">
                    <b>TaskCraft</b>
                </div>

                <div className="nav-searchbar">
                    <input type="text" placeholder="Search..." />
                </div>
            </div>

            <div className="right-section">
                <div className="nav-links">
                    <NavItem to="">Bio</NavItem>
                    <NavItem to="">Messages</NavItem>
                    <NavItem to="">Orders</NavItem>
                </div>

                <div className="nav-buttons">
                    {user ? (
                        // If user data is available, render UserAvatar
                        <UserAvatar firstName={user.firstName} lastName={user.lastName} />
                    ) : (
                        // Otherwise, render "Sign up" and "Login" buttons
                        <li>
                            <Link to="/signup"><button>Sign up</button></Link>
                            <Link to="/login"><button>Login</button></Link>
                        </li>
                    )
                    }
                </div>
            </div>
        </div>
    );
}

function NavItem({ to, children }) {
    return (
        <Link to={to} className="nav-item">
            {children}
        </Link>
    );
}

export default CustomerNavbar;
