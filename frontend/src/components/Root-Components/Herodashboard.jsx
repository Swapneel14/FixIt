import "../../css/Hero.css";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function HeroDashboard() {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(rotateX, {
    stiffness: 150,
    damping: 18,
  });

  const springY = useSpring(rotateY, {
    stiffness: 150,
    damping: 18,
  });

  const glowX = useTransform(springY, [-12, 12], [-40, 40]);
  const glowY = useTransform(springX, [-12, 12], [40, -40]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateYValue = ((x / rect.width) - 0.5) * 18;
    const rotateXValue = ((rect.height / 2 - y) / rect.height) * 18;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div
      className="dashboard-perspective"
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
    >
      <motion.div
        className="hero-dashboard"
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, y: 80, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="dashboard-glow"
          style={{
            x: glowX,
            y: glowY,
          }}
        />

        <div
          className="dashboard-header"
          style={{ transform: "translateZ(60px)" }}
        >
          <div className="header-left">
            <div className="dot red"></div>
            <div className="dot yellow"></div>
            <div className="dot green"></div>
          </div>

          <span>Fix It Dashboard</span>
        </div>

        <motion.div
          className="service-card"
          whileHover={{ z: 80, scale: 1.04 }}
          style={{ transform: "translateZ(45px)" }}
        >
          <div className="service-icon">🔧</div>

          <div className="service-info">
            <h5>Electrician</h5>
            <p>Verified • 4.9 ★</p>
          </div>

          <span className="price">₹499</span>
        </motion.div>

        <motion.div
          className="service-card"
          whileHover={{ z: 80, scale: 1.04 }}
          style={{ transform: "translateZ(55px)" }}
        >
          <div className="service-icon">🪠</div>

          <div className="service-info">
            <h5>Plumber</h5>
            <p>Available in 20 mins</p>
          </div>

          <span className="price">₹349</span>
        </motion.div>

        <motion.div
          className="service-card"
          whileHover={{ z: 80, scale: 1.04 }}
          style={{ transform: "translateZ(65px)" }}
        >
          <div className="service-icon">💻</div>

          <div className="service-info">
            <h5>Laptop Repair</h5>
            <p>Certified Technician</p>
          </div>

          <span className="price">₹699</span>
        </motion.div>

        <motion.div
          className="quote-box"
          style={{
            transform: "translateZ(85px)",
          }}
          whileHover={{
            scale: 1.04,
          }}
        >
          <h4>3 Quotes Received</h4>

          <div className="progress">
            <div className="progress-fill"></div>
          </div>

          <span>Compare prices before booking</span>
        </motion.div>

        <motion.div
          className="floating-badge badge-1"
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          style={{
            transform: "translateZ(140px)",
          }}
        >
          ⭐ 4.9 Rated
        </motion.div>

        <motion.div
          className="floating-badge badge-2"
          animate={{
            y: [0, 12, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          style={{
            transform: "translateZ(140px)",
          }}
        >
          ✔ 100% Verified
        </motion.div>

        <motion.div
          className="floating-circle one"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />

        <motion.div
          className="floating-circle two"
          animate={{
            y: [0, 25, 0],
            rotate: [360, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />

        <motion.div
          className="floating-circle three"
          animate={{
            y: [0, -15, 0],
            rotate: [0, -360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
          }}
        />
      </motion.div>
    </div>
  );
}

export default HeroDashboard;