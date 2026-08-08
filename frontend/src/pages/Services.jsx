import { useState } from "react";

import ServiceFilterBar from "../components/Service-Components/FilterBar";
import RadiusFilter from "../components/Service-Components/RadiusFilter";
import ProviderList from "../components/Service-Components/ProviderList";

import "../css/Service.css";


function Services() {

    const [selectedService, setSelectedService] = useState("all");

    const [radius, setRadius] = useState(10);


    // Temporary provider data
    // Later this will come from your backend

    const [providers] = useState([

        {
            _id: "1",

            name: "Raj Electronics",

            profileImage: "",

            isVerified: true,

            rating: 4.9,

            bio: "Experienced electrician providing reliable electrical repair and installation services.",

            experience: 6,

            services: [
                "ELECTRICIAN",
                "AC_REPAIR"
            ],

            location: {
                city: "Kolkata",
                state: "West Bengal",

                coordinates: [
                    88.3639,
                    22.5726
                ]
            },

            distance: 2.4
        },


        {
            _id: "2",

            name: "Amit Home Services",

            profileImage: "",

            isVerified: true,

            rating: 4.8,

            bio: "Professional plumber with years of experience in residential plumbing services.",

            experience: 5,

            services: [
                "PLUMBER"
            ],

            location: {
                city: "Kolkata",
                state: "West Bengal",

                coordinates: [
                    88.3700,
                    22.5750
                ]
            },

            distance: 3.7
        },


        {
            _id: "3",

            name: "TechFix Solutions",

            profileImage: "",

            isVerified: false,

            rating: 4.6,

            bio: "Laptop and computer repair specialist handling hardware and software issues.",

            experience: 4,

            services: [
                "LAPTOP_REPAIR"
            ],

            location: {
                city: "Kolkata",
                state: "West Bengal",

                coordinates: [
                    88.3500,
                    22.5600
                ]
            },

            distance: 5.2
        }

    ]);


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