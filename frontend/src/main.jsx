import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

import Navbar from "./components/Navbar";
import App from "./App";
import CompleteProfile from "./pages/CompleteProfile";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AuthGuard from "./guard/AuthGuard";
import Root from "./pages/Root.jsx";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>

        <Navbar />
        <AuthGuard>
        <Routes>

          <Route
            path="/"
            element={<Root/>}
          />

          <Route
            path="/complete-profile"
            element={<CompleteProfile />}
          />

        </Routes>
        </AuthGuard>

      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);