import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    FaArrowLeft,
    FaStar,
    FaLocationDot,
    FaBriefcase,
    FaCheck,
    FaCalendarCheck
} from "react-icons/fa6";

import { motion } from "framer-motion";

import { getProviderbyId } from "../services/providerApi.js";

import "../css/ProviderProfile.css";


function ProviderProfile() {

    const { id } = useParams();

    const navigate = useNavigate();


    const [provider, setProvider] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ==========================================
    // FETCH PROVIDER
    // ==========================================

    useEffect(() => {

        const fetchProvider = async () => {

            try {

                setLoading(true);

                setError("");


                const data =
                    await getProviderbyId(id);


                setProvider(
                    data.provider
                );


            } catch (err) {

                console.error(
                    "Provider profile error:",
                    err
                );


                setError(
                    err.message ||
                    "Failed to load provider"
                );


            } finally {

                setLoading(false);

            }

        };


        if (id) {

            fetchProvider();

        }

    }, [id]);


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <section className="provider-profile-page">

                <div className="container">

                    <div className="provider-profile-loading">

                        <div className="provider-profile-spinner"></div>

                        <p>
                            Loading provider profile...
                        </p>

                    </div>

                </div>

            </section>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error || !provider) {

        return (

            <section className="provider-profile-page">

                <div className="container">

                    <div className="provider-profile-error">

                        <h2>
                            Provider Not Found
                        </h2>

                        <p>
                            {error ||
                                "This provider could not be found."
                            }
                        </p>

                        <button
                            onClick={() =>
                                navigate(-1)
                            }
                        >
                            Go Back
                        </button>

                    </div>

                </div>

            </section>

        );

    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <section className="provider-profile-page">

            <div className="container">


                {/* ==================================
                    BACK BUTTON
                ================================== */}

                <motion.button
                    className="provider-profile-back-btn"

                    onClick={() =>
                        navigate(-1)
                    }

                    whileHover={{
                        x: -4
                    }}

                    whileTap={{
                        scale: 0.95
                    }}
                >

                    <FaArrowLeft />

                    Back to Providers

                </motion.button>


                {/* ==================================
                    PROFILE HERO
                ================================== */}

                <motion.div
                    className="provider-profile-hero"

                    initial={{
                        opacity: 0,
                        y: 30
                    }}

                    animate={{
                        opacity: 1,
                        y: 0
                    }}

                    transition={{
                        duration: 0.5
                    }}
                >


                    {/* PROFILE IMAGE */}

                    <div className="provider-profile-image-wrapper">

                        {provider.profileImage ? (

                            <img
                                src={
                                    provider.profileImage
                                }
                                alt={
                                    provider.name
                                }
                                className="provider-profile-image"
                            />

                        ) : (

                            <div className="provider-profile-placeholder">

                                {provider.name
                                    ?.charAt(0)
                                    .toUpperCase()
                                }

                            </div>

                        )}

                    </div>


                    {/* BASIC INFORMATION */}

                    <div className="provider-profile-main">

                        <div className="provider-profile-name-row">

                            <h1>
                                {provider.name}
                            </h1>


                            {provider.accountStatus ===
                                "ACTIVE" && (

                                <span className="provider-profile-verified">

                                    <FaCheck />

                                    Verified

                                </span>

                            )}

                        </div>


                        {/* RATING */}

                        <div className="provider-profile-rating">

                            <FaStar />

                            <strong>
                                {provider.rating
                                    ? provider.rating.toFixed(1)
                                    : "0.0"
                                }
                            </strong>

                            <span>
                                Provider Rating
                            </span>

                        </div>


                        {/* LOCATION */}

                        {provider.location && (

                            <div className="provider-profile-location">

                                <FaLocationDot />

                                <span>

                                    {provider.location.city}

                                    {provider.location.state &&
                                        `, ${provider.location.state}`
                                    }

                                </span>

                            </div>

                        )}

                    </div>


                    {/* BOOK BUTTON */}

                    <div className="provider-profile-action">

                        <motion.button
                            className="provider-profile-book-btn"

                            whileHover={{
                                scale: 1.03
                            }}

                            whileTap={{
                                scale: 0.97
                            }}

                            onClick={() => {

                                console.log(
                                    "Book provider:",
                                    provider._id
                                );

                                // Service request
                                // functionality will be
                                // connected here later.

                            }}
                        >

                            <FaCalendarCheck />

                            Book Service

                        </motion.button>

                    </div>

                </motion.div>


                {/* ==================================
                    CONTENT
                ================================== */}

                <div className="provider-profile-content">


                    {/* ==================================
                        ABOUT
                    ================================== */}

                    <motion.div
                        className="provider-profile-info-card"

                        initial={{
                            opacity: 0,
                            y: 20
                        }}

                        animate={{
                            opacity: 1,
                            y: 0
                        }}

                        transition={{
                            delay: 0.1
                        }}
                    >

                        <h2>
                            About
                        </h2>

                        <p className="provider-profile-bio">

                            {provider.bio ||
                                "This provider has not added a bio yet."
                            }

                        </p>

                    </motion.div>


                    {/* ==================================
                        EXPERIENCE
                    ================================== */}

                    <motion.div
                        className="provider-profile-info-card"

                        initial={{
                            opacity: 0,
                            y: 20
                        }}

                        animate={{
                            opacity: 1,
                            y: 0
                        }}

                        transition={{
                            delay: 0.2
                        }}
                    >

                        <div className="provider-profile-info-icon">

                            <FaBriefcase />

                        </div>

                        <h2>
                            Experience
                        </h2>

                        <div className="provider-profile-experience">

                            {provider.experience || 0}

                            <span>
                                years
                            </span>

                        </div>

                    </motion.div>


                    {/* ==================================
                        SERVICES
                    ================================== */}

                    <motion.div
                        className="provider-profile-info-card provider-profile-services-card"

                        initial={{
                            opacity: 0,
                            y: 20
                        }}

                        animate={{
                            opacity: 1,
                            y: 0
                        }}

                        transition={{
                            delay: 0.3
                        }}
                    >

                        <h2>
                            Services Offered
                        </h2>


                        <div className="provider-profile-services-list">

                            {provider.services?.map(
                                (service) => (

                                    <div
                                        className="provider-profile-service-tag"
                                        key={service}
                                    >

                                        <FaCheck />

                                        {service
                                            .replaceAll(
                                                "_",
                                                " "
                                            )
                                            .toLowerCase()
                                            .replace(
                                                /\b\w/g,
                                                char =>
                                                    char.toUpperCase()
                                            )
                                        }

                                    </div>

                                )
                            )}

                        </div>

                    </motion.div>


                </div>

            </div>

        </section>

    );

}


export default ProviderProfile;