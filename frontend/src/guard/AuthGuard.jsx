import { useEffect, useState } from "react";

import {
  useAuth,
  useUser,
} from "@clerk/clerk-react";

import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import api from "../services/api";

import Loading from "../components/Loading";


function AuthGuard({ children }) {

  const {
    isLoaded: authLoaded,
    isSignedIn,
    getToken,
  } = useAuth();

  const {
    isLoaded: userLoaded,
  } = useUser();

  const location = useLocation();

  const [
    checkingUser,
    setCheckingUser,
  ] = useState(true);

  const [
    userExists,
    setUserExists,
  ] = useState(false);


  useEffect(() => {

    const checkUser = async () => {

      if (
        !authLoaded ||
        !userLoaded
      ) {
        return;
      }


      // Not logged in

      if (!isSignedIn) {

        setCheckingUser(false);

        return;
      }


      try {

        const token =
          await getToken();


        const response =
          await api.get(
            "/api/users/me",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );


        if (
          response.data.exists
        ) {

          setUserExists(true);

        }


      } catch (error) {

        if (
          error.response?.status === 404
        ) {

          setUserExists(false);

        } else {

          console.error(
            "Failed to check user:",
            error
          );

        }

      } finally {

        setCheckingUser(false);

      }

    };


    checkUser();

  }, [
    authLoaded,
    userLoaded,
    isSignedIn,
    getToken,
  ]);


  if (
    !authLoaded ||
    !userLoaded ||
    checkingUser
  ) {

    return <Loading />;

  }


  // User not signed in

  if (!isSignedIn) {

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }


  // User has not completed profile

  if (
    !userExists &&
    location.pathname !==
      "/complete-profile"
  ) {

    return (
      <Navigate
        to="/complete-profile"
        replace
      />
    );

  }


  // User already completed profile

  if (
    userExists &&
    location.pathname ===
      "/complete-profile"
  ) {

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }


  return children;

}


export default AuthGuard;