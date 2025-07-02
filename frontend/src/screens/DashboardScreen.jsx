import { useState, useEffect } from "react";
import { Container, Box, Slider, Button, Typography } from "@mui/material";
import axios from "axios";

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
  const [responses, setResponses] = useState([]);
  const userId = localStorage.getItem("user_id");
  const userEmail = localStorage.getItem("user_email");

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const res = await axios.get(`http://35.154.52.56:5000/api/form/load-progress/${userId}`);
        const saved = res.data.responses || [];
        setResponses(saved);
        setCurrentQuestionId(saved.length + 1);
      } catch (err) {
        console.error("Failed to load form progress:", err);
      }
    };
    if (userId) loadProgress();
  }, [userId]);

  const handleNext = (answer = "") => {
    const q = questions.find(q => q.id === currentQuestionId);
    const resp = {
      questionId: q.id,
      question: q.subHeading,
      answer: typeof answer === "string" ? answer : String(answer),
    };

    const updated = [...responses, resp];
    setResponses(updated);
    const nextId = currentQuestionId + 1;
    setCurrentQuestionId(nextId);

    if (nextId > questions.length) {
      saveProgress(updated, true);
    }
  };

  const saveProgress = async (data = responses, final = false) => {
    try {
      await axios.post("http://35.154.52.56:5000/api/form/save-progress", {
        userId,
        responses: data,
      });
      if (!final) alert("Progress saved!");
    } catch (err) {
      console.error("Error saving form:", err);
      alert("Failed to save progress");
    }
  };

  const currentQuestion = questions.find(q => q.id === currentQuestionId);
  if (!currentQuestion) return <h2>Thank you for completing the form!</h2>;

  return (
    <Container maxWidth="xl" sx={{ background: { md: "#ECECEC", xs: "#fff" } }}>
      <Container className="heading-container">
        <Box className="fixed-card">
          {/* 👇 Greeting with email */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" color="primary">Hey {userId}</Typography>
            <h4 className="Heading">Start your home ownership journey</h4>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <p className="sub-heading">Personal Information</p>
            <p className="precent-text">
              {Math.round(((currentQuestionId - 1) / questions.length) * 100)}% Complete
            </p>
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
                "& .MuiSlider-thumb": {
                  backgroundColor: "#0086AD",
                  border: "2px solid white",
                  width: 25,
                  height: 25,
                  "&:hover, &:focus, &.Mui-active": { boxShadow: "none" }
                },
              }}
            />
          </Box>

          <Button
            onClick={() => saveProgress()}
            sx={{ mt: 2 }}
            variant="outlined"
            color="primary"
          >
            Save Progress
          </Button>
        </Box>
      </Container>

      <Box className="question-section" sx={{ mt: 4, zIndex: 0 }}>
        {currentQuestion.type === "slider" ? (
          <SliderCard
            id={currentQuestion.id}
            subHeading={currentQuestion.subHeading}
            handleNext={handleNext}
          />
        ) : currentQuestion.type === "input" ? (
          <InputCta
            id={currentQuestion.id}
            subHeading={currentQuestion.subHeading}
            handleNext={handleNext}
          />
        ) : (
          <CtaCards
            subHeading={currentQuestion.subHeading}
            options={currentQuestion.options}
            handleNext={(opt) => handleNext(opt)}
            text="Skip"
          />
        )}
      </Box>
    </Container>
  );
};

export default DashboardScreen;
