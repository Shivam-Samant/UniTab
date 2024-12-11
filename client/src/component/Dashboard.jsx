import React, { useState, useEffect } from "react";
import { Container, TextField, Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // React Router's navigation hook

  // Fetch applications from the backend
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/applications`);
        setApplications(response.data);
        setFilteredApps(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  // Filter applications by search term
  useEffect(() => {
    const filtered = applications.filter((app) =>
      app.app_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredApps(filtered);
  }, [searchTerm, applications]);

 const handleApplicationClick = async (app) => {
    try {
      // Log application selection
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/applications/select`, {
        userId: localStorage.getItem('accessToken'),
        appId: app.id,
      });

      // Navigate to the application screen
      navigate(`/applications/${app.id}`);
    } catch (error) {
      console.error("Error logging application selection:", error);
    }
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Application Dashboard
      </Typography>
      <Box mb={4}>
        <TextField
          label="Search by App Name"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <Grid container spacing={3}>
        {filteredApps.map((app) => (
          <Grid item xs={12} sm={6} md={4} key={app.id}>
            <Card
              elevation={3}
              sx={{ borderRadius: 2, cursor: "pointer" }}
              onClick={() => handleApplicationClick(app)} // Add click event for navigation
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {app.app_name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: {app.id}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {app.label_name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
