import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Ably from "ably";

const ably = new Ably.Realtime({ key: process.env.REACT_APP_ABLY_API_KEY });

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

    const channel = ably.channels.get("app-sessions");

    // Notify the server when the app is opened
    channel.publish("app-opened", { userId, appId, tabId });

    // Listen for conflict notifications
    const conflictHandler = (message) => {
      if (message.name === `conflict-${tabId}`) {
        setConflictDialogOpen(true);
      }
    };

    // Listen for logout notifications
    const loggedOutHandler = (message) => {
      if (message.name === `logged-out-${tabId}`) {
        alert("You have been logged out from another session.");
        navigate("/");
      }
    };

    channel.subscribe(conflictHandler);
    channel.subscribe(loggedOutHandler);

    return () => {
      // Notify the server when the app is closed
      channel.publish("cancel-session", { tabId });
      channel.unsubscribe(conflictHandler);
      channel.unsubscribe(loggedOutHandler);
    };
  }, [appId, navigate, userId, tabId]);

  const handleLogoutOtherTabs = () => {
    const channel = ably.channels.get("app-sessions");

    // Notify the server to log out all other tabs
    channel.publish("log-out-other-tabs", { userId, appId, tabId });
    setConflictDialogOpen(false);
  };

  const handleCancel = () => {
    const channel = ably.channels.get("app-sessions");

    // Notify the server to cancel the current session
    channel.publish("cancel-session", { tabId });
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
