import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Typography,
  IconButton,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import {
  createShortListProperty,
  getPropertyDetails,
  getShortListProperty,
} from "../apis/adminApi";

const PropertyDetailsScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { propertyId } = location.state || {};
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("All"); // State for Tabs
  const [filteredImages, setFilteredImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0); // State for image carousel
  const [shortListDetail, setShortListDetail] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [upcomingDates, setUpcomingDates] = useState([]);
  const preHomerId = localStorage.getItem("user_id");

  // Fetch property details
  const fetchPropertyDetails = async () => {
    try {
      const response = await getPropertyDetails(propertyId);
      if (response.data) {
        setPropertyDetails(response.data);

        // Initialize filteredImages with all images
        const allImages = Object.values(response.data.property_images || {}).flat();
        setFilteredImages(allImages);
      } else {
        console.error("Failed to fetch property details");
      }
    } catch (error) {
      console.error("Error fetching property details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPropertyDetails();
    getShortListPropertyDetail();
    generateUpcomingDates();
  }, []);

  // Handle Tab Selection
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if (tab === "All") {
      // Flatten all image arrays into a single array
      const allImages = Object.values(propertyDetails.property_images || {}).flat();
      setFilteredImages(allImages);
    } else {
      // Set images for the selected tab
      setFilteredImages(propertyDetails.property_images[tab] || []);
    }
    setImageIndex(0); // Reset carousel index
  };

  // Handle next image in carousel
  const handleNextImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % filteredImages.length);
  };

  // Handle previous image in carousel
  const handlePrevImage = () => {
    setImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + filteredImages.length) % filteredImages.length
    );
  };

  // Generate upcoming dates for scheduling
  const generateUpcomingDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Format the date as dd/mm/yyyy
      const formattedDate = `${String(date.getDate()).padStart(
        2,
        "0"
      )}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
      dates.push(formattedDate);
    }
    setUpcomingDates(dates);
  };

  // Handle schedule visit
  const handleScheduleVisit = async () => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    // Convert selectedDate from dd/mm/yyyy to mm/dd/yyyy
    const [day, month, year] = selectedDate.split("/");
    const formattedDate = `${month}/${day}/${year}`;

    try {
      const response = await createShortListProperty(
        propertyId,
        preHomerId,
        formattedDate
      );

      if (response.status_code) {
        // Update the state directly to reflect the changes immediately
        setShortListDetail({
          ...shortListDetail,
          short_list_date: formattedDate,
        });

        console.log("Schedule visit successfully:", response);
      } else {
        alert("Failed to schedule visit. Please try again.");
      }
    } catch (error) {
      console.error("Error scheduling visit:", error);
      alert("Failed to schedule visit. Please try again.");
    }
  };

  // Fetch shortlist property details
  const getShortListPropertyDetail = async () => {
    try {
      const data = await getShortListProperty(preHomerId, propertyId);
      setShortListDetail(data.data);
    } catch (error) {
      console.error("Error fetching shortlist property details:", error);
    }
  };

  // Handle property visit date display
  const propertyVisitDate = () => {
    const date = shortListDetail.short_list_date;
    if (!date) {
      return "No visit date available";
    }

    // Parse the date string into a JavaScript Date object
    const visitDate = new Date(date);

    // Get today's date (ignoring the time component)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Format the date to dd/mm/yyyy
    const formattedDate = `${String(visitDate.getDate()).padStart(
      2,
      "0"
    )}/${String(visitDate.getMonth() + 1).padStart(
      2,
      "0"
    )}/${visitDate.getFullYear()}`;

    // Compare dates
    if (visitDate < today) {
      return `You visited on ${formattedDate}`;
    } else {
      return `Property Visit on ${formattedDate}`;
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!propertyDetails) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography>No property details found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Top Navigation */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => navigate(-1)}>
            <MdOutlineKeyboardBackspace color="black" />
          </IconButton>
          <Typography fontWeight={"bold"} variant="h6">
            Property Details
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          {Object.keys(shortListDetail).length <= 0 && (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#0288d1",
                textTransform: "none",
                borderRadius: "25px",
                px: 5,
                py: 1,
              }}
              onClick={() => {
                createShortListProperty(propertyId, preHomerId)
                  .then((response) => setShortListDetail(response.data))
                  .catch((error) => console.error("Error shortlisting property:", error));
              }}
            >
              Shortlist Property
            </Button>
          )}

          {!Object.keys(shortListDetail).length <= 0 &&
            !shortListDetail.short_list_date && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  displayEmpty
                  sx={{ width: 200, borderRadius: "25px" }}
                >
                  <MenuItem value="" disabled>
                    Schedule a Visit
                  </MenuItem>
                  {upcomingDates.map((date, index) => (
                    <MenuItem key={index} value={date}>
                      {date}
                    </MenuItem>
                  ))}
                </Select>
                {selectedDate && (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#0288d1",
                      textTransform: "none",
                      borderRadius: "25px",
                    }}
                    onClick={handleScheduleVisit}
                  >
                    Confirm
                  </Button>
                )}
              </Box>
            )}
        </Box>
      </Box>

      {/* Property Title and Status */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6" fontWeight={"bold"}>
          {propertyDetails.property_name} ({propertyDetails.property_location})
        </Typography>

        {Object.keys(shortListDetail).length > 0 && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#F8C86B",
                textTransform: "none",
                borderRadius: "25px",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Shortlisted
            </Button>
            {shortListDetail.short_list_date && (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#D4EDF4",
                  textTransform: "none",
                  borderRadius: "25px",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {propertyVisitDate()}
              </Button>
            )}
          </Box>
        )}
      </Box>

      {/* Tabs */}
      <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
        {/* Add an "All" tab to show all images */}
        <Chip
          label="All"
          clickable
          onClick={() => handleTabChange("All")}
          sx={{
            backgroundColor: selectedTab === "All" ? "#0288d1" : "#e0e0e0",
            color: selectedTab === "All" ? "#fff" : "#000",
            "&:hover": { backgroundColor: "#0277bd", color: "#fff" },
          }}
        />
        {/* Render tabs for each key in property_images */}
        {propertyDetails?.property_images &&
          Object.keys(propertyDetails.property_images).map((tab, index) => (
            <Chip
              key={index}
              label={tab}
              clickable
              onClick={() => handleTabChange(tab)}
              sx={{
                backgroundColor: selectedTab === tab ? "#0288d1" : "#e0e0e0",
                color: selectedTab === tab ? "#fff" : "#000",
                "&:hover": { backgroundColor: "#0277bd", color: "#fff" },
              }}
            />
          ))}
      </Box>

      {/* Image Carousel */}
      <Box
        sx={{
          mb: 3,
          borderRadius: 2,
          overflow: "hidden",
          p: 2,
        }}
      >
        <Box
          sx={{
            position: "relative",
            backgroundColor: "#e0e0e0",
            height: 380,
            borderRadius: 5,
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              left: 10,
              transform: "translateY(-50%)",
              backgroundColor: "#fff",
            }}
            onClick={handlePrevImage}
            disabled={filteredImages.length === 0}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {filteredImages.length > 0 ? (
              <img
                src={filteredImages[imageIndex]}
                alt="Property"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <Typography>No Images Available</Typography>
            )}
          </Box>
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              right: 10,
              transform: "translateY(-50%)",
              backgroundColor: "#fff",
            }}
            onClick={handleNextImage}
            disabled={filteredImages.length === 0}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Property Details */}
      <Grid container spacing={2}>
        {/* Property Features */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: "#fff",
              p: 2,
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Property Features
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Number of Bedrooms:</strong> {propertyDetails.bhk}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Facing Direction:</strong>{" "}
              {propertyDetails.facing_direction}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Floor:</strong> {propertyDetails.floor}
            </Typography>
          </Box>
        </Grid>

        {/* General Property Information */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: "#fff",
              p: 2,
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              General Information
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Area:</strong> {propertyDetails.property_area_sq_ft} sq ft
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Asking Price:</strong> ₹{propertyDetails.asking_price}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Location:</strong> {propertyDetails.property_location}
            </Typography>
            <Typography variant="body1">
              <strong>Description:</strong> {propertyDetails.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PropertyDetailsScreen;