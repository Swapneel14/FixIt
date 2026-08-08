import "../../css/Features.css";
import { motion } from "framer-motion";
import {
  FaComments,
  FaClipboardCheck,
  FaMapMarkedAlt,
  FaShieldAlt,
  FaStar,
  FaWallet,
  FaArrowRight,
} from "react-icons/fa";

const features = [
  {
    id: "01",
    title: "Compare Multiple Quotes",
    description:
      "Receive quotations from different verified professionals and choose the one that best matches your budget and requirements.",
    icon: FaClipboardCheck,
  },
  {
    id: "02",
    title: "Verified Professionals",
    description:
      "Every service provider is verified through ratings, work history, and customer feedback before joining the platform.",
    icon: FaShieldAlt,
  },
  {
    id: "03",
    title: "Live Job Tracking",
    description:
      "Track every stage of your service request in real time—from acceptance to completion.",
    icon: FaMapMarkedAlt,
  },
  {
    id: "04",
    title: "Instant Chat",
    description:
      "Communicate directly with professionals to discuss pricing, availability, and service details.",
    icon: FaComments,
  },
  {
    id: "05",
    title: "Secure Payments",
    description:
      "Pay only after your work is completed successfully using our secure payment system.",
    icon: FaWallet,
  },
  {
    id: "06",
    title: "Trusted Reviews",
    description:
      "Read authentic customer reviews and ratings before hiring any professional.",
    icon: FaStar,
  },
];

function Features() {
  return (
    <section className="features-section">

      <div className="container">

        <motion.div
          className="features-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
        >
          <span className="feature-badge">
            Why Choose Fix It
          </span>

          <h2>
            Built Around
            <span> Trust, Transparency </span>
            & Convenience
          </h2>

          <p>
            We simplify the process of hiring local professionals
            through verified providers, competitive pricing,
            real-time communication and secure payments.
          </p>
        </motion.div>

        <div className="timeline">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <motion.div
                className={`feature-row ${index % 2 === 0 ? "left" : "right"}`}
                key={feature.id}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -100 : 100,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: .6,
                  delay: index * .1,
                }}
              >

                <div className="timeline-dot"></div>

                <motion.div
                  className="feature-card"
                  whileHover={{
                    y: -12,
                    scale: 1.03,
                    rotateX: -6,
                    rotateY: index % 2 === 0 ? 5 : -5,
                  }}
                >

                  <div className="feature-glow"></div>

                  <div className="feature-top">

                    <span className="feature-number">
                      {feature.id}
                    </span>

                    <div className="feature-icon">
                      <Icon />
                    </div>

                  </div>

                  <h3>
                    {feature.title}
                  </h3>

                  <p>
                    {feature.description}
                  </p>

                  <button className="feature-btn">
                    Learn More

                    <FaArrowRight />
                  </button>

                  <div className="feature-shine"></div>

                </motion.div>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}

export default Features;