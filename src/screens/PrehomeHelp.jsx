import {
  Typography,
  Container,
  Box,
  //   CircularProgress,
  Grid,
  Button,
  //   Slider
} from "@mui/material";
import ChatIcon from "../assets/Frame 645.png";
import ChevronIcon from "../assets/chevron_forward.png";
import "../assets/style.css";


const PrehomeHelp = () => {
  return (
    <>
    <Box 
    style={{
        zIndex: "9999",
        height:"20px"
      }}>

    </Box>
    <Container
      maxWidth="xl"
      style={{
        zIndex: "9999",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          marginLeft: "7px",
          border: "1px solid grey",
          position: "fixed",
          zIndex: 999,
          // display: "flex",

          marginTop: "5%",
          height: "100px",
          width: "100%",
          borderRadius: "24px",
          flexDirection: { xs: "column", md: "row" },
          // margin: "0px",
          fontFamily: "Poppins, sans-serif",
          backgroundColor: { xs: "#11202E", md: "white" },
          paddingX: { xs: 0 },
          paddingY: { xs: 0, md: 2 },
        }}
      >
        <Box
          sx={{
            padding: "15px",
            margin: "0px 15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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

      <Container sx={{ height: "150px" }}></Container>
      <Container
        maxWidth="lg"
        sx={{
          // display: "flex",

          border: "1px solid grey",
          position: "relative",
          height: "100vh",
          width: "100%",
          //   marginTop: "1%",
          flexDirection: { xs: "column", md: "row" },
          // margin: "0px",
          fontFamily: "Poppins, sans-serif",
          backgroundColor: { xs: "#11202E", md: "white" },
          paddingX: { xs: 0 },
          paddingY: { xs: 0, md: 0 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "300px",
            width: "70%",
            flexDirection: { xs: "column", md: "column" },
            margin: "0px",
            padding: "20px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <Button
            type="button"
            sx={{
              color: "rgb(117 117 117)",
              height: "72px",
              width: "300px",
              borderRadius: "12px",
              padding: "10px 20px",
              border: "1px solid #ccc",
              transition: "all 0.3s",
              margin: "5px",
              marginTop: "20px",
              cursor: "pointer",
              fontFamily: "Poppins",
              textAlign: "left",
            }}
          >
            Hello, How can i help?
          </Button>
          <Button
            type="button"
            sx={{
              color: "rgb(117 117 117)",
              height: "72px",
              width: "80%",
              borderRadius: "12px",
              padding: "10px 20px",
              border: "1px solid #ccc",
              transition: "all 0.3s",
              margin: "5px",
              marginTop: "20px",
              cursor: "pointer",
              fontFamily: "Poppins",
              textAlign: "left",
            }}
          >
            Welcome to LiveChat <br />I was made with. Pick a topic from the
            list or type down a question!
          </Button>
        </Box>
      </Container>
    </Container>
    </>

  );
};

export default PrehomeHelp;
