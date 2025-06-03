import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Stack,
  useMediaQuery,
  useTheme,
  IconButton,
  Container,
  Grid,
} from "@mui/material";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getAllProperty } from "../apis/adminApi";
import "../App.css";
import PropertyCards from "../components/PropertyCards";

const AvailablePropertyScreen = () => {
  const [allproperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState({}); // Track the current image index for each property
  const navigate = useNavigate(); // For navigation

  // Fetch all properties
  const fetchAllProperties = async () => {
    try {
      const response = await getAllProperty();
      if (response.status_code) {
        setAllProperties(response.data);
        const initialIndex = response.data.reduce((acc, property) => {
          acc[property._id] = 0; // Initialize image index to 0 for each property
          return acc;
        }, {});
        setImageIndex(initialIndex);
      } else {
        console.error("Failed to fetch properties");
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProperties();
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Function to handle image navigation
  const handleImageNavigation = (propertyId, direction) => {
    setImageIndex((prev) => {
      const currentIndex = prev[propertyId];
      const totalImages = allproperties.find((prop) => prop._id === propertyId)
        .property_images.length;
      const newIndex =
        direction === "next"
          ? (currentIndex + 1) % totalImages
          : (currentIndex - 1 + totalImages) % totalImages;
      return { ...prev, [propertyId]: newIndex };
    });
  };

  // Function to get the first available image from property_images
  const getFirstImage = (propertyImages) => {
    if (!propertyImages) return ""; // Return empty string if no images are available

    // Extract the first image URL from the first key in property_images
    const firstKey = Object.keys(propertyImages)[0];
    return propertyImages[firstKey]?.[0] || ""; // Return the first image URL or empty string
  };

  return (
    <>
      <Box
        width="lg"
        sx={{
          p: { md: 0, xs: 0 },
          marginTop: { md: 3, xs: 5 },
          display: "flex",
          flexDirection: "column",
          gap: 3,
          background: { md: "#ECECEC", xs: "#fff" },
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ margin: "25px 0 0 25px", display: { xs: "none", md: "block" } }}
        >
          Available Properties
        </Typography>
        {allproperties?.map((property) => (
          <Card
            key={property._id}
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              boxShadow: 2,
              borderRadius: 2,
              overflow: "hidden",
              p: 2,
            }}
          >
            {/* Image and Navigation */}
            <Box
              sx={{
                position: "relative",
                width: isMobile ? "100%" : "40%",
                height: isMobile ? 200 : 280,
              }}
            >
              {/* Chip at Top Middle */}
              <Box
                sx={{
                  position: "absolute",
                  top: 10,
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 2,
                }}
              >
                <Chip
                  label="For Sale" // Example text for the chip
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                />
              </Box>

              {/* Left Navigation */}
              <IconButton
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 10,
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  zIndex: 1,
                }}
                onClick={() => handleImageNavigation(property._id, "prev")}
              >
                <MdChevronLeft color="white" />
              </IconButton>

              {/* Image */}

              <CardMedia
                component="img"
                image={getFirstImage(property.property_images)} // Use the first available image
                alt={property.property_name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />

              {/* Right Navigation */}
              <IconButton
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 10,
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  zIndex: 1,
                }}
                onClick={() => handleImageNavigation(property._id, "next")}
              >
                <MdChevronRight color="white" />
              </IconButton>
            </Box>

            {/* Property Details */}
            <CardContent
              sx={{
                width: isMobile ? "100%" : "60%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between", // Ensures content stays at the top and button at the bottom
                p: 3,
              }}
            >
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {property.property_name} ({property.property_location})
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {property.description}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    flexWrap: "wrap",
                    my: 2,
                  }}
                >
                  {property?.family_expectation.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      sx={{ backgroundColor: "#ffe0b2", color: "#000" }}
                    />
                  ))}
                </Stack>
              </Box>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: 5,
                  mt: 2,
                  px: 5,
                  alignSelf: "flex-start", // Align button to the left
                  // width: "150px", // Contain the width of the button
                }}
                onClick={() =>
                  navigate("/property-detail", {
                    state: { propertyId: property._id },
                  })
                }
              >
                View Property
              </Button>
            </CardContent>
          </Card>
        ))}

        <PropertyCards
          Heading="Entire Bromo mountain view Cabin in Surabaya from card"
          SubHeading="Luxurious villa with stunning ocean views and private beach access from card."
        />
        <PropertyCards
          Heading="Entire Bromo mountain view Cabin in Surabaya from card"
          SubHeading="Luxurious villa with stunning ocean views and private beach access from card."
        />
        <PropertyCards
          Heading="Entire Bromo mountain view Cabin in Surabaya from card"
          SubHeading="Luxurious villa with stunning ocean views and private beach access from card."
        />
        <PropertyCards
          Heading="Entire Bromo mountain view Cabin in Surabaya from card"
          SubHeading="Luxurious villa with stunning ocean views and private beach access from card."
        />
      </Box>
    </>
  );
};

export default AvailablePropertyScreen;
