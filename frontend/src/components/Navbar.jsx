import { Link, useNavigate } from "react-router-dom";

import {
    SignInButton,
    SignUpButton,
    useUser,
    UserButton,
} from "@clerk/clerk-react";

import {
    FaUserEdit,
    FaCalendarCheck,
    FaTools,
} from "react-icons/fa";

import { motion } from "framer-motion";

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
                        NAVIGATION
                    ========================= */}

                    <ul className="navbar-nav mx-auto align-items-lg-center gap-lg-3">


                        {/* SERVICES */}

                        <li className="nav-item">

                            <Link
                                to="/services"
                                className="nav-link fixit-nav-link"
                            >
                                <FaTools />
                                <span>Services</span>
                            </Link>

                        </li>


                        {/* MY BOOKINGS */}

                        {isSignedIn && (

                            <li className="nav-item">

                                <Link
                                    to="/my-bookings"
                                    className="nav-link fixit-nav-link"
                                >

                                    <FaCalendarCheck />

                                    <span>
                                        My Bookings
                                    </span>

                                </Link>

                            </li>

                        )}


                        {/* ABOUT */}

                        <li className="nav-item">

                            <Link
                                to="/about"
                                className="nav-link fixit-nav-link"
                            >
                                <span>About</span>
                            </Link>

                        </li>

                    </ul>


                    {/* =========================
                        AUTH
                    ========================= */}

                    <div className="fixit-navbar-auth">


                        {isSignedIn ? (

                            <UserButton

                                appearance={{
                                    elements: {
                                        avatarBox:
                                            "fixit-user-avatar",
                                    },
                                }}

                            >

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

                            <div className="fixit-auth-buttons">


                                {/* LOGIN */}

                                <SignInButton mode="modal">

                                    <motion.button
                                        type="button"
                                        className="fixit-signin-btn"
                                        whileHover={{
                                            y: -2,
                                        }}
                                        whileTap={{
                                            scale: 0.97,
                                        }}
                                    >
                                        Log In
                                    </motion.button>

                                </SignInButton>


                                {/* SIGN UP */}

                                <SignUpButton
                                    mode="modal"
                                    fallbackRedirectUrl="/complete-profile"
                                >

                                    <motion.button
                                        type="button"
                                        className="fixit-signup-btn"
                                        whileHover={{
                                            y: -2,
                                        }}
                                        whileTap={{
                                            scale: 0.97,
                                        }}
                                    >
                                        Get Started
                                    </motion.button>

                                </SignUpButton>


                            </div>

                        )}

                    </div>

                </div>

            </div>

        </nav>

    );

}


export default Navbar;