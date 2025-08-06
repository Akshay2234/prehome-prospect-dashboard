import React, { useState, useEffect } from 'react';
import { FaCheckDouble } from 'react-icons/fa';
import ViewPropButton from './ViewPropButton';
import shortlistIcon from "../assets/event_upcoming.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { addMonths, isSameMonth, isSameYear, format } from 'date-fns';
import {
  Box,
  Button,
} from "@mui/material";

const ShortlistCTA = ({ userId, propertyId, onUpdate }) => {
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [visitDate, setVisitDate] = useState(null);
    const [propertyVisited, setPropertyVisited] = useState(false);

  const [status, setStatus] = useState(""); // Added status tracking

  useEffect(() => {
    const fetchUserActivity = async () => {
      try {
        const res = await axios.get(`https://prehome-prospect-dashboard.onrender.com/api/activity/${userId}/${propertyId}`);
        if (res.data) {
          setIsShortlisted(res.data.shortlisted || false);
          setVisitDate(res.data.visitDate ? new Date(res.data.visitDate) : null);
          setPropertyVisited(res.data.propertyVisited || false)
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

<Box
            sx={{
              display: "flex",
              flexDirection: {xs:"column",md:"row"},
              alignItems: { xs: "flex-start", md: "flex-end" },
              gap: 2,
              // minWidth: 320,
            }}
          >
          
      {isShortlisted && (
        <>
          {status !== "Visited" && (
            <button
              onClick={handleScheduleVisitClick}
              // className="view-prop-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: "10px 24px",
                fontSize: {xs:12,md:16},
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
          {status == "Visited" && (
            <Button
            sx={{
              background: "#FFD580",
              color: "#222",
              fontWeight: "bold",
              padding: "10px 24px",
              borderRadius: "30px",
              fontSize: {xs:12,md:14},
               textTransform:"capitalize",
fontFamily:"Poppins",
              width: "fit-content",
              textAlign: "center",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            Shortlisted
          </Button>
          )}

          
        </>
      )}

      {visitDate && (
        <Button
          sx={{
            background: "#C7F6FE",
            color: "#3E3E3E",
            fontWeight: "bold",
            padding: "10px 24px",
            borderRadius: "30px",
            fontSize: {xs:12,md:14},
            textTransform:"capitalize",
fontFamily:"Poppins",
            width: "fit-content",
            textAlign: "center",
          }}
        >
          Property Visit on {formattedDate}
        </Button>
      )}
</Box>
      {showCalendar && (
        <div style={{ marginTop: "10px",position:"absolute",top:"150px",right: "60px" }}>
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
