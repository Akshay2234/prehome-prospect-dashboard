import React, { useState } from 'react';
import {  FaCheckDouble  } from 'react-icons/fa'; // Example icons
import ViewPropButton from './ViewPropButton';
import shortlistIcon from "../assets/event_upcoming.png"
import PropertyCardButton from './PropertyCardButton';

const ShortlistCTA = () => {
  const [isShortlisted, setIsShortlisted] = useState(false);

  const handleShortlistClick = () => {
    setIsShortlisted(true);
  };

  return (
    <div className="cta-container-shortlist">
      <button
        onClick={handleShortlistClick}
        className="view-prop-btn"
      >
        {isShortlisted ? (
          <>
            <FaCheckDouble style={{ marginRight: 8 }} />
            Schedule Visit
          </>
        ) : (
          
            <ViewPropButton text="Shortlist Property" img={shortlistIcon} className="view-prop-btn icon-margin" ></ViewPropButton>
            
          
        )}
      </button>

      {isShortlisted && (
        <PropertyCardButton text="shortlisted"  />
      )}
    </div>
  );
};

export default ShortlistCTA;
