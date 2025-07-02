import "../assets/style.css";

import { useState } from "react";


const ChatbotLargeCta = ({text,...props}) => {
  
   const [isClicked, setIsClicked] = useState(false);

   const handleClick = () => {
    setIsClicked(true);

  };

  return (
    <>
       <button
      type="button"
    className={`chatbot-application-btn ${isClicked ? 'clicked' : ''}`}
    onClick={handleClick}
      {...props} // Spread any additional props for customization
    >
      {text}
    </button>
    </>
  );
};
export default ChatbotLargeCta;
