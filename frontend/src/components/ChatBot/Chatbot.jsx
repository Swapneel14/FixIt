import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";

import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";

import "./chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen && <ChatWindow />}
      </AnimatePresence>

      <ChatButton
        isOpen={isOpen}
        onClick={() =>
          setIsOpen((prev) => !prev)
        }
      />
    </>
  );
};

export default Chatbot;