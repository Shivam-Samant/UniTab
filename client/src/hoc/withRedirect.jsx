import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"

/**
 * HOC for redirecting authenticated users.
 * Redirects users to the home page if they already have a valid token.
 *
 * @param WrappedComponent - The component to wrap.
 * @returns Component wrapped with redirection logic.
 */
const withRedirect = (WrappedComponent) => {
  const RedirectedComponent = (props) => {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate();

    useEffect(() => {
      if (isAuthenticated) {
        // If isAuthenticated, redirect to the home page
        navigate("/");
      }
    }, [navigate, isAuthenticated]);

    // Render the wrapped component if not redirected
    return <WrappedComponent {...props} />;
  };

  return RedirectedComponent;
};

export default withRedirect;
