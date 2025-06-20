import { Box, Typography, Container, useMediaQuery, Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OutlineCta from "../components/OutlineCta";
import BootstrapCarousel from "../components/BootstrapCarousel";
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

  const API_KEY = 'AIzaSyA08jwhkUMNssPvaWsRlYE-S--IBpa4mUc';

  useEffect(() => {
    if (!id) {
      console.warn("No property ID found. Redirecting...");
      navigate("/available-property");
      return;
    }

    fetchProperty();
  }, [id]);

  useEffect(() => {
    if (property) {
      fetchNearbyPlaces(property.location);
    }
    // eslint-disable-next-line
  }, [radius, property]);

  const fetchProperty = async () => {
    try {
      const res = await axios.get(`https://prehome-prospect-dashboard.onrender.com/api/properties/${id}`);
      setProperty(res.data);
      setSelectedImageUrl(res.data.images[0]?.url); // Show first image by default
      fetchNearbyPlaces(res.data.location);
    } catch (err) {
      console.error("Error fetching property:", err);
    }
  };

  const fetchNearbyPlaces = async (location) => {
    try {
      const res = await axios.post('https://prehome-prospect-dashboard.onrender.com/api/properties/nearby-places', {
        location: location,
        type: 'restaurant',
        radius: radius
      });
      setNearbyPlaces(res.data);
    } catch (error) {
      console.error('Error fetching nearby places:', error);
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
console.log("nearbyPlaces", nearbyPlaces);
  console.log("property", property);
  return (
    <Box className="property-main-box" sx={{ p: 2, backgroundColor: { xs: "#fff", md: "#ECECEC" }, minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Box className="navigation-box">
          <img src={LeftArrow} alt="Back" />
          <Typography variant="h5" fontWeight="bold" sx={{ display: { xs: "none", md: "block", lg: "block" } }}>
            Property Details
          </Typography>
          {isMobile && (
            <Typography fontWeight="bold" fontSize={16} padding="8% 0">
              About The Property
            </Typography>
          )}
        </Box>

        <Box className="Heading-box">
          <h6 className="prop-card-head">{property.title}</h6>
          <ShortlistCTA />
        </Box>

        {/* Image Labels */}
        <Box className="cta-container">
          {property.images?.map((image, index) => (
            <OutlineCta
              key={index}
              text={image.label}
              onClick={() => handleImageLabelClick(image.url)}
            />
          ))}
        </Box>
      </Container>

      <Container maxWidth="lg" sx={{ mt: 2 }}>
        {/* Show selected image */}
        {selectedImageUrl && (
          <img
            src={selectedImageUrl}
            alt="Selected"
            style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "8px" }}
          />
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
          <Typography gutterBottom>Set Nearby Search Radius (meters): {radius}</Typography>
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