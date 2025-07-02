import { Box, Typography, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../assets/style.css";
import PropertyCards from "../components/PropertyCards";

const AvailablePropertyScreen = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://35.154.52.56:5000/api/properties");
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  return (
    <Box width="lg">
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ margin: "50px 0 0 25px", display: { xs: "none", md: "block" } }}
      >
        Available Properties
      </Typography>

      <Container maxWidth="lg">
        {properties.map((property) => (
          <Link
            key={property._id}
            to={`/properties/${property._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <PropertyCards
              Heading={property.title}
              SubHeading={`Located at ${property.location}`}
              images={property.images} // ✅ Pass images here
            />
          </Link>
        ))}
      </Container>
    </Box>
  );
};

export default AvailablePropertyScreen;