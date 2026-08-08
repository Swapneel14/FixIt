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
    id: "electrician",
    name: "Electrician",
    icon: FaBolt,
  },
  {
    id: "plumber",
    name: "Plumber",
    icon: FaFaucet,
  },
  {
    id: "ac_repair",
    name: "AC Repair",
    icon: FaSnowflake,
  },
  {
    id: "laptop_repair",
    name: "Laptop Repair",
    icon: FaLaptopCode,
  },
  {
    id: "car_mechanic",
    name: "Car Mechanic",
    icon: FaCarSide,
  },
  {
    id: "painter",
    name: "Painter",
    icon: FaPaintRoller,
  },
  {
    id: "home_cleaning",
    name: "Home Cleaning",
    icon: FaBroom,
  },
  {
    id: "carpenter",
    name: "Carpenter",
    icon: FaTools,
  },
  {
    id: "furniture",
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
              className={`service-chip ${
                selectedService === service.id
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