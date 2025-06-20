import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Box, Slider } from "@mui/material";

import "../assets/style.css";
import CtaCards from "../components/CtaCards";
import SliderCard from "../components/SliderCard";
import InputCta from "../components/InputCta";

const questions = [
  { id: 1, subHeading: "What inspired you to start looking for a new home?", options: ["Investment", "Family Expansion", "Job Relocation", "Better Amenities"] },
  { id: 2, subHeading: "What type of home are you looking for?", options: ["Apartment", "Villa", "Independent House", "Plot"] },
  { id: 3, subHeading: "What is your budget range?", type: "slider" },
  { id: 4, subHeading: "Do you prefer a furnished or unfurnished home?", options: ["Furnished", "Unfurnished", "Semi-Furnished", "No Preference"] },
  { id: 5, subHeading: "How soon are you planning to move?", options: ["Immediately", "Within 3 months", "3-6 months", "More than 6 months"] },
  { id: 6, subHeading: "Enter your Name", type: "input" },
  { id: 7, subHeading: "Enter your Email", type: "input" },
];

const DashboardScreen = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState(1);

  const userId = localStorage.getItem("user_id");

  // Fetch previous progress
  useEffect(() => {
    const fetchFormProgress = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/session/get-session/${userId}`);
        if (response.data && response.data.formData && response.data.formData.step) {
          setCurrentQuestionId(response.data.formData.step);
        }
      } catch (error) {
        console.error("Error fetching form session:", error);
      }
    };

    if (userId) {
      fetchFormProgress();
    }
  }, [userId]);

  const handleNext = async () => {
    const nextStep = currentQuestionId + 1;

    setCurrentQuestionId(nextStep);

    try {
      await axios.post("http://localhost:5000/api/session/save-form", {
        userId,
        formData: { step: nextStep },
      });
    } catch (error) {
      console.error("Error saving form progress:", error);
    }
  };

  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  if (!currentQuestion) return <h2>No more questions</h2>;

  return (
    <Container maxWidth="xl" sx={{ background: { md: "#ECECEC", xs: "#fff" } }}>
      <Container className="heading-container">
        <Box className="fixed-card">
          <h4 className="Heading">Start your home ownership journey</h4>
          <Box display="flex" justifyContent="space-between">
            <p className="sub-heading">Personal Information</p>
            <p className="precent-text">{Math.round(((currentQuestionId - 1) / questions.length) * 100)}% Complete</p>
          </Box>
          <Box display="flex">
            <Slider
              min={0}
              max={100}
              value={Math.round(((currentQuestionId - 1) / questions.length) * 100)}
              valueLabelDisplay="off"
              sx={{
                "& .MuiSlider-track": { backgroundColor: "#0086AD", height: 20, border: "none" },
                "& .MuiSlider-rail": { backgroundColor: "#DEDEDE", height: 20 },
                "& .MuiSlider-thumb": { backgroundColor: "#0086AD", border: "2px solid white", width: 25, height: 25, "&:hover, &:focus, &.Mui-active": { boxShadow: "none" } },
              }}
            />
          </Box>
        </Box>
      </Container>

      <Box className="question-section" sx={{ mt: 4, zIndex: 0 }}>
        {currentQuestion.type === "slider" ? (
          <SliderCard id={currentQuestion.id} handleNext={handleNext} subHeading={currentQuestion.subHeading} />
        ) : currentQuestion.type === "input" ? (
          <InputCta id={currentQuestion.id} handleNext={handleNext} subHeading={currentQuestion.subHeading} subHeading2={currentQuestion.subHeading} />
        ) : (
          <CtaCards subHeading={currentQuestion.subHeading} options={currentQuestion.options} handleNext={handleNext} text="Skip" />
        )}
      </Box>
    </Container>
  );
};

export default DashboardScreen;
