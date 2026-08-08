import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

import Navbar from "./components/Navbar";
import CompleteProfile from "./pages/CompleteProfile";
import Root from "./pages/Root";

import AuthGuard from "./guard/AuthGuard";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Services from "./pages/Services";

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
               <Services/>
              </AuthGuard>
            }
          />

        </Routes>

      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);