// src/components/Auth/AuthButton.jsx
const AuthButton = ({ text, onClick, type = "submit" }) => {
  return (
    <button type={type} onClick={onClick} className="auth-button">
      {text}
    </button>
  );
};

export default AuthButton;
