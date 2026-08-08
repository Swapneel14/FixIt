import "../../css/ProviderCard.css";

import { motion } from "framer-motion";

import {
  FaStar,
  FaLocationDot,
  FaShieldHalved,
  FaBriefcase,
  FaArrowRight,
} from "react-icons/fa6";

function ProviderCard({ provider }) {

  const services = provider.services || [];

  return (

    <motion.div
      className="provider-card"

      initial={{
        opacity: 0,
        y: 25,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      whileHover={{
        y: -6,
      }}

      transition={{
        duration: 0.25,
      }}
    >

      {/* =========================
          TOP
      ========================= */}

      <div className="provider-top">

        <div className="provider-profile">

          <div className="provider-avatar">

            <img
              src={
                provider.profileImage ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  provider.name
                )}&background=FFD000&color=111`
              }
              alt={provider.name}
            />

            <span className="verified-icon">
              <FaShieldHalved />
            </span>

          </div>


          <div className="provider-info">

            <div className="provider-name-row">

              <h4>
                {provider.name}
              </h4>

              <span className="verified-badge">
                Verified
              </span>

            </div>


            <p className="provider-location">

              <FaLocationDot />

              {provider.location?.city
                ? `${provider.location.city}, ${provider.location.state}`
                : "Location unavailable"}

            </p>

          </div>

        </div>


        {/* Rating */}

        <div className="provider-rating">

          <FaStar />

          <span>
            {provider.rating > 0
              ? provider.rating.toFixed(1)
              : "New"}
          </span>

        </div>

      </div>


      {/* =========================
          DESCRIPTION
      ========================= */}

      {provider.bio && (

        <p className="provider-bio">

          {provider.bio.length > 120
            ? `${provider.bio.substring(0, 120)}...`
            : provider.bio}

        </p>

      )}


      {/* =========================
          DETAILS
      ========================= */}

      <div className="provider-details">

        <div className="provider-detail">

          <FaBriefcase />

          <span>

            {provider.experience || 0}

            {provider.experience === 1
              ? " year experience"
              : " years experience"}

          </span>

        </div>


        {provider.distance !== undefined && (

          <div className="provider-detail">

            <FaLocationDot />

            <span>
              {provider.distance.toFixed(1)} km away
            </span>

          </div>

        )}

      </div>


      {/* =========================
          SERVICES
      ========================= */}

      <div className="provider-services">

        {services.length > 0 ? (

          services.slice(0, 3).map((service) => (

            <span
              className="service-tag"
              key={service}
            >
              {service.replaceAll("_", " ")}
            </span>

          ))

        ) : (

          <span className="service-tag">
            No services listed
          </span>

        )}


        {services.length > 3 && (

          <span className="service-tag more-tag">

            +{services.length - 3}

          </span>

        )}

      </div>


      {/* =========================
          FOOTER
      ========================= */}

      <div className="provider-bottom">

        <div className="provider-status">

          <span className="status-dot"></span>

          <span>
            Active provider
          </span>

        </div>


        <button className="provider-button">

          View Profile

          <FaArrowRight />

        </button>

      </div>

    </motion.div>

  );
}

export default ProviderCard;