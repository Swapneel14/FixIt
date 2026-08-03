import "../../css/Hero.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

  <motion.div
    className="hero-dashboard"
    initial={{ opacity: 0, x: 60 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: .8 }}
  >

    <div className="dashboard-header">
      <div className="header-left">
        <div className="dot red"></div>
        <div className="dot yellow"></div>
        <div className="dot green"></div>
      </div>

      <span>Fix It Dashboard</span>
    </div>

    <div className="service-card">
      <div className="service-icon">🔧</div>

      <div className="service-info">
        <h5>Electrician</h5>
        <p>Verified • 4.9 ★</p>
      </div>

      <span className="price">₹499</span>
    </div>

    <div className="service-card">
      <div className="service-icon">🪠</div>

      <div className="service-info">
        <h5>Plumber</h5>
        <p>Available in 20 mins</p>
      </div>

      <span className="price">₹349</span>
    </div>

    <div className="service-card">
      <div className="service-icon">💻</div>

      <div className="service-info">
        <h5>Laptop Repair</h5>
        <p>Certified Technician</p>
      </div>

      <span className="price">₹699</span>
    </div>

    <div className="quote-box">
      <h4>3 Quotes Received</h4>

      <div className="progress">
        <div className="progress-fill"></div>
      </div>

      <span>Compare prices before booking</span>
    </div>

    <div className="floating-badge badge-1">
      ⭐ 4.9 Rated
    </div>

    <div className="floating-badge badge-2">
      ✔ 100% Verified
    </div>

  </motion.div>

</div>

        </div>

      </div>

    </section>
  );
}

export default Hero;