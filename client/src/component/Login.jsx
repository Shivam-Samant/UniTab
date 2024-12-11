import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Container, Typography, Box, Paper, Button } from "@mui/material"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    console.log({credentialResponse})
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/google`, {
        token: credentialResponse.credential,
      });
      console.log({response})

      const { data = {} } = response.data

      localStorage.setItem("accessToken", data.token);
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleError = () => {
    console.error("Google Login Failed");
    alert("Google login failed.")
  };

  return (
    <Container>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        }}
      >
        <Paper
          elevation={5}
          sx={{
            padding: 4,
            maxWidth: 400,
            textAlign: "center",
            borderRadius: 3,
          }}
        >
          <Box mb={3}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 2 }}>
              Welcome to UniTab
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Access your account securely with Google Login.
            </Typography>
          </Box>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            render={(renderProps) => (
              <Button
                variant="contained"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                    alt="Google Icon"
                    style={{ width: 20, height: 20 }}
                  />
                }
                sx={{
                  backgroundColor: "#4285F4",
                  color: "#fff",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  fontSize: "16px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#357ae8",
                  },
                }}
              >
                Sign in with Google
              </Button>
            )}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
