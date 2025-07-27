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
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [visitDate, setVisitDate] = useState(null);
  const [status, setStatus] = useState("");

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
      const res = await axios.get(`http://localhost:5000/api/properties/${id}`);
      setProperty(res.data);
     setSelectedImageUrl(`http://localhost:5000${res.data.images[0]?.url}`);
;

      const userActivity = await axios.get(
        `http://localhost:5000/api/activity/${userId}/${res.data._id}`
      );

      if (userActivity.data) {
        setIsShortlisted(userActivity.data.shortlisted || false);
        setVisitDate(userActivity.data.visitDate ? new Date(userActivity.data.visitDate) : null);
        setStatus(userActivity.data.status || "");
      }
    } catch (err) {
      console.error("Error fetching property or user activity:", err);
    }
  };

  const fetchNearbyPlaces = async (location) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/properties/nearby-places",
        { location, type: "restaurant", radius }
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
    <Box sx={{ backgroundColor: "#ECECEC", minHeight: "100vh", p: 0 }}>
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
              <Typography variant="h5" fontWeight={700}>Property Details</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
                mb: 2,
              }}
            >
              <Typography variant="h4" fontWeight={700} sx={{ mr: 2, flexShrink: 0 }}>
                {property.title}
              </Typography>

              {status === "Visited" && (
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
                  <Box
                    sx={{
                      background: "#DAF7A6",
                      color: "#222",
                      fontWeight: 600,
                      px: 3,
                      py: 1.2,
                      borderRadius: "20px",
                      fontSize: 16,
                      textAlign: "center",
                      minWidth: 160,
                      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                    }}
                  >
                    Property Visited
                  </Box>
                  {visitDate && (
                    <Box
                      sx={{
                        background: "#C7F6FE",
                        color: "#222",
                        fontWeight: 600,
                        px: 3,
                        py: 1.2,
                        borderRadius: "20px",
                        fontSize: 16,
                        textAlign: "center",
                        minWidth: 200,
                        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                      }}
                    >
                      Property Visit on{" "}
                      {new Date(visitDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </Box>
                  )}
                </Box>
              )}
            </Box>

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
            {status !== "Visited" && (
              <>
                {(isShortlisted || visitDate) && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                      flexWrap: "wrap",
                      justifyContent: isMobile ? "flex-start" : "flex-end",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    {isShortlisted && (
                      <Box
                        sx={{
                          background: "#FFD580",
                          color: "#222",
                          fontWeight: 600,
                          px: 3,
                          py: 1.2,
                          borderRadius: "20px",
                          fontSize: 16,
                          textAlign: "center",
                          minWidth: 140,
                          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                        }}
                      >
                        Shortlisted
                      </Box>
                    )}
                    {visitDate && (
                      <Box
                        sx={{
                          background: "#C7F6FE",
                          color: "#222",
                          fontWeight: 600,
                          px: 3,
                          py: 1.2,
                          borderRadius: "20px",
                          fontSize: 16,
                          textAlign: "center",
                          minWidth: 200,
                          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                        }}
                      >
                        Property Visit on{" "}
                        {new Date(visitDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </Box>
                    )}
                  </Box>
                )}

                <ShortlistCTA
                  propertyId={property._id}
                  userId={userId}
                  onUpdate={(updated) => {
                    setIsShortlisted(updated.shortlisted || false);
                    setVisitDate(updated.visitDate ? new Date(updated.visitDate) : null);
                    setStatus(updated.status || "");
                  }}
                />
              </>
            )}
          </Box>
        </Box>

        <Box className="cta-container" sx={{ mb: 2 }}>
          {property.images?.map((image, index) => (
            <OutlineCta
              key={index}
              text={image.label}
             onClick={() => handleImageLabelClick(`http://localhost:5000${image.url}`)}
            />
          ))}
        </Box>

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
