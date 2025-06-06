import {
  Typography,
  Container,
  Box,
  //   CircularProgress,
  Grid,
  //   Slider
} from "@mui/material";
import ChatIcon from "../assets/Frame 645.png";
import ChevronIcon from "../assets/chevron_forward.png";
import "../assets/style.css";
import ChatbotCta from "../components/ChatbotCta";
import OutlineCta from "../components/OutlineCta";
import ApplicationCta from "../components/ApplicationCta";

const PrehomeHelp = () => {
  return (
    <>
      <Container maxWidth="xl" className="chatbot-body">
          <Container sx={{ height: "120px" ,width:"100%",background: "#ECECEC",
    position: "fixed",
    zIndex: "99"}}></Container>
        <Container maxWidth="xl" className="chatbot-card">
        
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

        

          <Container maxWidth="lg" className="chat-container">
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
                  <OutlineCta
                    text="Balcony view"
                    className="chatbot-outline-cta "
                  ></OutlineCta>
                  <OutlineCta
                    text="Option 1"
                    className="chatbot-outline-cta"
                  ></OutlineCta>
                  <OutlineCta
                    text="Option 2"
                    className="chatbot-outline-cta"
                  ></OutlineCta>
                  <OutlineCta
                    text="Option 3"
                    className="chatbot-outline-cta"
                  ></OutlineCta>
                  <OutlineCta
                    text="Option 4"
                    className="chatbot-outline-cta"
                  ></OutlineCta>
                  <OutlineCta
                    text="Option 5"
                    className="chatbot-outline-cta"
                  ></OutlineCta>
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
                  <ApplicationCta
                    text="Lorem, ipsum dolor sit amet consectetur voluptatibus."
                    className="chatbot-application-btn"
                  ></ApplicationCta>
                  <ApplicationCta
                    text="Lorem, ipsum dolor sit amet consectetur voluptatibus."
                    className="chatbot-application-btn"
                  ></ApplicationCta>
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
                }}
              >
                <Box className="cta-container">
                  <ApplicationCta
                    text="Lorem, ipsum dolor sit amet consectetur voluptatibus."
                    className="chatbot-application-btn"
                  ></ApplicationCta>
                  <ApplicationCta
                    text="Lorem, ipsum dolor sit amet consectetur voluptatibus."
                    className="chatbot-application-btn"
                  ></ApplicationCta>
                </Box>
              </Grid>
            </Box>
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default PrehomeHelp;
