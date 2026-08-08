import "../../css/RadiusFilter.css";
import { motion } from "framer-motion";
import { FaLocationDot, FaLocationCrosshairs } from "react-icons/fa6";

function RadiusFilter({ radius, setRadius }) {
  return (
    <motion.div
      className="radius-filter"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .5 }}
    >
      <div className="radius-header">

        <div className="radius-title">

          <FaLocationCrosshairs className="radius-icon" />

          <div>
            <h5>Nearby Radius</h5>
            <p>
              Search verified professionals near your location
            </p>
          </div>

        </div>

        <motion.div
          className="radius-value"
          key={radius}
          initial={{ scale: .8 }}
          animate={{ scale: 1 }}
          transition={{ duration: .2 }}
        >
          <FaLocationDot />

          <span>{radius} km</span>
        </motion.div>

      </div>

      <div className="slider-wrapper">

        <span>1 km</span>

        <input
          type="range"
          min="1"
          max="50"
          step="1"
          value={radius}
          onChange={(e) =>
            setRadius(Number(e.target.value))
          }
          className="radius-slider"
        />

        <span>50 km</span>

      </div>

    </motion.div>
  );
}

export default RadiusFilter;