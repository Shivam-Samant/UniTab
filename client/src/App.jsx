import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login.jsx";
import Dashboard from "./component/Dashboard.jsx";
import AppScreen from "./component/AppScreen.jsx";
import withAuth from "./hoc/withAuth.jsx";
import withRedirect from "./hoc/withRedirect.jsx";

const ProtectedDashboard = withAuth(Dashboard);
const ProtectedAppScreen = withAuth(AppScreen);
const RedirectedLogin = withRedirect(Login);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<RedirectedLogin />} />
        <Route path="/dashboard" element={<ProtectedDashboard />} />
        <Route path="/app/:id" element={<ProtectedAppScreen />} />
        <Route path="/" element={<ProtectedDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
