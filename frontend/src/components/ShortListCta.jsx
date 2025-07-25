import React, { useState, useEffect } from 'react';
import { FaCheckDouble } from 'react-icons/fa';
import ViewPropButton from './ViewPropButton';
import shortlistIcon from "../assets/event_upcoming.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { addMonths, isSameMonth, isSameYear, format } from 'date-fns';

const ShortlistCTA = ({ userId, propertyId, onUpdate }) => {
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [visitDate, setVisitDate] = useState(null);
  const [status, setStatus] = useState(""); // Added status tracking

  useEffect(() => {
    const fetchUserActivity = async () => {
      try {
        const res = await axios.get(`https://prehome-prospect-dashboard.onrender.com/api/activity/${userId}/${propertyId}`);
        if (res.data) {
          setIsShortlisted(res.data.shortlisted || false);
          setVisitDate(res.data.visitDate ? new Date(res.data.visitDate) : null);
          setStatus(res.data.status || ""); // Set current status
        }
      } catch (err) {
        console.error("Error fetching user activity:", err);
      }
    };

    if (userId && propertyId) {
      fetchUserActivity();
    }
  }, [userId, propertyId]);

  const saveActivity = async (updatedFields) => {
    try {
      const res = await axios.post("https://prehome-prospect-dashboard.onrender.com/api/activity/save", {
        userId,
        propertyId,
        ...updatedFields,
      });

      if (onUpdate) onUpdate(res.data);

      // Update local state after successful save
      if (updatedFields.shortlisted !== undefined) setIsShortlisted(updatedFields.shortlisted);
      if (updatedFields.visitDate) setVisitDate(new Date(updatedFields.visitDate));
      if (updatedFields.status) setStatus(updatedFields.status);
    } catch (err) {
      console.error("Error saving activity:", err);
    }
  };

  const handleShortlistClick = () => {
    saveActivity({ shortlisted: true, status: "Interested" });
  };

  const handleScheduleVisitClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (date) => {
    saveActivity({ visitDate: date, status: "Visit Scheduled" });
    setShowCalendar(false);
  };

  const isDateSelectable = (date) => {
    const today = new Date();
    const nextMonth = addMonths(today, 1);
    return (
      (isSameMonth(date, today) && isSameYear(date, today)) ||
      (isSameMonth(date, nextMonth) && isSameYear(date, nextMonth))
    );
  };

  const formattedDate = visitDate ? format(visitDate, "MMMM d, yyyy") : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {!isShortlisted && (
        <button onClick={handleShortlistClick} className="view-prop-btn">
          <ViewPropButton
            text="Shortlist Property"
            img={shortlistIcon}
            className="view-prop-btn icon-margin"
          />
        </button>
      )}

      {isShortlisted && (
        <>
          {status !== "Visited" && (
            <button
              onClick={handleScheduleVisitClick}
              className="view-prop-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: "10px 24px",
                fontSize: "16px",
                borderRadius: "30px",
                backgroundColor: "#0086AD",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
                border: "none"
              }}
            >
              <FaCheckDouble />
              {visitDate ? "Reschedule Visit" : "Schedule Visit"}
            </button>
          )}

          <div
            style={{
              background: "#FFD580",
              color: "#222",
              fontWeight: "bold",
              padding: "10px 24px",
              borderRadius: "30px",
              fontSize: 16,
              width: "fit-content",
              textAlign: "center",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            Shortlisted
          </div>
        </>
      )}

      {visitDate && (
        <div
          style={{
            background: "#C7F6FE",
            color: "#222",
            fontWeight: "bold",
            padding: "10px 24px",
            borderRadius: "30px",
            fontSize: 16,
            width: "fit-content",
            textAlign: "center",
          }}
        >
          Property Visit on {formattedDate}
        </div>
      )}

      {showCalendar && (
        <div style={{ marginTop: "10px" }}>
          <DatePicker
            selected={visitDate}
            onChange={handleDateSelect}
            filterDate={isDateSelectable}
            inline
          />
        </div>
      )}
    </div>
  );
};

export default ShortlistCTA;
