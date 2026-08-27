import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

import Navbar from "./components/Navbar";
import CompleteProfile from "./pages/CompleteProfile";
import EditProfile from "./pages/EditProfile";
import Root from "./pages/Root";

import AuthGuard from "./guard/AuthGuard";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Services from "./pages/Services";
import ProviderProfile from "./pages/ProviderProfile";
import Chatbot from "./components/ChatBot/Chatbot";
import ServiceRequest from "./pages/ServiceRequest";
import MyBookings from "./pages/MyBookings";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>

        <Navbar />

        <Routes>

          {/* Public Route */}
          <Route
            path="/"
            element={<Root />}
          />

          {/* Protected Route */}
          <Route
            path="/complete-profile"
            element={
              <AuthGuard>
                <CompleteProfile />
              </AuthGuard>
            }
          />

          <Route
            path="/services"
            element={
              <AuthGuard>
                <Services />
              </AuthGuard>
            }
          />

          <Route
            path="/edit-profile"
            element={
              <AuthGuard>
                <EditProfile />
              </AuthGuard>
            }
          />

          <Route
            path="/providers/:id"
            element={
              <AuthGuard>
                <ProviderProfile />
              </AuthGuard>
            }
          />

          <Route
            path="/service-request/:providerId"
            element={
            <AuthGuard>
            <ServiceRequest />
            </AuthGuard>}
          />

          <Route
                    path="/my-bookings"
                    element={
                     <AuthGuard>
                    <MyBookings />
                    </AuthGuard>}
                />


        </Routes>

        <Chatbot />

      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);