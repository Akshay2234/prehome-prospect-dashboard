import "../assets/style.css";
import { useState } from "react";

const OutlineCta = ({ text, ...props }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <button
      type="button"
      className={`outline-cta ${isClicked ? 'clicked' : ''}`}
      onClick={handleClick}
      {...props}
    >
      {text}
    </button>
  );
};

export default OutlineCta;
