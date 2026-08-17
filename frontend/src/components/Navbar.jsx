import { Link, useNavigate } from "react-router-dom";

import {
    SignInButton,
    SignUpButton,
    useUser,
    UserButton,
} from "@clerk/clerk-react";

import { FaUserEdit } from "react-icons/fa";

import "../css/Navbar.css";


function Navbar() {

    const { isSignedIn } = useUser();

    const navigate = useNavigate();


    return (

        <nav className="navbar navbar-expand-lg fixit-navbar sticky-top">

            <div className="container py-3">


                {/* =========================
                    LOGO
                ========================= */}

                <Link
                    to="/"
                    className="navbar-brand fixit-logo"
                >
                    Fix<span>It</span>
                </Link>


                {/* =========================
                    MOBILE TOGGLE
                ========================= */}

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


                {/* =========================
                    NAVBAR CONTENT
                ========================= */}

                <div
                    className="collapse navbar-collapse"
                    id="fixitNavbar"
                >


                    {/* =========================
                        NAVIGATION LINKS
                    ========================= */}

                    <ul className="navbar-nav mx-auto align-items-lg-center gap-lg-2">


                        {/* Services */}

                        <li className="nav-item">

                            <Link
                                to="/services"
                                className="nav-link fixit-nav-link"
                            >
                                Services
                            </Link>

                        </li>


                        {/* About */}

                        <li className="nav-item">

                            <Link
                                to="/about"
                                className="nav-link fixit-nav-link"
                            >
                                About
                            </Link>

                        </li>


                    </ul>


                    {/* =========================
                        AUTHENTICATION
                    ========================= */}

                    <div className="d-flex align-items-center gap-3 mt-4 mt-lg-0">


                        {isSignedIn ? (

                            <UserButton

                                appearance={{
                                    elements: {
                                        avatarBox:
                                            "fixit-user-avatar",
                                    },
                                }}

                            >

                                {/* =========================
                                    CUSTOM CLERK MENU
                                ========================= */}

                                <UserButton.MenuItems>

                                    <UserButton.Action

                                        label="Edit Profile"

                                        labelIcon={
                                            <FaUserEdit />
                                        }

                                        onClick={() => {

                                            navigate(
                                                "/edit-profile"
                                            );

                                        }}

                                    />

                                </UserButton.MenuItems>

                            </UserButton>


                        ) : (

                            <>


                                {/* =========================
                                    LOGIN
                                ========================= */}

                                <SignInButton mode="modal">

                                    <button
                                        className="btn fixit-signin-btn"
                                    >
                                        Log In
                                    </button>

                                </SignInButton>


                                {/* =========================
                                    SIGN UP
                                ========================= */}

                                <SignUpButton
                                    mode="modal"
                                    fallbackRedirectUrl="/complete-profile"
                                >

                                    <button
                                        className="btn fixit-signup-btn"
                                    >
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