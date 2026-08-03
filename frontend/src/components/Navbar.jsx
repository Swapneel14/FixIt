import { Link } from "react-router-dom";
import {
    SignInButton,
    SignUpButton,
    useUser,
    UserButton,
} from "@clerk/clerk-react";

import "../css/Navbar.css";

function Navbar() {
    const { isSignedIn } = useUser();

    return (
        <nav className="navbar navbar-expand-lg fixit-navbar sticky-top">
            <div className="container py-3">

                {/* Logo */}
                <Link to="/" className="navbar-brand fixit-logo">
                    Fix<span>It</span>
                </Link>

                {/* Mobile Toggle */}
                <button
                    className="navbar-toggler border-0 shadow-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#fixitNavbar"
                    aria-controls="fixitNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Content */}
                <div
                    className="collapse navbar-collapse"
                    id="fixitNavbar"
                >

                    {/* Navigation Links */}
                    <ul className="navbar-nav mx-auto align-items-lg-center gap-lg-2">

                        <li className="nav-item">
                            <Link
                                to="/services"
                                className="nav-link fixit-nav-link"
                            >
                                Services
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                to="/about"
                                className="nav-link fixit-nav-link"
                            >
                                About
                            </Link>
                        </li>

                    </ul>

                    {/* Authentication */}
                    <div className="d-flex align-items-center gap-3 mt-4 mt-lg-0">

                        {isSignedIn ? (

                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: "fixit-user-avatar",
                                    },
                                }}
                            />

                        ) : (

                            <>
                                {/* Existing User Login */}
                                <SignInButton mode="modal">
                                    <button className="btn fixit-signin-btn">
                                        Log In
                                    </button>
                                </SignInButton>

                                {/* New User Signup */}
                                <SignUpButton
                                    mode="modal"
                                   fallbackRedirectUrl="/complete-profile"
                                >
                                    <button className="btn fixit-signup-btn">
                                        Get Started
                                    </button>
                                </SignUpButton>
                            </>

                        )}

                    </div>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;