import "../../css/ServiceFilterBar.css";
import { motion } from "framer-motion";
import {
  FaThLarge,
  FaBolt,
  FaFaucet,
  FaSnowflake,
  FaLaptopCode,
  FaCarSide,
  FaPaintRoller,
  FaBroom,
  FaCouch,
  FaTools,
} from "react-icons/fa";

const services = [

  {
    id: "all",
    name: "All Services",
    icon: FaThLarge,
  },

  {
    id: "ELECTRICIAN",
    name: "Electrician",
    icon: FaBolt,
  },

  {
    id: "PLUMBER",
    name: "Plumber",
    icon: FaFaucet,
  },

  {
    id: "AC_REPAIR",
    name: "AC Repair",
    icon: FaSnowflake,
  },

  {
    id: "LAPTOP_REPAIR",
    name: "Laptop Repair",
    icon: FaLaptopCode,
  },

  {
    id: "CAR_MECHANIC",
    name: "Car Mechanic",
    icon: FaCarSide,
  },

  {
    id: "PAINTER",
    name: "Painter",
    icon: FaPaintRoller,
  },

  {
    id: "HOME_CLEANING",
    name: "Home Cleaning",
    icon: FaBroom,
  },

  {
    id: "CARPENTER",
    name: "Carpenter",
    icon: FaTools,
  },

  {
    id: "FURNITURE",
    name: "Furniture",
    icon: FaCouch,
  },

];

function ServiceFilterBar({
  selectedService,
  setSelectedService,
}) {
  return (
    <div className="service-filter-wrapper">

      <motion.div
        className="service-filter-bar"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .5 }}
      >
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <motion.button
              key={service.id}
              whileHover={{
                y: -4,
                scale: 1.04,
              }}
              whileTap={{
                scale: .95,
              }}
              onClick={() =>
                setSelectedService(service.id)
              }
              className={`service-chip ${selectedService === service.id
                  ? "active"
                  : ""
                }`}
            >
              <Icon />

              <span>
                {service.name}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

    </div>
  );
}

export default ServiceFilterBar;