import cardIcon from "../assets/Frame 89.png";
import cardIcon2 from "../assets/Frame 90.png";
import "../assets/style.css";

const BootstrapCarousel = ({ id, images }) => {
  return (
    <div id={id} className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <img
                src={image.url}
                className="d-block"
                alt={image.label || `Slide ${index + 1}`}
                style={{ objectFit: "cover", width: "100%" }}
              />
            </div>
          ))
        ) : (
          <div className="carousel-item active">
            <img
              src="https://via.placeholder.com/800x400.png?text=No+Image"
              className="d-block"
              alt="No Image Available"
              style={{ objectFit: "cover", width: "100%" }}
            />
          </div>
        )}
      </div>

      {images && images.length > 1 && (
        <>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#${id}`}
            data-bs-slide="prev"
          >
            <span className="">
              <img src={cardIcon} alt="Previous" />
            </span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#${id}`}
            data-bs-slide="next"
          >
            <span className="">
              <img src={cardIcon2} alt="Next" />
            </span>
          </button>
        </>
      )}
    </div>
  );
};

export default BootstrapCarousel;