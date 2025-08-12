const axios = require("axios");
const Property = require("../models/propertyModel");
const UserActivity = require("../models/UserActivity");

// GET all properties (with optional user enrichment)
exports.getProperties = async (req, res) => {
  try {
    const { userId } = req.query;
    const properties = await Property.find();

    if (userId) {
      const activities = await UserActivity.find({ userId });

const activityMap = {};
activities.forEach((activity) => {
  activityMap[activity.propertyId] = {
    shortlisted: activity.shortlisted,
    visitDate: activity.visitDate,
    status: activity.status, // ✅ Include this
  };
});

const enrichedProperties = properties.map((property) => {
  const activity = activityMap[property._id] || {};
  return {
    ...property.toObject(),
    shortlisted: activity.shortlisted || false,
    visitDate: activity.visitDate || null,
    status: activity.status || "", // ✅ Add status here
  };
});

      return res.json(enrichedProperties);
    }

    res.json(properties);
  } catch (err) {
    console.error("Failed to fetch properties:", err);
    res.status(500).json({ error: "Failed to fetch properties" });
  }
};

// GET property by ID (with optional user enrichment and geocoding)
// GET property by ID (with optional user enrichment and geocoding + fallback)
exports.getPropertyById = async (req, res) => {
  const userId = req.query.userId;

  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    let shortlisted = false;
    let visitDate = null;

    if (userId) {
      const activity = await UserActivity.findOne({
        userId,
        propertyId: property._id,
      });
      if (activity) {
        shortlisted = activity.shortlisted;
        visitDate = activity.visitDate;
      }
    }

    const API_KEY = "AIzaSyA08jwhkUMNssPvaWsRlYE-S--IBpa4mUc";
    let coordinates = {};

    // 1️⃣ Try exact address geocoding
    try {
      const geoResponse = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        { params: { address: property.location, key: API_KEY } }
      );

      if (
        geoResponse.data.status === "OK" &&
        geoResponse.data.results.length > 0
      ) {
        coordinates = geoResponse.data.results[0].geometry.location;
      }
    } catch (err) {
      console.warn("Exact geocoding failed:", err.message);
    }

    // 2️⃣ Fallback: try city/locality if exact failed
    if (!coordinates.lat || !coordinates.lng) {
      console.log("Trying city-level geocoding...");
      const cityName = property.location.split(",").slice(-1)[0].trim(); // last part as city
      try {
        const cityGeoResponse = await axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json",
          { params: { address: cityName, key: API_KEY } }
        );

        if (
          cityGeoResponse.data.status === "OK" &&
          cityGeoResponse.data.results.length > 0
        ) {
          coordinates = cityGeoResponse.data.results[0].geometry.location;
        }
      } catch (err) {
        console.warn("City geocoding failed:", err.message);
      }
    }

    // 3️⃣ Final fallback: default location (India center)
    if (!coordinates.lat || !coordinates.lng) {
      console.log("Using default coordinates...");
      coordinates = { lat: 20.5937, lng: 78.9629 }; // India center
    }

    res.json({
      ...property.toObject(),
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      shortlisted,
      visitDate,
    });
  } catch (err) {
    console.error("Error fetching property:", err);
    res.status(500).json({ error: "Failed to fetch property" });
  }
};


// POST new property
exports.createProperty = async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (err) {
    res.status(400).json({ error: "Failed to create property" });
  }
};
