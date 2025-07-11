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
    const geoResponse = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: { address: property.location, key: API_KEY },
    });

    const coordinates =
      geoResponse.data.status === "OK" && geoResponse.data.results.length > 0
        ? geoResponse.data.results[0].geometry.location
        : {};

    res.json({
      ...property.toObject(),
      latitude: coordinates.lat || null,
      longitude: coordinates.lng || null,
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
