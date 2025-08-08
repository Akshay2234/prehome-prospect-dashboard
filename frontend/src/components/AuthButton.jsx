// src/components/Auth/AuthButton.jsx
const AuthButton = ({ text, onClick, type = "submit" }) => {
  return (
    <button type={type} onClick={onClick} className="view-prop-btn" style={{ width: "358px",height:"56px" }}>
      {text}
    </button>
  );
};

export default AuthButton;
