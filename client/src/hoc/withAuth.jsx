import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"

/**
 * HOC for authentication management
 * @param WrappedComponent - The component to wrap
 * @returns Component wrapped with authentication logic
 */
const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated) {
        // If not authenticated, redirect to login
        navigate("/login");
      }
    }, [navigate, isAuthenticated]);

    // Render the wrapped component if authenticated
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
