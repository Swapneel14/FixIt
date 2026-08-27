import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

import {
    FaArrowLeft,
    FaCalendarCheck,
    FaClock,
    FaLocationDot,
    FaPaperPlane,
    FaToolbox
} from "react-icons/fa6";

import { getProviderbyId } from "../services/providerApi.js";
import { createServiceRequest } from "../services/serviceRequestApi.js";

import "../css/ServiceRequest.css";


function ServiceRequest() {

    const { providerId } = useParams();

    const navigate = useNavigate();

    const { getToken } = useAuth();


    // ==========================================
    // PROVIDER
    // ==========================================

    const [provider, setProvider] =
        useState(null);

    const [loadingProvider, setLoadingProvider] =
        useState(true);


    // ==========================================
    // FORM
    // ==========================================

    const [service, setService] =
        useState("");

    const [issueDescription, setIssueDescription] =
        useState("");

    const [preferredDate, setPreferredDate] =
        useState("");

    const [preferredTime, setPreferredTime] =
        useState("");

    const [location, setLocation] = useState({
        type: "Point",
        coordinates: [0, 0]
    });


    // ==========================================
    // UI STATE
    // ==========================================

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [error, setError] =
        useState("");


    // ==========================================
    // FETCH PROVIDER
    // ==========================================

    useEffect(() => {

        const fetchProvider = async () => {

            try {

                setLoadingProvider(true);

                const data =
                    await getProviderbyId(providerId);

                setProvider(
                    data.provider
                );

            }

            catch (err) {

                console.error(
                    "Provider loading error:",
                    err
                );

                setError(
                    err.message ||
                    "Failed to load provider"
                );

            }

            finally {

                setLoadingProvider(false);

            }

        };


        if (providerId) {

            fetchProvider();

        }

    }, [providerId]);


    // ==========================================
    // CURRENT LOCATION
    // ==========================================

    const handleUseCurrentLocation = () => {

        if (!navigator.geolocation) {

            setError(
                "Geolocation is not supported by your browser."
            );

            return;
        }

        navigator.geolocation.getCurrentPosition(

            (position) => {

                const latitude =
                    position.coords.latitude;

                const longitude =
                    position.coords.longitude;

                setLocation({
                    type: "Point",

                    coordinates: [
                        longitude,
                        latitude
                    ]
                });

                setError("");

            },

            () => {

                setError(
                    "Unable to get your current location."
                );

            }

        );

    };


    // ==========================================
    // SUBMIT
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        if (!service) {

            setError(
                "Please select a service."
            );

            return;

        }


        if (!issueDescription.trim()) {

            setError(
                "Please describe your issue."
            );

            return;

        }


        if (!preferredDate) {

            setError(
                "Please select a preferred date."
            );

            return;

        }


        if (!preferredTime) {

            setError(
                "Please select a preferred time."
            );

            return;

        }


        if (
            !location ||
            location.type !== "Point" ||
            !location.coordinates ||
            location.coordinates.length !== 2 ||
            (
                location.coordinates[0] === 0 &&
                location.coordinates[1] === 0
            )
        ) {
            setError("Please select your current location.");
            return;
        }


        try {

            setIsSubmitting(true);


            const token =
                await getToken();


            const requestData = {

                providerId,

                service,

                issueDescription:
                    issueDescription.trim(),

                preferredDate,

                preferredTime,

                location

            };


            await createServiceRequest(
                requestData,
                token
            );


            // For now return to services page

            navigate("/services");

        }

        catch (err) {

            console.error(
                "Service request error:",
                err
            );

            setError(
                err.message ||
                "Failed to create service request."
            );

        }

        finally {

            setIsSubmitting(false);

        }

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loadingProvider) {

        return (

            <section className="service-request-page">

                <div className="service-request-loading">

                    <div className="service-request-loading-spinner"></div>

                    <p>
                        Loading provider...
                    </p>

                </div>

            </section>

        );

    }


    // ==========================================
    // ERROR / PROVIDER NOT FOUND
    // ==========================================

    if (!provider) {

        return (

            <section className="service-request-page">

                <div className="service-request-error-box">

                    <h2>
                        Provider Not Found
                    </h2>

                    <p>
                        {error ||
                            "Unable to load this provider."
                        }
                    </p>

                    <button
                        type="button"
                        className="service-request-back-button"
                        onClick={() =>
                            navigate(-1)
                        }
                    >
                        <FaArrowLeft />
                        Go Back
                    </button>

                </div>

            </section>

        );

    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <section className="service-request-page">

            <div className="service-request-wrapper">


                {/* ==================================
                    BACK
                ================================== */}

                <button
                    type="button"
                    className="service-request-back-button"
                    onClick={() =>
                        navigate(-1)
                    }
                >

                    <FaArrowLeft />

                    Back to Provider

                </button>


                {/* ==================================
                    HEADER
                ================================== */}

                <div className="service-request-header">

                    <div className="service-request-header-icon">

                        <FaToolbox />

                    </div>

                    <div>

                        <h1>
                            Book a Service
                        </h1>

                        <p>
                            Tell us what you need help with.
                        </p>

                    </div>

                </div>


                {/* ==================================
                    PROVIDER
                ================================== */}

                <div className="service-request-provider-box">

                    <div className="service-request-provider-image-wrapper">

                        {provider.profileImage ? (

                            <img
                                src={provider.profileImage}
                                alt={provider.name}
                                className="service-request-provider-image"
                            />

                        ) : (

                            <div className="service-request-provider-placeholder">

                                {provider.name
                                    ?.charAt(0)
                                    .toUpperCase()
                                }

                            </div>

                        )}

                    </div>


                    <div className="service-request-provider-info">

                        <span>
                            Booking with
                        </span>

                        <h3>
                            {provider.name}
                        </h3>

                        {provider.location && (

                            <p>

                                <FaLocationDot />

                                {provider.location.city}

                                {provider.location.state &&
                                    `, ${provider.location.state}`
                                }

                            </p>

                        )}

                    </div>

                </div>


                {/* ==================================
                    FORM
                ================================== */}

                <form
                    className="service-request-form"
                    onSubmit={handleSubmit}
                >


                    {/* SERVICE */}

                    <div className="service-request-field">

                        <label>
                            Service Required
                        </label>

                        <select
                            value={service}
                            onChange={(e) =>
                                setService(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                Select a service
                            </option>

                            {provider.services?.map(
                                (providerService) => (

                                    <option
                                        key={providerService}
                                        value={providerService}
                                    >
                                        {providerService
                                            .replaceAll("_", " ")
                                            .toLowerCase()
                                            .replace(
                                                /\b\w/g,
                                                (char) =>
                                                    char.toUpperCase()
                                            )
                                        }
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* ISSUE */}

                    <div className="service-request-field">

                        <label>
                            Describe Your Issue
                        </label>

                        <textarea
                            rows="5"
                            placeholder="Explain what problem you are facing..."
                            value={issueDescription}
                            onChange={(e) =>
                                setIssueDescription(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* DATE + TIME */}

                    <div className="service-request-date-time-row">


                        <div className="service-request-field">

                            <label>

                                <FaCalendarCheck />

                                Preferred Date

                            </label>

                            <input
                                type="date"
                                value={preferredDate}
                                onChange={(e) =>
                                    setPreferredDate(
                                        e.target.value
                                    )
                                }
                            />

                        </div>


                        <div className="service-request-field">

                            <label>

                                <FaClock />

                                Preferred Time

                            </label>

                            <input
                                type="time"
                                value={preferredTime}
                                onChange={(e) =>
                                    setPreferredTime(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>


                    {/* LOCATION */}

                    <div className="service-request-field">

                        <label>

                            <FaLocationDot />

                            Service Location

                        </label>


                        <div className="service-request-location-wrapper">

                            <input
                                type="text"
                                placeholder="Enter your location"
                                value={
                                    location.coordinates[0] !== 0
                                        ? `${location.coordinates[1]}, ${location.coordinates[0]}`
                                        : ""
                                }
                                onChange={(e) =>
                                    setLocation(
                                        e.target.value
                                    )
                                }
                            />

                            <button
                                type="button"
                                className="service-request-location-button"
                                onClick={
                                    handleUseCurrentLocation
                                }
                            >

                                <FaLocationDot />

                                Use Current Location

                            </button>

                        </div>

                    </div>


                    {/* ERROR */}

                    {error && (

                        <div className="service-request-error">

                            {error}

                        </div>

                    )}


                    {/* SUBMIT */}

                    <button
                        type="submit"
                        className="service-request-submit-button"
                        disabled={isSubmitting}
                    >

                        <FaPaperPlane />

                        {isSubmitting
                            ? "Sending Request..."
                            : "Send Service Request"
                        }

                    </button>


                    <p className="service-request-note">

                        Your request will initially be marked as
                        <strong> Pending </strong>
                        until the provider responds.

                    </p>

                </form>

            </div>

        </section>

    );

}


export default ServiceRequest;