import Ably from "ably";

// Initialize the Ably client
const ably = new Ably.Realtime(process.env.ABLY_API_KEY!);

// Structure to manage active sessions
interface ActiveSession {
  userId: string;
  appId: string;
  tabId: string;
}

export const activeSessions: Record<string, ActiveSession> = {}; // Replace this with Redis in production

export const setupAbly = () => {
  const channel = ably.channels.get("app-sessions");

  channel.subscribe("app-opened", (message) => {
    const { userId, appId, tabId } = message.data;

    // Check for conflicting sessions (excluding the current tab)
    const conflictingSessions = Object.entries(activeSessions).filter(
      ([, session]) => session.userId === userId && session.appId === appId && session.tabId !== tabId
    );

    if (conflictingSessions.length > 0) {
      // Notify the current tab of the conflict
      channel.publish(`conflict-${tabId}`, {
        appId,
        message: "Another tab opened this application.",
      });
    }

    // Register the current session
    activeSessions[tabId] = { userId, appId, tabId };
  });

  channel.subscribe("log-out-other-tabs", (message) => {
    const { appId, userId, tabId } = message.data;

    Object.entries(activeSessions).forEach(([storedTabId, session]) => {
      if (session.appId === appId && session.userId === userId && session.tabId !== tabId) {
        // Notify the conflicting tabs to log out
        channel.publish(`logged-out-${storedTabId}`, {
          appId,
          message: "You were logged out from another tab.",
        });
        delete activeSessions[storedTabId];
      }
    });
  });

  channel.subscribe("cancel-session", (message) => {
    const { tabId } = message.data;

    delete activeSessions[tabId];
  });
};
