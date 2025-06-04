
import "../assets/style.css";

import { useNavigate } from "react-router-dom";


const ViewPropButton = ({text,to, ...props }) => {
  const navigate = useNavigate(); // For navigation
 const handleClick = () => {
    navigate(to);
  };
  return (
    <button
      type="button"
                className="view-prop-btn"
                onClick={handleClick}
      {...props} // Spread any additional props for customization
    >
      {text}
    </button>
  );
};

export default ViewPropButton;
