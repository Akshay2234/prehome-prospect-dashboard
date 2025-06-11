// src/components/CustomButton.js
import React from "react";
import { Button, Container, Box, Grid, Typography } from "@mui/material";
import BootstrapCarousel from "../components/BootstrapCarousel";
import PropertyCardButton from "./PropertyCardButton";
import ViewPropButton from "./ViewPropButton";
import "../assets/style.css";
import cardImage from "../assets/placeholderImage.png"




const PropertyCards = ({ Heading, SubHeading, ...props }) => {
  return (
    <Container
      maxWidth="lg"
      className="prop-card-main-container"
     
    >
      <Box
      className="prop-card-box"
  
      >
        <Grid item xs={12} md={4} lg={4} className="carousel-img-container">
          <BootstrapCarousel
            id="carouselOne"
            img={cardImage}
          />
        </Grid>

        <Grid item xs={12} md={5} lg={5} sx={{ padding: "2%" }}>
          <Box className="card-content" justifyContent="space-between">
            <Typography
              display="block"
              fontWeight="bold"
              // fontSize={24}
              gutterBottom
              className="Heading-application"
              sx={{
                color: { sx: "white", md: "black" },
                fontSize: { xs: 16, md: 20,lg:24 },
              }}
            >
              {/* Entire Bromo mountain view Cabin in Surabaya */}
              {Heading}
            </Typography>
            <p
              className="sub-Heading"
              
            >
              {/* Luxurious villa with stunning ocean views and private beach access. */}
              {SubHeading}
            </p>

            <Box height={{ xs: 125,md:100 }} className="card-btn-container">
              <PropertyCardButton text="Luxury" />
              <PropertyCardButton text="Beachfront" />
              <PropertyCardButton text="Specious" />
            </Box>
            <Box
            className="view-prop-cta-cont"
         
            >
              <ViewPropButton  text="View Property" to="/property-detail"/>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Container>
  );
};

export default PropertyCards;
