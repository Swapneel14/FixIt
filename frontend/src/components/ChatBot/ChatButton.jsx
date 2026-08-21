import React from "react";
import { motion } from "framer-motion";
import { FiMessageCircle, FiX } from "react-icons/fi";

const ChatButton = ({ onClick, isOpen }) => {
  return (
    <motion.button
      className="chatbot-floating-button"
      onClick={onClick}
      whileHover={{
        scale: 1.08,
        rotate: isOpen ? 0 : 3,
      }}
      whileTap={{ scale: 0.92 }}
      animate={{
        rotate: isOpen ? 0 : [0, -3, 3, -3, 0],
      }}
      transition={{
        rotate: isOpen
          ? { duration: 0.2 }
          : {
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 5,
            },
      }}
      aria-label="Open FixIt AI"
    >
      <motion.div
        key={isOpen ? "close" : "chat"}
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? (
          <FiX size={27} />
        ) : (
          <FiMessageCircle size={27} />
        )}
      </motion.div>

      {!isOpen && (
        <span className="chatbot-notification-dot">
          <span />
        </span>
      )}
    </motion.button>
  );
};

export default ChatButton;