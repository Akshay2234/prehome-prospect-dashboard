
import "../App.css";



const ViewPropButton = ({text, ...props }) => {
  return (
    <button
      type="button"
                className="view-prop-btn"
      
      {...props} // Spread any additional props for customization
    >
      {text}
    </button>
  );
};

export default ViewPropButton;
