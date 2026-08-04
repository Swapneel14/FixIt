import "../../css/Hero.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HeroDashboard from "./Herodashboard";

function Hero() {
  return (
    <section className="hero">

      <div className="container">

        <div className="row align-items-center">

          {/* Left */}

          <div className="col-lg-6">

            <motion.span
              className="hero-badge"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              India's Smart Local Service Marketplace
            </motion.span>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: .2 }}
            >
              Find Trusted

              <span> Professionals </span>

              Near You
            </motion.h1>

            <motion.p
              className="hero-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .4 }}
            >
              Compare multiple quotations from verified service
              providers, chat instantly, track work progress,
              and pay securely only after the job is completed.
            </motion.p>

            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .6 }}
            >
              <Link
                to="/complete-profile"
                className="btn hero-btn-primary"
              >
                Get Started
              </Link>

              <button className="btn hero-btn-secondary">
                Explore Services
              </button>
            </motion.div>

            <motion.div
              className="hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .8 }}
            >
              <div>

                <h3>500+</h3>

                <span>Providers</span>

              </div>

              <div>

                <h3>1200+</h3>

                <span>Jobs Completed</span>

              </div>

              <div>

                <h3>4.9★</h3>

                <span>Average Rating</span>

              </div>

            </motion.div>

          </div>

          {/* Right */}

          <div className="col-lg-6">

 <HeroDashboard/>

</div>

        </div>

      </div>

    </section>
  );
}

export default Hero;