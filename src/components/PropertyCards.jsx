import React from "react";
import { Button, Container, Box, Grid, Typography } from "@mui/material";
import BootstrapCarousel from "../components/BootstrapCarousel";
import PropertyCardButton from "./PropertyCardButton";
import ViewPropButton from "./ViewPropButton";
import "../assets/style.css";
import cardImage from "../assets/PlaceholderImage.png";

const PropertyCards = ({ Heading, SubHeading, images }) => {
  return (
    <Container maxWidth="lg" className="prop-card-main-container">
      <Box className="prop-card-box">
        <Grid item xs={12} md={4} lg={4} className="carousel-img-container">
          <BootstrapCarousel
            id="carouselOne"
            images={images && images.length > 0 ? images : [{ url: cardImage, label: "Placeholder" }]} // ✅ Dynamic image
          />
        </Grid>

        <Grid item xs={12} md={5} lg={5} sx={{ padding: "2%" }}>
          <Box className="card-content" justifyContent="space-between">
            <Typography
              display="block"
              fontWeight="bold"
              gutterBottom
              className="Heading"
              sx={{
                color: { sx: "white", md: "black" },
                fontSize: { xs: 16, md: 20, lg: 24 },
              }}
            >
              {Heading}
            </Typography>
            <Typography
              display="block"
              className="sub-Heading"
              sx={{
                color: { sx: "white", md: "black" },
                fontSize: { xs: 12, md: 14, lg: 16 },
              }}
            >
              {SubHeading}
            </Typography>

            <Box height={{ xs: 125, md: 100 }} className="card-btn-container">
              <PropertyCardButton text="Luxury" />
              <PropertyCardButton text="Beachfront" />
              <PropertyCardButton text="Spacious" />
            </Box>
            <Box className="view-prop-cta-cont">
              <ViewPropButton text="View Property" to="/property-detail" />
            </Box>
          </Box>
        </Grid>
      </Box>
    </Container>
  );
};

export default PropertyCards;