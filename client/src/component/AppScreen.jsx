import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { io } from "socket.io-client";

const socket = io(`${process.env.REACT_APP_SOCKET_URL}`);

const AppScreen = () => {
  const { id: appId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const tabId = sessionStorage.getItem("tabId") || crypto.randomUUID();
  sessionStorage.setItem("tabId", tabId);

  const [conflictDialogOpen, setConflictDialogOpen] = useState(false);

  useEffect(() => {
    if (!appId) {
      navigate("/");
      return;
    }

    // Notify the server when the app is opened
    socket.emit("app-opened", { userId, appId, tabId });

    // Listen for conflict notification
    socket.on("conflict", () => {
      setConflictDialogOpen(true);
    });

    // Listen for logout notifications
    socket.on("logged-out", () => {
      alert("You have been logged out from another session.");
      navigate("/");
    });

    return () => {
      // Notify the server when the app is closed
      socket.emit("app-closed", { userId, appId, tabId });
    };
  }, [appId, navigate, userId, tabId]);

  const handleLogoutOtherTabs = () => {
    // Notify the server to log out all other tabs
    socket.emit("log-out-other-tabs", { userId, appId, tabId });
    setConflictDialogOpen(false);
  };

  const handleCancel = () => {
    // Notify the server to cancel the current session
    socket.emit("cancel-session", { tabId });
    setConflictDialogOpen(false);
    navigate("/");
  };

  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h4">Application Details</Typography>
      <Typography variant="h6">App ID: {appId}</Typography>
      <Dialog open={conflictDialogOpen}>
        <DialogTitle>Conflict Detected</DialogTitle>
        <DialogContent>
          <Typography>You are already logged into this application in another tab/browser.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutOtherTabs} color="primary">
            Log out of all other tabs
          </Button>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AppScreen;
