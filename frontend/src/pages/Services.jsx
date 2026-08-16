import { useState } from "react";

import ServiceFilterBar from "../components/Service-Components/FilterBar";
import RadiusFilter from "../components/Service-Components/RadiusFilter";
import ProviderList from "../components/Service-Components/ProviderList";

import { getNearbyProviders } from "../services/providerApi";

import "../css/Service.css";
import { useEffect } from "react";


function Services() {

    const [selectedService, setSelectedService] = useState("all");

    const [radius, setRadius] = useState(10);


    // Temporary provider data
    // Later this will come from your backend

    const [providers, setProviders] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [location, setLocation] =
        useState(null);

    //Getting User's Current Location

    useEffect(() => {

        if (!navigator.geolocation) {
            setError("Your Browser Doesnt Support Geolocation");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                setLocation({
                    latitude,
                    longitude
                });

                console.log(
                    "User Location:",
                    latitude,
                    longitude
                );


            },

            (error) => {

                console.error(
                    "Location Error:",
                    error
                );

                setError(
                    "Please allow location access to find nearby providers."
                );

            }
        )

    }, [])

    //Fetch NearByProviders:-
    useEffect(() => {

        if (!location) {
            return;
        }

        const fetchProvider = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getNearbyProviders({
                    service: selectedService,
                    radius: radius,
                    latitude: location.latitude,
                    longitude: location.longitude
                });

                console.log(
                    "Nearby Providers:",
                    data.providers
                );


                setProviders(
                    data.providers || []
                );

            }
            catch (error) {
                console.error(
                    "Provider Fetch Error:",
                    error
                );


                setError(
                    error.message ||
                    "Failed to fetch nearby providers."
                );


                setProviders([]);
            }

            finally {

                setLoading(false);

            }
        }
         fetchProvider();

    }, [ selectedService,
        radius,
        location])


    return (

        <section className="services-page">

            <div className="container">


                {/* =========================
                    PAGE HEADER
                ========================= */}

                <div className="services-header">

                    <h2>
                        Find Trusted Professionals
                    </h2>

                    <p>
                        Compare verified local service providers,
                        find professionals nearby, and choose the
                        right person for your job.
                    </p>

                </div>


                {/* =========================
                    SERVICE FILTER
                ========================= */}

                <ServiceFilterBar

                    selectedService={selectedService}

                    setSelectedService={setSelectedService}

                />


                {/* =========================
                    RADIUS FILTER
                ========================= */}

                <RadiusFilter

                    radius={radius}

                    setRadius={setRadius}

                />


                {/* =========================
                    PROVIDERS
                ========================= */}

                <div className="providers-section">


                    <div className="providers-title">

                        <h3>
                            Available Professionals
                        </h3>

                        <span>
                            {providers.length} providers nearby
                        </span>

                    </div>


                    <ProviderList

                        providers={providers}

                    />


                </div>


            </div>

        </section>

    );

}


export default Services;