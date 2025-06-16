const express = require("express");
const router = express.Router();
const axios = require("axios");
const {
  getProperties,
  getPropertyById,
  createProperty,
} = require("../controllers/propertyController");

// Existing routes
router.get("/", getProperties);
router.get("/:id", getPropertyById);
router.post("/", createProperty);

// ✅ Nearby Places Route (Updated to return formatted response)
router.post("/nearby-places", async (req, res) => {
  const { location, type, radius } = req.body;

  if (!location || !type || !radius) {
    return res.status(400).json({ message: "Location, type, and radius are required" });
  }

  try {
    const API_KEY = "AIzaSyA08jwhkUMNssPvaWsRlYE-S--IBpa4mUc";

    // Convert address to lat/lng
    const geoResponse = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: { address: location, key: API_KEY },
    });

    if (geoResponse.data.status !== "OK") {
      return res.status(404).json({ message: "Location not found" });
    }

    const { lat, lng } = geoResponse.data.results[0].geometry.location;

    // Fetch nearby places
    const placesResponse = await axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", {
      params: { location: `${lat},${lng}`, radius, type, key: API_KEY },
    });

    // Format the response to only return required fields
    const formattedPlaces = placesResponse.data.results.map(place => ({
      name: place.name,
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
      types: place.types
    }));

    res.json(formattedPlaces);
  } catch (error) {
    console.error("Error fetching nearby places:", error.message);
    res.status(500).json({ message: "Error fetching nearby places" });
  }
});

module.exports = router;
