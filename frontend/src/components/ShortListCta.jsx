import React, { useState, useEffect } from 'react';
import { FaCheckDouble } from 'react-icons/fa';
import ViewPropButton from './ViewPropButton';
import shortlistIcon from "../assets/event_upcoming.png";
import PropertyCardButton from './PropertyCardButton';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { addMonths, isSameMonth, isSameYear, format } from 'date-fns';

const ShortlistCTA = ({ userId, propertyId }) => {
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [visitDate, setVisitDate] = useState(null);

  useEffect(() => {
    const fetchUserActivity = async () => {
      try {
        const res = await axios.get(`http://35.154.52.56:5000/api/activity/${userId}/${propertyId}`);
        if (res.data) {
          setIsShortlisted(res.data.shortlisted || false);
          setVisitDate(res.data.visitDate ? new Date(res.data.visitDate) : null);
        } else {
          setIsShortlisted(false);
          setVisitDate(null);
        }
      } catch (err) {
        console.error("Error fetching user activity:", err);
        setIsShortlisted(false);
        setVisitDate(null);
      }
    };

    if (userId && propertyId) {
      fetchUserActivity();
    }

    // Reset state when user or property changes
    return () => {
      setIsShortlisted(false);
      setVisitDate(null);
    };
  }, [userId, propertyId]);

  const saveActivity = async (updatedFields) => {
    try {
      await axios.post("http://35.154.52.56:5000/api/activity/save", {
        userId,
        propertyId,
        ...updatedFields,
      });
    } catch (err) {
      console.error("Error saving activity:", err);
    }
  };

  const handleShortlistClick = () => {
    setIsShortlisted(true);
    saveActivity({ shortlisted: true });
  };

  const handleScheduleVisitClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (date) => {
    setVisitDate(date);
    setShowCalendar(false);
    saveActivity({ visitDate: date });
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
    <div className="cta-container-shortlist">
      {!isShortlisted ? (
        <button onClick={handleShortlistClick} className="view-prop-btn">
          <ViewPropButton
            text="Shortlist Property"
            img={shortlistIcon}
            className="view-prop-btn icon-margin"
          />
        </button>
      ) : (
        <>
          <button onClick={handleScheduleVisitClick} className="view-prop-btn">
            <FaCheckDouble style={{ marginRight: 8 }} />
            Schedule Visit
          </button>
          <PropertyCardButton text="shortlisted" />
        </>
      )}

      {visitDate && (
        <div style={{ marginTop: "8px", fontWeight: "bold", color: "#333" }}>
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
