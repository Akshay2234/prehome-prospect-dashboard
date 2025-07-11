import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", location: "" });
  const [editMode, setEditMode] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [activityStatus, setActivityStatus] = useState({});

  const API_BASE = "http://localhost:5000/api";

  useEffect(() => {
    fetchProperties();
    fetchUsers();
    fetchUserActivities();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${API_BASE}/properties`);
      setProperties(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE}/admin/users`);
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchUserActivities = async () => {
    try {
      const res = await axios.get(`${API_BASE}/admin/all-activities`);
      const map = {};
      res.data.forEach(({ userId, propertyId, status }) => {
        if (!map[userId]) map[userId] = {};
        map[userId][propertyId] = status || "";
      });
      setActivityStatus(map);
    } catch (err) {
      console.error("Error fetching activities:", err);
    }
  };

  const handleAddOrUpdateProperty = async () => {
    if (!form.title || !form.description || !form.location)
      return alert("All fields required");

    try {
      if (editMode) {
        await axios.put(`${API_BASE}/admin/property/${editingPropertyId}`, form);
      } else {
        await axios.post(`${API_BASE}/admin/property`, form);
      }
      fetchProperties();
      resetForm();
    } catch (err) {
      console.error("Failed to submit property:", err);
    }
  };

  const handleEditProperty = (property) => {
    setForm({
      title: property.title,
      description: property.description,
      location: property.location,
    });
    setEditMode(true);
    setEditingPropertyId(property._id);
  };

  const handleDeleteProperty = async (id) => {
    if (window.confirm("Delete this property?")) {
      await axios.delete(`${API_BASE}/admin/property/${id}`);
      fetchProperties();
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Remove this user?")) {
      await axios.delete(`${API_BASE}/admin/user/${id}`);
      fetchUsers();
    }
  };

  const handleToggleBlockUser = async (id) => {
    await axios.patch(`${API_BASE}/admin/user/block/${id}`);
    fetchUsers();
  };

  const handleStatusChange = (userId, propertyId, newStatus) => {
    setActivityStatus((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [propertyId]: newStatus,
      },
    }));
  };

  const saveStatus = async (userId, propertyId) => {
    const status = activityStatus[userId]?.[propertyId];
    try {
      await axios.patch(`${API_BASE}/activity/status`, { userId, propertyId, status });
      alert("Status updated!");
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const resetForm = () => {
    setForm({ title: "", description: "", location: "" });
    setEditMode(false);
    setEditingPropertyId(null);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Poppins, sans-serif" }}>
      <h2>Admin Panel</h2>

      <section>
        <h3>{editMode ? "Edit Property" : "Add Property"}</h3>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <button onClick={handleAddOrUpdateProperty}>
          {editMode ? "Update" : "Add"} Property
        </button>
        {editMode && <button onClick={resetForm}>Cancel</button>}
      </section>

      <hr />

      <section>
        <h3>All Properties</h3>
        {properties.map((prop) => (
          <div key={prop._id}>
            <strong>{prop.title}</strong> — {prop.location}
            <button onClick={() => handleEditProperty(prop)}>Edit</button>
            <button
              onClick={() => handleDeleteProperty(prop._id)}
              style={{ color: "red" }}
            >
              Delete
            </button>
          </div>
        ))}
      </section>

      <hr />

      <section>
        <h3>All Users</h3>
        {users.map((user) => (
          <div key={user._id} style={{ marginBottom: 20 }}>
            <p>
              <strong>{user.email || user.facebookId || "Anonymous"}</strong>{" "}
              <span
                style={{
                  marginLeft: 10,
                  color: user.isBlocked ? "red" : "green",
                }}
              >
                {user.isBlocked ? "Blocked" : "Active"}
              </span>
              <button
                onClick={() => handleToggleBlockUser(user._id)}
                style={{ marginLeft: 10 }}
              >
                {user.isBlocked ? "Unblock" : "Block"}
              </button>
              <button
                onClick={() => handleDeleteUser(user._id)}
                style={{ marginLeft: 10, color: "red" }}
              >
                Remove
              </button>
            </p>

            {/* Per Property Status Inputs */}
            {properties.map((property) => (
              <div key={property._id} style={{ marginLeft: 30, marginTop: 5 }}>
                <span>{property.title}</span>
                <input
                  placeholder="Status"
                  value={
                    activityStatus[user._id]?.[property._id] || ""
                  }
                  onChange={(e) =>
                    handleStatusChange(user._id, property._id, e.target.value)
                  }
                  style={{ marginLeft: 10 }}
                />
                <button
                  onClick={() => saveStatus(user._id, property._id)}
                  style={{ marginLeft: 10 }}
                >
                  Save
                </button>
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
};

export default AdminPanel;
