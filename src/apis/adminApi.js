import axios from 'axios';

import { BASE_API_URL } from './config';

export const updateProperty = async (propertyData) => {
  try {
    const response = await axios.put(`${BASE_API_URL}/updateProperty`, propertyData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating property:', error);
    throw error;
  }
};

/**
 * Get user profile by ID
 * @param {string} id
 */
export const getUserProfile = async (id) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/getUserProfile`, {
      params: { _id: id },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfileData = async (userData) => {
  try {
    const response = await axios.put(`${BASE_API_URL}/updateUserProfileData`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const getAllProperty = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/getAllProperty`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all properties:', error);
    throw error; // Re-throwing error for handling at the call site
  }
};

/**
 * Get shortlisted properties for a specific user
 * @param {string} preHomerId - The ID of the pre-homer user
 */
export const getShortListProperty = async (preHomerId, propertyId) => {
  console.log('oye')
  try {
    const response = await axios.get(`${BASE_API_URL}/getShortListProperty`, {
      params: { pre_homer_id: preHomerId, property_id: propertyId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching shortlisted properties:', error);
    throw error;
  }
};

/**
 * Create a new shortlisted property
 * @param {object} propertyData - The property data to be added to the shortlist
 * @param {string} propertyData.property_id - The ID of the property
 * @param {string} propertyData.pre_homer_id - The ID of the pre-homer user
 * @param {string} propertyData.short_list_date - The date the property was shortlisted
 */
export const createShortListProperty = async (propertyId,preHomerId,shortListDate='') => {
  try {
    const response = await axios.post(`${BASE_API_URL}/createShortListProperty`, {
      property_id: propertyId,
      pre_homer_id: preHomerId,
      short_list_date: shortListDate,
    },
    {
    headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating shortlisted property:', error);
    throw error;
  }
};

/**
 * Delete a shortlisted property by its ID
 * @param {string} id - The ID of the shortlisted property to delete
 */
export const deleteShortListProperty = async (id) => {
  try {
    const response = await axios.put(`${BASE_API_URL}/deleteShortList`, { _id: id }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting shortlisted property:', error);
    throw error;
  }
};

/**
 * Create a new shortlisted property using URL parameters
 * @param {string} propertyId - The ID of the property
 * @param {string} preHomerId - The ID of the pre-homer user
 * @param {string} shortListDate - The date the property was shortlisted
 */
export const createShortListPropertyWithParams = async (propertyId, preHomerId, shortListDate) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/createShortListProperty`, {
      property_id: propertyId,
      pre_homer_id: preHomerId,
      short_list_date: shortListDate,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating shortlisted property with params:', error);
    throw error;
  }
};

/**
 * Fetch property details by property ID
 * @param {string} propertyId - The ID of the property to fetch
 */
export const getPropertyDetails = async (propertyId) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/getProperty`, {
      params: { property_id: propertyId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching property details:', error);
    throw error;
  }
};


// Function to edit role
export const editRole = async (_id, role) => {
  try {
    const endpoint = `${BASE_API_URL}/editRole`;
    const data = { _id, role };
    const response = await axios.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error editing role:', error);
    throw error;
  }
};
