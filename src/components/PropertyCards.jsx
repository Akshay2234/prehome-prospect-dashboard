// src/components/CustomButton.js
import React from "react";
import { Button, Container, Box, Grid, Typography } from "@mui/material";
import BootstrapCarousel from "../components/BootstrapCarousel";
import PropertyCardButton from "./PropertyCardButton";
import ViewPropButton from "./ViewPropButton";
import "../App.css";



const PropertyCards = ({ Heading, SubHeading, ...props }) => {
  return (
    <Container
      maxWidth="lg"
      className="prop-card-main-container"
      // sx={{
      //   height: { xs: "auto", md: 384 },
      //   width: { xs: "100%", md: "100%" },
      //   marginTop: "5%",
      //   borderRadius: { xs: "31px", md: "12px" },
      //   fontFamily: "Poppins, sans-serif",
      //   backgroundColor: { xs: "#fefefe", md: "#fefefe" },
      //   paddingX: { xs: 0 },
      //   paddingY: { xs: 0, md: 0 },
      //   border: { xs: "1px solid #D9D9D9", md: 0 },
      //   margin: { xs: 1, md: "0% 2%" },
      // }}
    >
      <Box
      className="prop-card-box"
        // sx={{
        //   display: "flex",
        //   //   height: "384px",
        //   width: "100%",

        //   flexDirection: { xs: "column", md: "row" },
        //   margin: "0px",
        //   padding: { xs: 0, md: "20px" },
        //   fontFamily: "Poppins, sans-serif",
        // }}
      >
        <Grid item xs={12} md={4} lg={4} className="carousel-img-container">
          <BootstrapCarousel
            id="carouselOne"
            images={[
              "/images/slide1.jpg",
              "/images/slide2.jpg",
              "/images/slide3.jpg",
            ]}
          />
        </Grid>

        <Grid item xs={12} md={5} lg={5} sx={{ padding: "2%" }}>
          <Box className="card-content" justifyContent="space-between">
            <Typography
              display="block"
              fontWeight="bold"
              // fontSize={24}
              gutterBottom
              className="Heading"
              sx={{
                color: { sx: "white", md: "black" },
                fontSize: { xs: 16, md: 20,lg:24 },
              }}
            >
              {/* Entire Bromo mountain view Cabin in Surabaya */}
              {Heading}
            </Typography>
            <Typography
              display="block"
              className="sub-Heading"
              sx={{
                color: { sx: "white", md: "black" },
                fontSize: { xs: 12, md: 14,lg:16 },
              }}
            >
              {/* Luxurious villa with stunning ocean views and private beach access. */}
              {SubHeading}
            </Typography>

            <Box height={{ xs: 125,md:100 }} className="card-btn-container">
              <PropertyCardButton text="Luxury" />
              <PropertyCardButton text="Beachfront" />
              <PropertyCardButton text="Specious" />
            </Box>
            <Box
            className="view-prop-cta-cont"
              // sx={{
              //   marginTop: { xs: "10%", md: "4%" },
              //   display: "flex",
              //   justifyContent: { xs: "flex-end", md: "flex-start" },
              //   marginBottom: "10px",
              // }}
            >
              <ViewPropButton text="View Property"/>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Container>
  );
};

export default PropertyCards;
