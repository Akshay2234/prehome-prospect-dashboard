import {
  Typography,
  Container,
  Box,
  //   CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import ChatIcon from "../assets/Frame 645.png";
import ChevronIcon from "../assets/chevron_forward.png";
import SendIcon from "../assets/send.png";
import "../assets/style.css";
import ChatbotCta from "../components/ChatbotCta";
import ChatbotOutlineCta from "../components/ChatbotOutlineCta";
import ChatbotLargeCta from "../components/chatbotLargeCta";

const PrehomeHelp = () => {
  return (
    <>
      <Container maxWidth="xl" className="chatbot-body">
        <Container maxWidth="xl" className="chatbot-parent">
            <Container maxWidth="lg" className="chat-container">
              <Container maxWidth="lg" className="chatbot-header">
                <Box className="chatbot-head">
                  <Grid>
                    <Box item xs={12} md={4} lg={4}>
                      <img src={ChatIcon} alt="" />
                    </Box>
                  </Grid>
                  <Grid>
                    <Box item xs={12} md={4} lg={4}>
                      <Typography
                        variant="h4"
                        display="block"
                        fontSize={20}
                        fontWeight="bold"
                        gutterBottom
                        sx={{ color: { sx: "white", md: "#454B58" } }}
                      >
                        Chatbot
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid>
                    <Box item xs={12} md={4} lg={4}>
                      <img src={ChevronIcon} alt="" />
                    </Box>
                  </Grid>
                </Box>
              </Container>
              <Box className="chat-card">
                <Grid
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <ChatbotCta text="Hello, How can i help?" />
                  <ChatbotCta
                    text="Welcome to LiveChat I was made with. Pick a topic from the
            list or type down a question!"
                  />
                </Grid>
                <Grid
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  sx={{
                    display: "flex",
                    alignItems: "self-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <ChatbotCta
                    text=" I have a query"
                    className="chatbot-cta color-cta"
                  />
                </Grid>

                <Grid
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <ChatbotCta text="Select one of the following:" />

                  <Box className="cta-container mt-3">
                    <ChatbotOutlineCta text="Balcony view"></ChatbotOutlineCta>
                    <ChatbotOutlineCta text="Option 1"></ChatbotOutlineCta>
                    <ChatbotOutlineCta text="Option 2"></ChatbotOutlineCta>
                    <ChatbotOutlineCta text="Option 3"></ChatbotOutlineCta>
                    <ChatbotOutlineCta text="Option 4"></ChatbotOutlineCta>
                    <ChatbotOutlineCta text="Option 5"></ChatbotOutlineCta>
                  </Box>
                </Grid>

                <Grid
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  sx={{
                    display: "flex",
                    alignItems: "self-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <ChatbotCta
                    text=" I have a query"
                    className="chatbot-cta color-cta"
                  />
                </Grid>

                <Grid
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <ChatbotCta text="Select one of the following:" />

                  <Box className="cta-container mt-3">
                    <ChatbotLargeCta text="Lorem, ipsum dolor sit amet consectetur voluptatibus."></ChatbotLargeCta>
                    <ChatbotLargeCta text="Lorem, ipsum dolor sit amet consectetur voluptatibus."></ChatbotLargeCta>
                  </Box>
                </Grid>

                <Grid
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                        marginBottom: "15%"
                  }}
                >
                  <Box className="cta-container application-cta-container">
                    <ChatbotLargeCta text="Lorem, ipsum dolor sit amet consectetur voluptatibus."></ChatbotLargeCta>
                    <ChatbotLargeCta text="Lorem, ipsum dolor sit amet consectetur voluptatibus."></ChatbotLargeCta>
                  </Box>
                </Grid>
              </Box>
              <Container maxWidth="lg" className="chatbot-footer">
                <Box className="footer" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
  <TextField
    fullWidth
    placeholder="Enter your query here"
    className="chatbot-input"
    variant="outlined"
    sx={{
      flex: 1,
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          border: "none",
        },
        "&:hover fieldset": {
          border: "none",
        },
        "&.Mui-focused fieldset": {
          border: "none",
        },
      },
    }}
  />

  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <img
      src={SendIcon}
      alt="Send"
      style={{ width: 32, height: 32, cursor: 'pointer' }}
    />
  </Box>
</Box>

              </Container>
            </Container>
        </Container>
      </Container>
    </>
  );
};

export default PrehomeHelp;
