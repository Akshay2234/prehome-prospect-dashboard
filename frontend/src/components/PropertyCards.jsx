import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";

const PropertyCards = ({
  Heading,
  propertyId,
  SubHeading,
  images = [],
  status,
  visitDate,
  description,
  tags = [],
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getStatusBadge = () => {
    if (status === "visited") {
      return (
        <Box
          sx={{
            position: "absolute",
            top: 24,
            left: 24,
            background: "#7BE495",
            color: "#222",
            fontWeight: "bold",
            px: 3,
            py: 1,
            borderRadius: "30px",
            fontSize: 22,
            zIndex: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          Property Visited
        </Box>
      );
    }

    if (status === "scheduled" && visitDate) {
      const formattedDate = new Date(visitDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      return (
        <Box
          sx={{
            position: "absolute",
            top: 24,
            left: 24,
            background: "#C7F6FE",
            color: "#222",
            fontWeight: "bold",
            px: 3,
            py: 1,
            borderRadius: "30px",
            fontSize: 22,
            zIndex: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          Visit Scheduled on {formattedDate}
        </Box>
      );
    }

    if (status === "shortlisted") {
      return (
        <Box
          sx={{
            position: "absolute",
            top: 24,
            left: 24,
            background: "#FFD580",
            color: "#222",
            fontWeight: "bold",
            px: 3,
            py: 1,
            borderRadius: "30px",
            fontSize: 22,
            zIndex: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          Shortlisted
        </Box>
      );
    }

    return null;
  };

  return (
    <Box
      sx={{
        display: "flex",
        overflow: "hidden",
        mb: 5,
        minHeight: 370,
        alignItems: "flex-start",
        boxShadow: "none",
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          position: "relative",
          width: 500,
          minWidth: 290,
          height: 350,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 0,
        }}
      >
        {getStatusBadge()}

        {images && images.length > 0 ? (
          <>
            <img
              src={images[currentImageIndex].url}
              alt={images[currentImageIndex].label || "Property"}
              style={{
                width: "90%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10%",
                display: "block",
              }}
            />
            {images.length > 1 && (
              <>
                <Box
                  onClick={prevImage}
                  sx={{
                    position: "absolute",
                    left: 30,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "#BDBDBD",
                    borderRadius: "50%",
                    width: 60,
                    height: 60,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    zIndex: 2,
                    "&:hover": { background: "#A9A9A9" },
                  }}
                >
                  <ChevronLeft color="#222" size={32} />
                </Box>
                <Box
                  onClick={nextImage}
                  sx={{
                    position: "absolute",
                    right: 30,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "#BDBDBD",
                    borderRadius: "50%",
                    width: 60,
                    height: 60,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    zIndex: 2,
                    "&:hover": { background: "#A9A9A9" },
                  }}
                >
                  <ChevronRight color="#222" size={32} />
                </Box>
              </>
            )}
          </>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#D9D9D9",
            }}
          >
            <ImageIcon size={64} color="#aaa" />
          </Box>
        )}
      </Box>

      {/* Content Section */}
      <Box
        sx={{
          flex: 1,
          px: { xs: 3, md: 5 },
          py: { xs: 3, md: 4 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        {/* Title */}
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: 700,
            fontSize: "26px",
            color: "#1A1A1A",
            lineHeight: 1.4,
            mb: 1.5,
            py: 1,        
          }}
        >
          {Heading}
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: 400,
            fontSize: "18px",
            color: "#4F4F4F",
            lineHeight: 1.5,
            mb: 1.5,
            py: 1,
          }}
        >
          {SubHeading}
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: 400,
            fontSize: "16px",
            color: "#333",
            lineHeight: 1.6,
            mb: 2.5,
            py: 1,
          }}
        >
          {description}
        </Typography>

        {/* Tags */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
          {tags.map((tag, idx) => (
            <Box
              key={idx}
              sx={{
                background: "#FFE7B2",
                color: "#000",
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: "15px",
                borderRadius: "20px",
                px: 3,
                py: 1,
              }}
            >
              {tag}
            </Box>
          ))}
        </Box>

        {/* View Property Button */}
        <Link to={`/property/${propertyId}`} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              background: "#008CBA",
              color: "#fff",
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: "16px",
              textTransform: "none",
              borderRadius: "24px",
              px: 4,
              py: 1.25,
              mt: 10,
              width: 280,
              height: 50,
              boxShadow: "none",
              "&:hover": {
                background: "#0077A3",
              },
            }}
          >
            View Property
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default PropertyCards;