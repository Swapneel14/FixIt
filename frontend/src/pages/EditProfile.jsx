import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaLocationCrosshairs,
    FaLocationDot,
    FaUser,
    FaImage,
    FaBriefcase,
    FaPen,
    FaBolt,
    FaFaucet,
    FaSnowflake,
    FaLaptop,
    FaCar
} from "react-icons/fa6";

import {
    getCurrentUser,
    updateCurrentUser
} from "../services/userApi";

import { useAuth } from "@clerk/clerk-react";

import "../css/EditProfile.css";


function EditProfile() {

    const navigate = useNavigate();

    const { getToken } = useAuth();


    // ==========================================
    // STATES
    // ==========================================

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [gettingLocation, setGettingLocation] =
        useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    const [form, setForm] = useState({

        name: "",

        profileImage: "",

        bio: "",

        experience: 0,

        services: [],

        roles: [],

        location: {

            type: "Point",

            coordinates: [0, 0],

            city: "",

            state: ""

        }

    });


    // ==========================================
    // CHECK WHETHER USER IS PROVIDER
    // ==========================================

    const isProvider =
        form.roles.includes("PROVIDER");


    // ==========================================
    // SERVICE LIST
    // ==========================================

    const serviceOptions = [

        {
            id: "AC_REPAIR",
            name: "AC Repair",
            icon: FaSnowflake
        },

        {
            id: "LAPTOP_REPAIR",
            name: "Laptop Repair",
            icon: FaLaptop
        },

        {
            id: "PLUMBER",
            name: "Plumber",
            icon: FaFaucet
        },

        {
            id: "ELECTRICIAN",
            name: "Electrician",
            icon: FaBolt
        },

        {
            id: "CAR_MECHANIC",
            name: "Car Mechanic",
            icon: FaCar
        }

    ];


    // ==========================================
    // LOAD CURRENT USER
    // ==========================================

    useEffect(() => {

        const loadProfile = async () => {

            try {

                setLoading(true);

                setError("");


                const data =
                    await getCurrentUser(getToken);


                const user =
                    data.user;


                setForm({

                    name:
                        user.name || "",

                    profileImage:
                        user.profileImage || "",

                    bio:
                        user.bio || "",

                    experience:
                        user.experience || 0,

                    services:
                        user.services || [],

                    roles:
                        user.roles || [],

                    location: {

                        type: "Point",

                        coordinates:
                            user.location?.coordinates ||
                            [0, 0],

                        city:
                            user.location?.city ||
                            "",

                        state:
                            user.location?.state ||
                            ""

                    }

                });

            }

            catch (err) {

                console.error(
                    "Load profile error:",
                    err
                );

                setError(
                    err.message ||
                    "Failed to load profile."
                );

            }

            finally {

                setLoading(false);

            }

        };


        loadProfile();

    }, [getToken]);


    // ==========================================
    // NORMAL INPUT CHANGE
    // ==========================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setForm((prev) => ({

            ...prev,

            [name]: value

        }));

    };


    // ==========================================
    // SERVICE SELECTION
    // ==========================================

    const handleServiceChange = (service) => {

        setForm((prev) => {

            const exists =
                prev.services.includes(service);


            if (exists) {

                return {

                    ...prev,

                    services:
                        prev.services.filter(
                            item => item !== service
                        )

                };

            }


            return {

                ...prev,

                services: [
                    ...prev.services,
                    service
                ]

            };

        });

    };


    // ==========================================
    // GET CURRENT LOCATION
    // ==========================================

    const getCurrentLocation = () => {

        if (!navigator.geolocation) {

            setError(
                "Your browser does not support geolocation."
            );

            return;

        }


        setGettingLocation(true);

        setError("");

        setSuccess("");


        navigator.geolocation.getCurrentPosition(

            (position) => {

                const latitude =
                    position.coords.latitude;


                const longitude =
                    position.coords.longitude;


                console.log(
                    "New Location:",
                    latitude,
                    longitude
                );


                /*
                 * GeoJSON format:
                 *
                 * [longitude, latitude]
                 */

                setForm((prev) => ({

                    ...prev,

                    location: {

                        ...prev.location,

                        coordinates: [
                            longitude,
                            latitude
                        ]

                    }

                }));


                setGettingLocation(false);


                setSuccess(
                    "Location updated. Save your profile to apply it."
                );

            },


            (locationError) => {

                console.error(
                    "Location error:",
                    locationError
                );


                setGettingLocation(false);


                if (
                    locationError.code ===
                    locationError.PERMISSION_DENIED
                ) {

                    setError(
                        "Location access was denied. Please allow location access in your browser."
                    );

                }

                else if (
                    locationError.code ===
                    locationError.POSITION_UNAVAILABLE
                ) {

                    setError(
                        "Your location could not be determined."
                    );

                }

                else if (
                    locationError.code ===
                    locationError.TIMEOUT
                ) {

                    setError(
                        "Location request timed out. Please try again."
                    );

                }

                else {

                    setError(
                        "Unable to get your current location."
                    );

                }

            },


            {
                enableHighAccuracy: true,

                timeout: 10000,

                maximumAge: 0

            }

        );

    };


    // ==========================================
    // SUBMIT
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        setError("");

        setSuccess("");

        setSaving(true);


        try {

            /*
             * Basic fields are always allowed.
             */

            const payload = {

                name:
                    form.name.trim(),

                profileImage:
                    form.profileImage.trim(),

                location: {

                    type: "Point",

                    coordinates:
                        form.location.coordinates,

                    city:
                        form.location.city.trim(),

                    state:
                        form.location.state.trim()

                }

            };


            /*
             * Provider-only fields
             *
             * Only send these if the user
             * actually has PROVIDER role.
             */

            if (isProvider) {

                payload.bio =
                    form.bio.trim();

                payload.experience =
                    Number(form.experience);

                payload.services =
                    form.services;

            }


            console.log(
                "Updating profile:",
                payload
            );


            await updateCurrentUser(
                payload,
                getToken
            );


            setSuccess(
                "Profile updated successfully."
            );


            setTimeout(() => {

                navigate("/services");

            }, 900);

        }

        catch (err) {

            console.error(
                "Update profile error:",
                err
            );


            setError(
                err.message ||
                "Failed to update profile."
            );

        }

        finally {

            setSaving(false);

        }

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <section className="edit-profile-page">

                <div className="container">

                    <div className="edit-profile-loading">

                        <div className="loading-spinner"></div>

                        <p>
                            Loading your profile...
                        </p>

                    </div>

                </div>

            </section>

        );

    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <section className="edit-profile-page">

            <div className="container">


                {/* ==================================
                    HEADER
                ================================== */}

                <div className="edit-profile-heading">

                    <div>

                        <span className="heading-label">
                            ACCOUNT SETTINGS
                        </span>

                        <h1>
                            Edit Profile
                        </h1>

                        <p>
                            Keep your FixIt profile
                            information up to date.
                        </p>

                    </div>

                </div>


                {/* ==================================
                    CARD
                ================================== */}

                <div className="edit-profile-card">


                    {/* ==================================
                        ALERTS
                    ================================== */}

                    {error && (

                        <div className="profile-alert error">

                            <span>
                                {error}
                            </span>

                        </div>

                    )}


                    {success && (

                        <div className="profile-alert success">

                            <span>
                                {success}
                            </span>

                        </div>

                    )}


                    <form
                        onSubmit={handleSubmit}
                    >


                        {/* ==================================
                            BASIC INFORMATION
                        ================================== */}

                        <div className="form-section">

                            <div className="section-heading">

                                <div className="section-icon">
                                    <FaUser />
                                </div>

                                <div>

                                    <h3>
                                        Basic Information
                                    </h3>

                                    <p>
                                        Update your public
                                        profile information.
                                    </p>

                                </div>

                            </div>


                            {/* NAME */}

                            <div className="form-group">

                                <label>
                                    Full Name
                                </label>

                                <div className="input-wrapper">

                                    <FaUser />

                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Your name"
                                        required
                                    />

                                </div>

                            </div>


                            {/* PROFILE IMAGE */}

                            <div className="form-group">

                                <label>
                                    Profile Image URL
                                </label>

                                <div className="input-wrapper">

                                    <FaImage />

                                    <input
                                        type="text"
                                        name="profileImage"
                                        value={
                                            form.profileImage
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="https://..."
                                    />

                                </div>

                            </div>


                            {/* ==================================
                                PROVIDER ONLY
                            ================================== */}

                            {isProvider && (

                                <>

                                    {/* BIO */}

                                    <div className="form-group">

                                        <label>
                                            About You
                                        </label>

                                        <div className="textarea-wrapper">

                                            <FaPen />

                                            <textarea
                                                name="bio"
                                                value={form.bio}
                                                onChange={
                                                    handleChange
                                                }
                                                maxLength={500}
                                                rows={5}
                                                placeholder="Tell customers about yourself and your services..."
                                            />

                                        </div>

                                        <div className="character-count">

                                            {form.bio.length}/500

                                        </div>

                                    </div>


                                    {/* EXPERIENCE */}

                                    <div className="form-group">

                                        <label>
                                            Experience
                                        </label>

                                        <div className="input-wrapper">

                                            <FaBriefcase />

                                            <input
                                                type="number"
                                                name="experience"
                                                min="0"
                                                value={
                                                    form.experience
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                            />

                                            <span className="input-suffix">
                                                years
                                            </span>

                                        </div>

                                    </div>

                                </>

                            )}

                        </div>


                        {/* ==================================
                            PROVIDER SERVICES
                        ================================== */}

                        {isProvider && (

                            <div className="form-section">

                                <div className="section-heading">

                                    <div className="section-icon">
                                        <FaBriefcase />
                                    </div>

                                    <div>

                                        <h3>
                                            Your Services
                                        </h3>

                                        <p>
                                            Select the services
                                            you provide.
                                        </p>

                                    </div>

                                </div>


                                <div className="services-grid">

                                    {serviceOptions.map(
                                        (service) => {

                                            const Icon =
                                                service.icon;


                                            const selected =
                                                form.services.includes(
                                                    service.id
                                                );


                                            return (

                                                <button
                                                    type="button"
                                                    key={service.id}
                                                    className={
                                                        `service-option ${
                                                            selected
                                                                ? "selected"
                                                                : ""
                                                        }`
                                                    }
                                                    onClick={() =>
                                                        handleServiceChange(
                                                            service.id
                                                        )
                                                    }
                                                >

                                                    <span className="service-option-icon">

                                                        <Icon />

                                                    </span>

                                                    <span>

                                                        {
                                                            service.name
                                                        }

                                                    </span>


                                                    <span className="service-check">

                                                        {selected
                                                            ? "✓"
                                                            : ""
                                                        }

                                                    </span>

                                                </button>

                                            );

                                        }
                                    )}

                                </div>

                            </div>

                        )}


                        {/* ==================================
                            LOCATION
                        ================================== */}

                        <div className="form-section">

                            <div className="section-heading">

                                <div className="section-icon">
                                    <FaLocationDot />
                                </div>

                                <div>

                                    <h3>
                                        Service Location
                                    </h3>

                                    <p>
                                        Your location helps
                                        FixIt find nearby
                                        services accurately.
                                    </p>

                                </div>

                            </div>


                            {/* CITY */}

                            <div className="form-group">

                                <label>
                                    City
                                </label>

                                <div className="input-wrapper">

                                    <FaLocationDot />

                                    <input
                                        type="text"
                                        name="city"
                                        value={
                                            form.location.city
                                        }
                                        onChange={
                                            (e) =>
                                                setForm(
                                                    prev => ({
                                                        ...prev,

                                                        location: {
                                                            ...prev.location,

                                                            city:
                                                                e.target.value
                                                        }
                                                    })
                                                )
                                        }
                                        placeholder="Your city"
                                    />

                                </div>

                            </div>


                            {/* STATE */}

                            <div className="form-group">

                                <label>
                                    State
                                </label>

                                <div className="input-wrapper">

                                    <FaLocationDot />

                                    <input
                                        type="text"
                                        name="state"
                                        value={
                                            form.location.state
                                        }
                                        onChange={
                                            (e) =>
                                                setForm(
                                                    prev => ({
                                                        ...prev,

                                                        location: {
                                                            ...prev.location,

                                                            state:
                                                                e.target.value
                                                        }
                                                    })
                                                )
                                        }
                                        placeholder="Your state"
                                    />

                                </div>

                            </div>


                            {/* CURRENT LOCATION */}

                            <div className="location-box">

                                <div className="location-info">

                                    <div className="location-icon">

                                        <FaLocationCrosshairs />

                                    </div>

                                    <div>

                                        <h4>
                                            Update your exact location
                                        </h4>

                                        <p>
                                            We use your device's
                                            location to calculate
                                            nearby service providers
                                            and requests.
                                        </p>

                                    </div>

                                </div>


                                <button
                                    type="button"
                                    className="location-btn"
                                    onClick={
                                        getCurrentLocation
                                    }
                                    disabled={
                                        gettingLocation
                                    }
                                >

                                    <FaLocationCrosshairs />

                                    {gettingLocation

                                        ? "Getting Location..."

                                        : "Use Current Location"

                                    }

                                </button>

                            </div>


                            {/* LOCATION STATUS */}

                            {form.location.coordinates[0] !== 0 &&
                             form.location.coordinates[1] !== 0 && (

                                <div className="location-status">

                                    <FaLocationDot />

                                    <span>
                                        Your location coordinates
                                        are ready to be saved.
                                    </span>

                                </div>

                            )}

                        </div>


                        {/* ==================================
                            ACTIONS
                        ================================== */}

                        <div className="edit-profile-actions">

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() =>
                                    navigate(-1)
                                }
                                disabled={saving}
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                className="save-btn"
                                disabled={saving}
                            >

                                {saving ? (

                                    <>
                                        <span className="button-spinner"></span>

                                        Saving...
                                    </>

                                ) : (

                                    "Save Changes"

                                )}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </section>

    );

}


export default EditProfile;