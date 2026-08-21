import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
    FiSend,
    FiMapPin,
    FiTool,
    FiCalendar,
    FiMoreVertical,
    FiZap,
} from "react-icons/fi";

import ChatMessage from "./ChatMessage";

import "./chatbot.css";


const ChatWindow = () => {

    // ==========================================
    // CHAT MESSAGES
    // ==========================================

    const [messages, setMessages] = useState([
        {
            
            role: "assistant",
            content:
                "Hi! I'm FixIt AI. 👋 What can I help you with today?",
        },
    ]);


    // ==========================================
    // INPUT
    // ==========================================

    const [input, setInput] = useState("");


    // ==========================================
    // TYPING STATE
    // ==========================================

    const [isTyping, setIsTyping] = useState(false);


    // ==========================================
    // QUICK ACTIONS
    // ==========================================

    const quickActions = [

        {
            label: "Find a service",
            icon: <FiTool />,
            text: "Find a service provider near me",
        },

        {
            label: "Nearby providers",
            icon: <FiMapPin />,
            text: "Show me nearby service providers",
        },

        {
            label: "My bookings",
            icon: <FiCalendar />,
            text: "Show my bookings",
        },

    ];


    // ==========================================
    // SEND MESSAGE
    // ==========================================

    const handleSend = async (customMessage = null) => {

        const messageText =
            customMessage !== null
                ? customMessage
                : input;


        // Prevent empty messages

        if (!messageText.trim()) {
            return;
        }


        // ======================================
        // CREATE USER MESSAGE
        // ======================================

        const userMessage = {

           

            role: "user",

            content: messageText.trim(),

        };


        // ======================================
        // UPDATE UI IMMEDIATELY
        // ======================================

        setMessages((prev) => [

            ...prev,

            userMessage,

        ]);


        // Clear input

        setInput("");


        // Show typing indicator

        setIsTyping(true);


        try {

            // ==================================
            // SEND CONVERSATION TO BACKEND
            // ==================================

            /*
             * We send the complete conversation.
             *
             * Backend will forward it to Python.
             *
             * Python converts:
             *
             * user      -> HumanMessage
             * assistant -> AIMessage
             *
             * and adds the system prompt.
             */

            const response = await fetch(
                "http://localhost:5000/api/chat",
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({

                        messages: [
                            ...messages,
                            userMessage,
                        ],

                    }),

                }
            );


            // ==================================
            // READ BACKEND RESPONSE
            // ==================================

            const data =
                await response.json();


            // ==================================
            // HANDLE ERROR
            // ==================================

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to get AI response"
                );

            }


            // ==================================
            // AI RESPONSE
            // ==================================

            const botMessage = {

                

                role: "assistant",

                content:
                    data.message,

            };


            // ==================================
            // ADD AI MESSAGE TO CHAT
            // ==================================

            setMessages((prev) => [

                ...prev,

                botMessage,

            ]);

        }

        catch (error) {

            console.error(
                "Chat error:",
                error
            );


            // ==================================
            // SHOW ERROR MESSAGE
            // ==================================

            setMessages((prev) => [

                ...prev,

                {

                   

                    role: "assistant",

                    content:
                        "Sorry, I'm having trouble connecting right now. Please try again.",

                },

            ]);

        }

        finally {

            // Hide typing indicator

            setIsTyping(false);

        }

    };


    // ==========================================
    // ENTER KEY
    // ==========================================

    const handleKeyDown = (e) => {

        if (
            e.key === "Enter" &&
            !e.shiftKey
        ) {

            e.preventDefault();

            handleSend();

        }

    };


    // ==========================================
    // UI
    // ==========================================

    return (

        <motion.div

            className="chatbot-window shadow-lg"

            initial={{
                opacity: 0,
                scale: 0.9,
                y: 30,
            }}

            animate={{
                opacity: 1,
                scale: 1,
                y: 0,
            }}

            exit={{
                opacity: 0,
                scale: 0.9,
                y: 30,
            }}

            transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
            }}

        >

            {/* ==================================
                HEADER
            ================================== */}

            <div className="chatbot-header">

                <div className="d-flex align-items-center">

                    <div className="chatbot-ai-icon">

                        <FiZap size={19} />

                    </div>


                    <div className="ms-2">

                        <div className="chatbot-title">

                            FixIt AI

                        </div>


                        <div className="chatbot-status">

                            <span className="status-dot"></span>

                            Online

                        </div>

                    </div>

                </div>


                <button

                    className="chatbot-menu-button"

                    type="button"

                >

                    <FiMoreVertical size={19} />

                </button>

            </div>


            {/* ==================================
                BODY
            ================================== */}

            <div className="chatbot-body">


                {/* ==================================
                    WELCOME
                ================================== */}

                {messages.length === 1 && (

                    <motion.div

                        className="chatbot-welcome text-center"

                        initial={{
                            opacity: 0,
                            y: 10,
                        }}

                        animate={{
                            opacity: 1,
                            y: 0,
                        }}

                        transition={{
                            duration: 0.3,
                        }}

                    >

                        <div className="welcome-icon mx-auto">

                            <FiZap size={25} />

                        </div>


                        <h5 className="mt-3 mb-1">

                            How can I help?

                        </h5>


                        <p className="text-muted small mb-3">

                            Find reliable local services,
                            manage bookings and more.

                        </p>


                        {/* QUICK ACTIONS */}

                        <div className="quick-actions">

                            {quickActions.map(
                                (action) => (

                                    <motion.button

                                        key={
                                            action.label
                                        }

                                        type="button"

                                        className="quick-action-btn"

                                        whileHover={{
                                            y: -2,
                                        }}

                                        whileTap={{
                                            scale: 0.97,
                                        }}

                                        onClick={() =>
                                            handleSend(
                                                action.text
                                            )
                                        }

                                    >

                                        <span className="quick-action-icon">

                                            {action.icon}

                                        </span>


                                        <span>

                                            {
                                                action.label
                                            }

                                        </span>

                                    </motion.button>

                                )
                            )}

                        </div>

                    </motion.div>

                )}


                {/* ==================================
                    MESSAGES
                ================================== */}

                <div className="chat-messages">

                    {messages.map((msg,index) => (

                        <ChatMessage

                            key={index}

                            sender={
                                msg.role === "user"
                                    ? "user"
                                    : "bot"
                            }

                            message={
                                 msg.content
                            }

                        />

                    ))}


                    {/* ==================================
                        TYPING INDICATOR
                    ================================== */}

                    <AnimatePresence>

                        {isTyping && (

                            <motion.div

                                className="typing-container"

                                initial={{
                                    opacity: 0,
                                    y: 5,
                                }}

                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}

                                exit={{
                                    opacity: 0,
                                }}

                            >

                                <div className="chat-message-avatar bot-avatar me-2">

                                    <FiZap size={14} />

                                </div>


                                <div className="typing-bubble">

                                    <span></span>

                                    <span></span>

                                    <span></span>

                                </div>

                            </motion.div>

                        )}

                    </AnimatePresence>

                </div>

            </div>


            {/* ==================================
                FOOTER
            ================================== */}

            <div className="chatbot-footer">

                <div className="chat-input-wrapper">


                    {/* INPUT */}

                    <input

                        type="text"

                        className="form-control chatbot-input"

                        placeholder="Ask FixIt AI..."

                        value={input}

                        onChange={(e) =>
                            setInput(
                                e.target.value
                            )
                        }

                        onKeyDown={
                            handleKeyDown
                        }

                        disabled={isTyping}

                    />


                    {/* SEND BUTTON */}

                    <motion.button

                        type="button"

                        className="chat-send-button"

                        onClick={() =>
                            handleSend()
                        }

                        disabled={
                            isTyping ||
                            !input.trim()
                        }

                        whileHover={{
                            scale: 1.05,
                        }}

                        whileTap={{
                            scale: 0.9,
                        }}

                    >

                        <FiSend size={17} />

                    </motion.button>

                </div>


                {/* DISCLAIMER */}

                <div className="chatbot-disclaimer">

                    <FiZap size={11} />

                    Powered by FixIt AI

                </div>

            </div>

        </motion.div>

    );

};


export default ChatWindow;