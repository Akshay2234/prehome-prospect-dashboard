import "../assets/style.css";



const PropertyCardButton = ({ text, ...props }) => {
  return (
    <button
  
      type="button"
      className="card-peach-btn shortlisted"
     
      {...props} // Spread any additional props for customization
    >
      {text}
    </button>
  );
};

export default PropertyCardButton;