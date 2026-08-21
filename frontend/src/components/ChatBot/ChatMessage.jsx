import React from "react";
import { motion } from "framer-motion";
import { FiUser, FiZap } from "react-icons/fi";

const ChatMessage = ({ message, sender }) => {
  const isUser = sender === "user";

  return (
    <motion.div
      className={`chat-message-row ${
        isUser ? "justify-content-end" : "justify-content-start"
      }`}
      initial={{
        opacity: 0,
        y: 12,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      {!isUser && (
        <div className="chat-message-avatar bot-avatar me-2">
          <FiZap size={14} />
        </div>
      )}

      <div
        className={`chat-message-bubble ${
          isUser
            ? "chat-message-user"
            : "chat-message-bot"
        }`}
      >
        {message}
      </div>

      {isUser && (
        <div className="chat-message-avatar user-avatar ms-2">
          <FiUser size={14} />
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;