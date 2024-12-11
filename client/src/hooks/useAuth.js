import { useState, useEffect } from "react";
import axios from "../utils/axios";

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [refreshToken] = useState(localStorage.getItem("refreshToken"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("accessToken"));

  // useEffect(() => {
  //   const verifyToken = async () => {
  //     if (!accessToken) {
  //       setIsAuthenticated(false);
  //       return;
  //     }

  //     try {
  //       // Verify the token with the backend
  //       await axios.post("/auth/verify", { token: accessToken });
  //       setIsAuthenticated(true);
  //     } catch (error) {
  //       console.error("Token verification failed:", error.message);
  //       // If token verification fails, attempt to refresh it
  //       if (refreshToken) {
  //         await refreshAccessToken();
  //       } else {
  //         setIsAuthenticated(false);
  //       }
  //     }
  //   };

  //   verifyToken();
  // }, [accessToken, refreshToken]);

  // const refreshAccessToken = async () => {
  //   try {
  //     const response = await axios.post("/auth/refresh", { refreshToken });
  //     const { accessToken: newAccessToken } = response.data;

  //     setAccessToken(newAccessToken);
  //     localStorage.setItem("accessToken", newAccessToken);
  //     setIsAuthenticated(true);
  //   } catch (error) {
  //     console.error("Failed to refresh token:", error.message);
  //     setIsAuthenticated(false);
  //   }
  // };

  return { isAuthenticated, accessToken };
};
