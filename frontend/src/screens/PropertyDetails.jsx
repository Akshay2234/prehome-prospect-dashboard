import {
  Box,
  Typography,
  Container,
  useMediaQuery,
  Slider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OutlineCta from "../components/OutlineCta";
import LeftArrow from "../assets/Component 13.png";
import ShortlistCTA from "../components/ShortListCta";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import MapComponent from "../components/MapComponent";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [property, setProperty] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [radius, setRadius] = useState(2000);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [selectedView, setSelectedView] = useState(null);

  useEffect(() => {
    const checkUserChange = () => {
      const currentUserId = localStorage.getItem("user_id");
      if (currentUserId !== userId) {
        setUserId(currentUserId);
      }
    };
    const interval = setInterval(checkUserChange, 1000);
    return () => clearInterval(interval);
  }, [userId]);

  useEffect(() => {
    if (!id) {
      navigate("/available-property");
      return;
    }
    fetchProperty();
  }, [id]);

  useEffect(() => {
    if (property) {
      fetchNearbyPlaces(property.location);
    }
  }, [radius, property]);

  useEffect(() => {
    if (property?.features?.views?.length > 0) {
      const defaultView =
        property.features.views.find((v) => v.selected)?.label ||
        property.features.views[0].label;
      setSelectedView(defaultView);
    }
  }, [property]);

  const fetchProperty = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/properties/${id}`
      );
      setProperty(res.data);
      setSelectedImageUrl(res.data.images[0]?.url);
    } catch (err) {
      console.error("Error fetching property:", err);
    }
  };

  const fetchNearbyPlaces = async (location) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/properties/nearby-places",
        {
          location: location,
          type: "restaurant",
          radius: radius,
        }
      );
      setNearbyPlaces(res.data);
    } catch (error) {
      console.error("Error fetching nearby places:", error);
    }
  };

  const handleRadiusChange = (event, newValue) => {
    setRadius(newValue);
  };

  const handleImageLabelClick = (url) => {
    setSelectedImageUrl(url);
  };

  if (!property) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h6" mt={5}>
          Loading property details...
        </Typography>
      </Container>
    );
  }

  return (
    <Box
      className="property-main-box"
      sx={{
        backgroundColor: "#ECECEC",
        minHeight: "100vh",
        p: 0,
      }}
    >
      <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: 2,
            mb: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <img
                src={LeftArrow}
                alt="Back"
                style={{ cursor: "pointer", marginRight: 12 }}
                onClick={() => navigate("/available-property")}
              />
              <Typography variant="h5" fontWeight={700}>
                Property Details
              </Typography>
            </Box>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
              {property.title}
            </Typography>
            <Box className="cta-container">
              {(property.features?.views || []).map((view, idx) => {
                const isSelected = view.label === selectedView;
                return (
                  <Box
                    key={idx}
                    onClick={() => setSelectedView(view.label)}
                    sx={{
                      px: 3,
                      py: 1,
                      borderRadius: "30px",
                      border: isSelected ? "none" : "2px solid #222",
                      backgroundColor: isSelected ? "#7BD1E6" : "transparent",
                      color: isSelected ? "#fff" : "#222",
                      fontWeight: 600,
                      fontSize: 16,
                      cursor: "pointer",
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        backgroundColor: isSelected ? "#7BD1E6" : "#f0f0f0",
                      },
                    }}
                  >
                    {view.label}
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "flex-start", md: "flex-end" },
              gap: 2,
              minWidth: 320,
            }}
          >
            {!property.visitDate && (
              <>
                <ShortlistCTA propertyId={property._id} userId={userId} />
                <OutlineCta
                  text="Schedule Visit"
                  onClick={() => {}}
                  sx={{
                    background: "#0086AD",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 20,
                    borderRadius: "30px",
                    px: 4,
                    py: 1.5,
                    mt: 1,
                    width: 220,
                  }}
                />
              </>
            )}
            {property.shortlisted && property.visitDate && (
              <>
                <Box
                  sx={{
                    background: "#FFD580",
                    color: "#222",
                    fontWeight: "bold",
                    px: 4,
                    py: 1.5,
                    borderRadius: "30px",
                    fontSize: 20,
                    mb: 1,
                    width: 220,
                    textAlign: "center",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  Shortlisted
                </Box>
                <Box
                  sx={{
                    background: "#C7F6FE",
                    color: "#222",
                    fontWeight: "bold",
                    px: 3,
                    py: 1.5,
                    borderRadius: "30px",
                    fontSize: 18,
                    width: 320,
                    textAlign: "center",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  Property Visit on{" "}
                  {new Date(property.visitDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Box>
              </>
            )}
          </Box>
        </Box>

        {/* Image Labels */}
        <Box className="cta-container" sx={{ mb: 2 }}>
          {property.images?.map((image, index) => (
            <OutlineCta
              key={index}
              text={image.label}
              onClick={() => handleImageLabelClick(image.url)}
            />
          ))}
        </Box>

        {/* Selected Image */}
        {selectedImageUrl && (
          <Box sx={{ mt: 2 }}>
            <img
              src={selectedImageUrl}
              alt="Selected"
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "16px",
              }}
            />
          </Box>
        )}
      </Container>

      {/* Feature Cards */}
      <Box className="text-card-container">
        <Box className="text-card">
          <p className="Heading-text-card">Property Features</p>
          <p className="sub-Heading-1">Interior Features</p>
          <p className="sub-Heading">{property.features.interior.join(", ")}</p>
          <p className="sub-Heading-1">Exterior Features</p>
          <p className="sub-Heading">{property.features.exterior.join(", ")}</p>
          <p className="sub-Heading-1">Basement</p>
          <p className="sub-Heading">{property.features.basement}</p>
        </Box>

        <Box className="text-card">
          <p className="Heading-text-card">General Property Information</p>
          <p className="sub-Heading-1">Address</p>
          <p className="sub-Heading">{property.generalInfo.propertyAddress}</p>
          <p className="sub-Heading-1">Property Type</p>
          <p className="sub-Heading">{property.generalInfo.propertyType}</p>
          <p className="sub-Heading-1">Year Built</p>
          <p className="sub-Heading">{property.generalInfo.yearBuilt}</p>
          <p className="sub-Heading-1">Square Footage</p>
          <p className="sub-Heading">{property.generalInfo.squareFootage}</p>
          <p className="sub-Heading-1">Bedrooms</p>
          <p className="sub-Heading">{property.generalInfo.numberOfBedrooms}</p>
          <p className="sub-Heading-1">Bathrooms</p>
          <p className="sub-Heading">{property.generalInfo.numberOfBathrooms}</p>
          <p className="sub-Heading-1">Floors</p>
          <p className="sub-Heading">{property.generalInfo.numberOfFloors}</p>
        </Box>
      </Box>

      {/* Nearby Slider and Map */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Typography gutterBottom>
            Set Nearby Search Radius (meters): {radius}
          </Typography>
          <Slider
            value={radius}
            min={500}
            max={5000}
            step={100}
            onChange={handleRadiusChange}
            valueLabelDisplay="auto"
          />
        </Box>
        <MapComponent
          center={{ lat: property.latitude, lng: property.longitude }}
          places={nearbyPlaces}
        />
      </Container>
    </Box>
  );
};

export default PropertyDetails;
