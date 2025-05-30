import React from 'react';
import cardImage from "../assets/placeholderImage.png"
import cardIcon from "../assets/Frame 89.png"
import cardIcon2 from "../assets/Frame 90.png"

const BootstrapCarousel = ({ id = {}, images = [] }) => {
  return (
    <div id={id} className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={cardImage} className="d-block" alt="Slide 1"  style={{objectFit:"cover",width:"100%"}}/>
        </div>
        <div className="carousel-item">
          <img src={cardImage} className="d-block" alt="Slide 2" style={{objectFit:"cover",width:"100%"}}/>
        </div>
        <div className="carousel-item">
          <img src={cardImage} className="d-block" alt="Slide 3" style={{objectFit:"cover",width:"100%"}}/>
        </div>
      </div>
      <button className="carousel-control-prev" type="button"  data-bs-target={`#${id}`} data-bs-slide="prev">
        <span className=""><img src={cardIcon} alt="" /></span>
      </button>
      <button className="carousel-control-next" type="button"  data-bs-target={`#${id}`} data-bs-slide="next">
        <span className=""><img src={cardIcon2} alt="" /></span>
      </button>
    </div>
  );
};

export default BootstrapCarousel;


