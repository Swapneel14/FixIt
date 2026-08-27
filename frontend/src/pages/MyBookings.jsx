import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

import {
    FaCalendarCheck,
    FaClock,
    FaLocationDot,
    FaWrench,
    FaCircleInfo
} from "react-icons/fa6";

import { getMyBookings } from "../services/serviceRequestApi.js";

import "../css/MyBookings.css";


function MyBookings() {

    const { getToken } = useAuth();

    const [bookings, setBookings] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // ==========================================
    // FETCH BOOKINGS
    // ==========================================

    useEffect(() => {

        const fetchBookings = async () => {

            try {

                setLoading(true);

                setError("");

                const token = await getToken();

                const data =
                    await getMyBookings(token);

                setBookings(
                    data.bookings || []
                );

            }

            catch (err) {

                console.error(
                    "My bookings error:",
                    err
                );

                setError(
                    err.message ||
                    "Failed to load your bookings"
                );

            }

            finally {

                setLoading(false);

            }

        };


        fetchBookings();

    }, [getToken]);


    // ==========================================
    // FORMAT SERVICE
    // ==========================================

    const formatService = (service) => {

        if (!service) {
            return "Service";
        }

        return service
            .replaceAll("_", " ")
            .toLowerCase()
            .replace(
                /\b\w/g,
                char => char.toUpperCase()
            );

    };


    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (date) => {

        if (!date) {
            return "Not specified";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    // ==========================================
    // STATUS CLASS
    // ==========================================

    const getStatusClass = (status) => {

        switch (status) {

            case "PENDING":
                return "my-booking-status-pending";

            case "ACCEPTED":
                return "my-booking-status-accepted";

            case "REJECTED":
                return "my-booking-status-rejected";

            default:
                return "my-booking-status-default";

        }

    };


    // ==========================================
    // STATUS TEXT
    // ==========================================

    const getStatusText = (status) => {

        switch (status) {

            case "PENDING":
                return "Pending";

            case "ACCEPTED":
                return "Accepted";

            case "REJECTED":
                return "Rejected";

            case "COMPLETED":
                return "Completed";

            case "CANCELLED":
                return "Cancelled";

            default:
                return status || "Unknown";

        }

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <section className="my-bookings-page">

                <div className="container">

                    <div className="my-bookings-loading">

                        <div className="my-bookings-spinner"></div>

                        <p>
                            Loading your bookings...
                        </p>

                    </div>

                </div>

            </section>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (

            <section className="my-bookings-page">

                <div className="container">

                    <div className="my-bookings-error">

                        <FaCircleInfo size={30} />

                        <h3>
                            Couldn't load bookings
                        </h3>

                        <p>
                            {error}
                        </p>

                    </div>

                </div>

            </section>

        );

    }


    // ==========================================
    // MAIN PAGE
    // ==========================================

    return (

        <section className="my-bookings-page">

            <div className="container">


                {/* ==================================
                    HEADER
                ================================== */}

                <div className="my-bookings-header">

                    <div>

                        <div className="my-bookings-eyebrow">

                            <span></span>

                            FIXIT DASHBOARD

                        </div>


                        <h1>
                            My Bookings
                        </h1>


                        <p>
                            Track your service requests
                            and stay updated with every booking.
                        </p>

                    </div>


                    {/* BOOKING COUNT */}

                    <div className="my-bookings-count">

                        <strong>
                            {bookings.length}
                        </strong>

                        <span>

                            {bookings.length === 1
                                ? "Booking"
                                : "Bookings"
                            }

                        </span>

                    </div>

                </div>


                {/* ==================================
                    EMPTY STATE
                ================================== */}

                {bookings.length === 0 ? (

                    <div className="my-bookings-empty">

                        <div className="my-bookings-empty-icon">

                            <FaCalendarCheck />

                        </div>


                        <h3>
                            No bookings yet
                        </h3>


                        <p>
                            Your service requests will appear here.
                        </p>

                    </div>

                ) : (


                    /* ==================================
                        BOOKINGS
                    ================================== */

                    <div className="my-bookings-list">

                        {bookings.map(
                            (booking) => (

                                <BookingCard

                                    key={booking._id}

                                    booking={booking}

                                    formatService={
                                        formatService
                                    }

                                    formatDate={
                                        formatDate
                                    }

                                    getStatusClass={
                                        getStatusClass
                                    }

                                    getStatusText={
                                        getStatusText
                                    }

                                />

                            )
                        )}

                    </div>

                )}

            </div>

        </section>

    );

}


/* =========================================================
   BOOKING CARD
========================================================= */

function BookingCard({

    booking,

    formatService,

    formatDate,

    getStatusClass,

    getStatusText

}) {

    return (

        <div className="my-booking-card">


            {/* ==================================
                TOP
            ================================== */}

            <div className="my-booking-top">


                {/* SERVICE */}

                <div className="my-booking-service">

                    <div className="my-booking-service-icon">

                        <FaWrench />

                    </div>


                    <div>

                        <h3>

                            {formatService(
                                booking.service
                            )}

                        </h3>


                        <span>

                            Booking #

                            {booking._id
                                ?.slice(-6)
                                .toUpperCase()
                            }

                        </span>

                    </div>

                </div>


                {/* STATUS */}

                <div
                    className={`
                        my-booking-status
                        ${getStatusClass(
                            booking.status
                        )}
                    `}
                >

                    <span></span>

                    {getStatusText(
                        booking.status
                    )}

                </div>

            </div>


            {/* ==================================
                ISSUE
            ================================== */}

            <div className="my-booking-issue">

                <span>
                    Issue
                </span>


                <p>

                    {booking.issueDescription}

                </p>

            </div>


            {/* ==================================
                DETAILS
            ================================== */}

            <div className="my-booking-details">


                <BookingDetail

                    icon={
                        <FaCalendarCheck />
                    }

                    label="Preferred Date"

                    value={
                        formatDate(
                            booking.preferredDate
                        )
                    }

                />


                <BookingDetail

                    icon={
                        <FaClock />
                    }

                    label="Preferred Time"

                    value={
                        booking.preferredTime ||
                        "Not specified"
                    }

                />


                <BookingDetail

                    icon={
                        <FaLocationDot />
                    }

                    label="Location"

                    value={

                        booking.location?.city ||

                        booking.location?.address ||

                        "Location provided"

                    }

                />

            </div>


            {/* ==================================
                PROVIDER
            ================================== */}

            {booking.provider && (

                <div className="my-booking-provider">


                    {/* PROVIDER IMAGE */}

                    <div className="my-booking-provider-image">

                        {booking.provider.profileImage ? (

                            <img

                                src={
                                    booking.provider.profileImage
                                }

                                alt={
                                    booking.provider.name
                                }

                            />

                        ) : (

                            <span>

                                {booking.provider.name
                                    ?.charAt(0)
                                    .toUpperCase()
                                }

                            </span>

                        )}

                    </div>


                    {/* PROVIDER INFO */}

                    <div className="my-booking-provider-info">

                        <span>
                            Service Provider
                        </span>


                        <strong>

                            {booking.provider.name}

                        </strong>

                    </div>


                    {/* RATING */}

                    <div className="my-booking-provider-rating">

                        ★

                        {booking.provider.rating
                            ?.toFixed(1) ||
                            "0.0"
                        }

                    </div>

                </div>

            )}

        </div>

    );

}


/* =========================================================
   BOOKING DETAIL
========================================================= */

function BookingDetail({

    icon,

    label,

    value

}) {

    return (

        <div className="my-booking-detail">

            <div className="my-booking-detail-icon">

                {icon}

            </div>


            <div>

                <span>
                    {label}
                </span>


                <strong>

                    {value}

                </strong>

            </div>

        </div>

    );

}


export default MyBookings;