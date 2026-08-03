import { useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";



import api from "../services/api";

import "../css/CompleteProfile.css";


function CompleteProfile() {

  const { getToken } = useAuth();
  const { user } = useUser();

  const navigate = useNavigate();

  //Role Tracking
  const [role, setRole] = useState("");

  const [formData, setFormData] = useState({

    name: user?.fullName || "",

    profileImage:
      user?.imageUrl || "",

    city: "",

    state: "",

    address: "",

    longitude: "",

    latitude: "",

    services: [],

    experience: "",

    bio: "",

  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);


  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  const servicesList = [

    "AC_REPAIR",
    "LAPTOP_REPAIR",
    "PLUMBER",
    "ELECTRICIAN",
    "CAR_MECHANIC",

  ];

  const getCoordinates = async () => {
    try {
      const query = `${formData.address}, ${formData.city}, ${formData.state}`;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.length === 0) {
        setError("Location not found.");
        return false;
      }

      setFormData((prev) => ({
        ...prev,
        latitude: data[0].lat,
        longitude: data[0].lon,
      }));

      return true;
    } catch (err) {
      setError("Unable to fetch location.");
      return false;
    }
  };


  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setFormData((prev) => ({

      ...prev,

      [name]: value,

    }));

  };


  const handleServiceChange = (service) => {

    setFormData((prev) => {

      const alreadySelected =
        prev.services.includes(service);


      if (alreadySelected) {

        return {

          ...prev,

          services:
            prev.services.filter(
              (item) =>
                item !== service
            ),

        };

      }


      return {

        ...prev,

        services: [
          ...prev.services,
          service,
        ],

      };

    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    const found = await getCoordinates();

    if (!found) return;



    if (!role) {

      setError(
        "Please select how you want to use FixIt."
      );

      return;

    }


    if (
      role === "PROVIDER" &&
      formData.services.length === 0
    ) {

      setError(
        "Please select at least one service."
      );

      return;

    }


    setLoading(true);

    setError("");


    try {

      const token =
        await getToken();

      console.log(token);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      console.log(headers);


      await api.post(
        "/api/users",
        {

          name:
            formData.name,

          profileImage:
            formData.profileImage,

          roles: [role],

          services:
            role === "PROVIDER"
              ? formData.services
              : [],

          location: {

            type: "Point",

            coordinates: [

              Number(
                formData.longitude
              ) || 0,

              Number(
                formData.latitude
              ) || 0,

            ],

            city:
              formData.city,

            state:
              formData.state,

          },

          experience:
            role === "PROVIDER"
              ? Number(formData.experience)
              : undefined,

          bio:
            role === "PROVIDER"
              ? formData.bio
              : undefined,

        },

        {

          headers

        }

      );


      navigate("/");

    } catch (error) {

      console.error(error);


      setError(

        error.response
          ?.data
          ?.message ||

        "Failed to create profile."

      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="complete-profile-page">

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-lg-8">


            <div className="profile-header" data-aos="fade-down">

              <div className="brand-badge">
                FIXIT
              </div>

              <h1>
                Welcome to FixIt
              </h1>

              <p>
                Tell us a little about yourself
                to get started.
              </p>

            </div>


            {!role ? (

              <div className="role-selection" data-aos="fade-up">

                <h3>
                  How do you want to use FixIt?
                </h3>

                <p className="text-muted">
                  You can become a provider
                  anytime later.
                </p>


                <div className="row g-4 mt-3">


                  {/* CUSTOMER */}

                  <div className="col-md-6" data-aos="fade-right">

                    <button

                      type="button"

                      className="role-card"

                      onClick={() =>
                        setRole("CUSTOMER")
                      }

                    >

                      <div className="role-icon">

                        <i className="bi bi-person"></i>

                      </div>


                      <h4>
                        Find a Service
                      </h4>


                      <p>
                        I need help with a
                        repair or service.
                      </p>


                      <span>
                        Continue as Customer
                        <i className="bi bi-arrow-right ms-2"></i>
                      </span>

                    </button>

                  </div>


                  {/* PROVIDER */}

                  <div className="col-md-6">

                    <button

                      type="button"

                      className="role-card"

                      onClick={() =>
                        setRole("PROVIDER")
                      }

                    >

                      <div className="role-icon">

                        <i className="bi bi-tools"></i>

                      </div>


                      <h4>
                        Provide a Service
                      </h4>


                      <p>
                        I want to offer my
                        professional services.
                      </p>


                      <span>
                        Continue as Provider
                        <i className="bi bi-arrow-right ms-2"></i>
                      </span>

                    </button>

                  </div>


                </div>

              </div>

            ) : (

              <form
                className="profile-form"
                onSubmit={handleSubmit}
                data-aos="fade-up"
              >


                <div className="form-top">

                  <button

                    type="button"

                    className="back-button"

                    onClick={() =>
                      setRole("")
                    }

                  >

                    <i className="bi bi-arrow-left"></i>

                    Change role

                  </button>


                  <span className="role-label">

                    {role === "CUSTOMER"

                      ? "Customer Profile"

                      : "Provider Profile"

                    }

                  </span>

                </div>


                {error && (

                  <div className="alert alert-danger">

                    {error}

                  </div>

                )}


                {/* NAME */}

                <div className="mb-4">

                  <label>
                    Full Name
                  </label>

                  <input

                    type="text"

                    name="name"

                    className="form-control"

                    value={
                      formData.name
                    }

                    onChange={
                      handleChange
                    }

                    placeholder="Enter your full name"

                    required

                  />

                </div>


                {/* LOCATION */}

                <div className="section-title">

                  <i className="bi bi-geo-alt"></i>

                  Your Location

                </div>


                <div className="mb-3">

                  <label>
                    Address
                  </label>

                  <input

                    type="text"

                    name="address"

                    className="form-control"

                    value={
                      formData.address
                    }

                    onChange={
                      handleChange
                    }

                    placeholder="Search your address"

                    required

                  />

                </div>


                <div className="row">

                  <div className="col-md-6 mb-3">

                    <label>
                      City
                    </label>

                    <input

                      type="text"

                      name="city"

                      className="form-control"

                      value={
                        formData.city
                      }

                      onChange={
                        handleChange
                      }

                      placeholder="Kolkata"

                      required

                    />

                  </div>


                  <div className="col-md-6 mb-3">

                    <label>
                      State
                    </label>

                    <input

                      type="text"

                      name="state"

                      className="form-control"

                      value={
                        formData.state
                      }

                      onChange={
                        handleChange
                      }

                      placeholder="West Bengal"

                      required

                    />

                  </div>

                </div>


                {/* PROVIDER ONLY */}

                {role === "PROVIDER" && (

                  <>

                    <div className="section-title mt-4">

                      <i className="bi bi-tools"></i>

                      Your Services

                    </div>


                    <div className="service-grid">

                      {servicesList.map(
                        (service) => (

                          <button

                            key={service}

                            type="button"

                            className={

                              formData.services.includes(
                                service
                              )

                                ? "service-option active"

                                : "service-option"

                            }

                            onClick={() =>
                              handleServiceChange(
                                service
                              )
                            }

                          >

                            {service
                              .replaceAll(
                                "_",
                                " "
                              )}

                          </button>

                        )
                      )}

                    </div>


                    <div className="row mt-4">

                      <div className="col-md-6 mb-3">

                        <label>
                          Years of Experience
                        </label>

                        <input

                          type="number"

                          name="experience"

                          className="form-control"

                          value={
                            formData.experience
                          }

                          onChange={
                            handleChange
                          }

                          min="0"

                          placeholder="e.g. 5"

                        />

                      </div>

                    </div>


                    <div className="mb-4">

                      <label>
                        About Your Service
                      </label>

                      <textarea

                        name="bio"

                        className="form-control"

                        rows="4"

                        value={
                          formData.bio
                        }

                        onChange={
                          handleChange
                        }

                        placeholder="Tell customers about your experience and services..."

                      />

                    </div>

                  </>

                )}


                <button

                  type="submit"

                  className="submit-button"

                  disabled={loading}

                >

                  {loading

                    ? "Creating Profile..."

                    : "Complete Profile"}

                  {!loading && (

                    <i className="bi bi-arrow-right ms-2"></i>

                  )}

                </button>


              </form>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}


export default CompleteProfile;