import { useState } from "react";

const RadiusSelector = ({ onRadiusChange }) => {
  const [radius, setRadius] = useState(1500);

  const handleChange = (e) => {
    setRadius(e.target.value);
  };

  const handleApply = () => {
    onRadiusChange(Number(radius));
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ marginRight: "8px" }}>Radius (in meters):</label>
      <input type="number" value={radius} onChange={handleChange} />
      <button onClick={handleApply}>Apply</button>
    </div>
  );
};

export default RadiusSelector;