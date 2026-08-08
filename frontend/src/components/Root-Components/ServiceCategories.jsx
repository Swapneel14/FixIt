import React from 'react'
import "../../css/SG.css";


import { motion } from "framer-motion";
import {
  FaBolt,
  FaFaucet,
  FaSnowflake,
  FaLaptopCode,
  FaCarSide,
  FaPaintRoller,
  FaArrowRight,
} from "react-icons/fa";

const services = [
  {
    title: "Electrician",
    providers: "245 Verified Experts",
    rating: "4.9",
    icon: FaBolt,
    color: "#FFD000",
  },
  {
    title: "Plumber",
    providers: "190 Verified Experts",
    rating: "4.8",
    icon: FaFaucet,
    color: "#00D9FF",
  },
  {
    title: "AC Repair",
    providers: "160 Verified Experts",
    rating: "4.9",
    icon: FaSnowflake,
    color: "#5BC0FF",
  },
  {
    title: "Laptop Repair",
    providers: "130 Certified Technicians",
    rating: "4.9",
    icon: FaLaptopCode,
    color: "#A855F7",
  },
  {
    title: "Car Mechanic",
    providers: "205 Mechanics",
    rating: "4.8",
    icon: FaCarSide,
    color: "#22C55E",
  },
  {
    title: "Painter",
    providers: "115 Professionals",
    rating: "4.9",
    icon: FaPaintRoller,
    color: "#F97316",
  },
];

function ServiceCategories() {
  return (
    <section className="service-section">
      <div className="container">

        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
        >
          <span className="section-badge">
            Our Services
          </span>

          <h2>
            Find the Right
            <span> Professional </span>
            for Every Job
          </h2>

          <p>
            Browse verified service providers with ratings,
            transparent pricing, and instant quotations.
          </p>
        </motion.div>

        <div className="row g-4">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                className="col-lg-4 col-md-6"
                key={service.title}
              >
                <motion.div
                  className="service-3d-card"
                  initial={{
                    opacity: 0,
                    y: 70,
                    rotateX: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                  }}
                  whileHover={{
                    y: -15,
                    rotateX: -6,
                    rotateY: 8,
                    scale: 1.04,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * .08,
                    duration: .6,
                  }}
                >
                  <div className="service-glow"></div>

                  <div
                    className="icon-wrapper"
                    style={{
                      background: service.color,
                    }}
                  >
                    <Icon />
                  </div>

                  <h3>
                    {service.title}
                  </h3>

                  <p className="provider-count">
                    {service.providers}
                  </p>

                  <div className="service-footer">

                    <div className="rating">
                      ★ {service.rating}
                    </div>

                    <motion.button
                      whileHover={{
                        x: 5,
                      }}
                      className="explore-btn"
                    >
                      Explore

                      <FaArrowRight />
                    </motion.button>

                  </div>

                  <div className="card-shine"></div>

                </motion.div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}

export default ServiceCategories;
