// src/components/Auth/AuthInput.jsx
const AuthInput = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="auth-input"
    />
  );
};

export default AuthInput;
