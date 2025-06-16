const axios = require("axios");
const Property = require("../models/propertyModel");

// GET all properties
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch properties" });
  }
};

// GET property by ID with latitude and longitude
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Call Google Geocoding API to get latitude and longitude
       const API_KEY = "AIzaSyA08jwhkUMNssPvaWsRlYE-S--IBpa4mUc";

    const geoResponse = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: { address: property.location, key: API_KEY },
    });

    if (geoResponse.data.status === "OK" && geoResponse.data.results.length > 0) {
      const { lat, lng } = geoResponse.data.results[0].geometry.location;

      // Send the property along with latitude and longitude
      res.json({ ...property._doc, latitude: lat, longitude: lng });
    } else {
      // If geocoding fails, just send the property without coordinates
      res.json(property);
    }
  } catch (err) {
    console.error(err);
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
