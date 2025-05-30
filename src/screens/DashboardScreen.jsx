import React, { useState, useEffect } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom"; // Import useLocation and Navigate
import {
  Typography,
  Container,
  Box,
  CircularProgress,
  Grid,
  TextField,
  Button,
  Slider
} from "@mui/material";
import logo from "../assets/logo.png";
import CustomTextField from "../components/CustomTextField";
import CustomButton from "../components/CustomButton";
import zIndex from "@mui/material/styles/zIndex";

const DashboardScreen = () => {
  console.log("1oyee");
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  useEffect(() => {
    const authToken = getCookie("authToken");
    const userId = getCookie("user_id");
    console.log(authToken);
    console.log(userId);

    if (authToken && userId) {
      // Save to localStorage
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("user_id", userId);

      console.log("Stored data from cookies into localStorage:", {
        authToken,
        userId,
      });
    }
  }, []);

  const [selectedButton, setSelectedButton] = useState(""); // State to track the selected location

  const handleLocationSelection = (value) => {
    setSelectedButton(value); // Update the selected location
  };

  return (
    <>
    <Container 
    maxWidth="xl"
    backgroundColor="#eaebed"
    >


    
      <Container
        
        sx={{
          position: "fixed",
    zIndex: 999,
          // display: "flex",
          marginTop:"2%",
          height: "150px",
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
            // display: "flex",
            height: "200px",
            width: "100%",

            flexDirection: { xs: "column", md: "row" },
            margin: "0px",
            padding: "20px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            display="block"
            fontSize={24}
            gutterBottom
            sx={{ color: { sx: "white", md: "black" } }}
          >
            Start your home ownership journey
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography
              variant="body1"
              fontSize={16}
              sx={{ color: { sx: "white", md: "black" } }}
            >
              Personal Information
            </Typography>
            <Typography
              variant="body1"
              fontSize={16}
              sx={{ color: { sx: "white", md: "black" } }}
            >
              25% Complete
            </Typography>
          </Box>
          <Box display="flex">
            <Slider
          trackColor="#"
          thumbColor="#"
          railColor="#"
          valueLabelColor="#"
            // value={house_cost}
            // onChange={handleCostOfHouseChange}
            // onChangeCommitted={handleSliderChangeCommitted(handleRentApi)}
            min={0}
            max={100}
            // step={0.25}
            valueLabelDisplay="off"
            valueLabelFormat={(value) => `${value} `}
           
            sx={{
              "& .MuiSlider-track": {
                backgroundColor: "#0086AD",
                height: 20, // Adjust track thickness
                border: "none",
                
              },
              "& .MuiSlider-rail": {
                backgroundColor: "#DEDEDE",
                height: 20, // Adjust rail thickness
                
              },
              "& .MuiSlider-thumb": {
                
                backgroundColor: "#0086AD",
                border: "2px solid white",
                width: 25, // Adjust thumb size (width)
                height: 25, // Adjust thumb size (height)
                "&:hover, &:focus, &.Mui-active": {
                  boxShadow: "none", // Remove the expanded color effect
                },
              },
              "& .MuiSlider-valueLabel": {
                backgroundColor: "#DCF7FF",
                color: "black",
                fontWeight: "bold",
                top: "-2px",
                borderRadius: "20px",
                padding: "8px",
                paddingX: "16px",
                "&:before": {
                  display: "none",
                },
                "& *": {
                  transform: "none",
                },
              },
            }}
          />
         
            </Box>
        </Box>
         
      </Container>

<Container  sx={{ height:"150px"}}>

</Container>
      <Container
        maxWidth="lg"
        sx={{
          // display: "flex",
          position:"relative",
          height: "240px",
          width: "80%",
          marginTop: "5%",
          borderRadius: "12px",
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
            // display: "flex",
            height: "300px",
            width: "100%",

            flexDirection: { xs: "column", md: "row" },
            margin: "0px",
            padding: "20px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <Typography
            variant="h4"
            display="block"
            fontSize={20}
            gutterBottom
            sx={{ color: { sx: "white", md: "black" } }}
          >
            What inspired you to start looking for a new home?
          </Typography>
          <Grid item xs={12} md={6} lg={6}>
            <Box display="flex" justifyContent="space-between">
              <Button
                type="button"
                className="btn-group location-btn"
                data-value="Golf Course Road"
                
                onClick={() => handleLocationSelection("Option1")}
                style={{
                  color:"#000",
                  height:"72px",
                   width:"50%",
                   borderRadius: "12px",
                  padding: "10px 20px",
                  border:
                    selectedButton === "Option1"
                      ? "2px solid rgb(239, 156, 0)"
                      : "1px solid #ccc",
                  transition: "all 0.3s",
                  margin: "5px",
                  cursor: "pointer",
                }}
              >
                Option 1
              </Button>
              <Button
                type="button"
                className="btn-group location-btn"
                data-value="Golf Course Road"
                onClick={() => handleLocationSelection("Option2")}
                style={{
                  color:"#000",
                  padding: "10px 20px",
                  border:
                    selectedButton === "Option2"
                      ? "2px solid rgb(239, 156, 0)"
                      : "1px solid #ccc",
                  transition: "all 0.3s",
                  margin: "5px",
                  cursor: "pointer",
                  width:"50%",
                   height:"72px",
                   borderRadius: "12px",
                }}
              >
                Option 2
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box display="flex" justifyContent="space-between">
              <Button
                type="button"
                className="btn-group location-btn"
                data-value="Golf Course Road"
                onClick={() => handleLocationSelection("Option3")}
                style={{
                  color:"#000",
                  padding: "10px 20px",
                  border:
                    selectedButton === "Option3"
                      ? "2px solid rgb(239, 156, 0)"
                      : "1px solid #ccc",
                  transition: "all 0.3s",
                  margin: "5px",
                  cursor: "pointer",
                 width:"50%",
                  height:"72px",
                   borderRadius: "12px",
                }}
              >
                Option 3
              </Button>
              <Button
                type="button"
                className="btn-group location-btn"
                data-value="Golf Course Road"
                onClick={() => handleLocationSelection("Option4")}
                style={{
                  color:"#000",
                  padding: "10px 20px",
                  border:
                    selectedButton === "Option4"
                      ? "2px solid rgb(239, 156, 0)"
                      : "1px solid #ccc",
                  transition: "all 0.3s",
                  margin: "5px",
                  cursor: "pointer",
                 width:"50%",
                  height:"72px",
                   borderRadius: "12px",
                }}
              >
                Option 4
              </Button>
            </Box>
          </Grid>
        </Box>
      </Container>


      <Container
        maxWidth="lg"
        sx={{
          // display: "flex",
          height: "200px",
          width: "80%",
          marginTop: "2%",
          borderRadius: "12px",
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
            // display: "flex",
            height: "300px",
            width: "100%",

            flexDirection: { xs: "column", md: "row" },
            margin: "0px",
            padding: "20px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <Typography
            variant="h4"
            display="block"
            fontSize={20}
            gutterBottom
            sx={{ color: { sx: "white", md: "black" } }}
          >
            What inspired you to start looking for a new home?
          </Typography>
          <Grid item xs={12} md={12} lg={12}>
            <Box display="flex">
              {/* <Button
                type="button"
                className="btn-group location-btn"
                data-value="Golf Course Road"
                
                onClick={() => handleLocationSelection("Option1")}
                style={{
                  color:"#000",
                   width:"100%",
                   borderRadius: "12px",
                  padding: "10px 20px",
                  border:
                    selectedButton === "Option1"
                      ? "2px solid rgb(239, 156, 0)"
                      : "1px solid #ccc",
                  transition: "all 0.3s",
                  margin: "5px",
                  cursor: "pointer",
                }}
              >
                Option 1
              </Button> */}
               <TextField
                // variant="outlined"
                fullWidth
              
                value={""}
                sx={{ mb: "16px",    borderRadius: "15px",
                  border: "1px solid grey"
                }}
              >
            
              </TextField>
         
            </Box>
          </Grid>
         
        </Box>
      </Container>


      <Container
        maxWidth="lg"
        sx={{
          // display: "flex",
          height: "200px",
          width: "80%",
          marginTop: "2%",
          borderRadius: "12px",
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
            // display: "flex",
            height: "300px",
            width: "100%",

            flexDirection: { xs: "column", md: "row" },
            margin: "0px",
            padding: "20px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <Typography
            variant="h4"
            display="block"
            fontSize={20}
            gutterBottom
            sx={{ color: { sx: "white", md: "black" } }}
          >
            What inspired you to start looking for a new home?
          </Typography>
          <Grid item xs={12} md={12} lg={12}>
            <Box display="flex">
            <Slider
          trackColor="#"
          thumbColor="#"
          railColor="#"
          valueLabelColor="#"
            // value={house_cost}
            // onChange={handleCostOfHouseChange}
            // onChangeCommitted={handleSliderChangeCommitted(handleRentApi)}
            min={0}
            max={100}
            // step={0.25}
            valueLabelDisplay="on"
            valueLabelFormat={(value) => `${value} `}
            style={{                marginTop:"3%",
}}
            sx={{
              "& .MuiSlider-track": {
                backgroundColor: "rgb(239, 156, 0)",
                height: 20, // Adjust track thickness
                border: "none",
                
              },
              "& .MuiSlider-rail": {
                backgroundColor: "#DEDEDE",
                height: 20, // Adjust rail thickness
                
              },
              "& .MuiSlider-thumb": {
                
                backgroundColor: "rgb(239, 156, 0)",
                border: "2px solid white",
                width: 25, // Adjust thumb size (width)
                height: 25, // Adjust thumb size (height)
                "&:hover, &:focus, &.Mui-active": {
                  boxShadow: "none", // Remove the expanded color effect
                },
              },
              "& .MuiSlider-valueLabel": {
                backgroundColor: "#DCF7FF",
                color: "black",
                fontWeight: "bold",
                top: "-2px",
                borderRadius: "20px",
                padding: "8px",
                paddingX: "16px",
                "&:before": {
                  display: "none",
                },
                "& *": {
                  transform: "none",
                },
              },
            }}
          />
         
            </Box>
             <Grid item xs={12} md={6} lg={6}>
            <Box display="flex" justifyContent="space-between">
             <Typography
            variant="h4"
            display="block"
            fontSize={20}
            gutterBottom
            sx={{ color: { sx: "white", md: "black" } }}
          >
           XXXX
          </Typography>
           <Typography
            variant="h4"
            display="block"
            fontSize={20}
            gutterBottom
            sx={{ color: { sx: "white", md: "black" } }}
          >
            XXXX
          </Typography>
            </Box>
          </Grid>
          </Grid>
         
        </Box>
      </Container>

   <Container
        maxWidth="lg"
        sx={{
          // display: "flex",
          height: "320px",
          width: "80%",
          marginTop: "2%",
          borderRadius: "12px",
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
            // display: "flex",
            height: "250px",
            width: "100%",

            flexDirection: { xs: "column", md: "row" },
            margin: "0px",
            padding: "20px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <Typography
            variant="h4"
            display="block"
            fontSize={20}
            gutterBottom
            sx={{ color: { sx: "white", md: "black" } }}
          >
            What inspired you to start looking for a new home?
          </Typography>
          <Grid item xs={12} md={6} lg={6}>
            <Box display="flex" justifyContent="space-between">
              <Button
                type="button"
                className="btn-group location-btn"
                data-value="Golf Course Road"
                
                onClick={() => handleLocationSelection("Option1")}
                style={{
                  color:"#000",
                   width:"50%",
                    height:"72px",
                   borderRadius: "12px",
                  padding: "10px 20px",
                  border:
                    selectedButton === "Option1"
                      ? "2px solid rgb(239, 156, 0)"
                      : "1px solid #ccc",
                  transition: "all 0.3s",
                  margin: "5px",
                  cursor: "pointer",
                }}
              >
                Option 1
              </Button>
              <Button
                type="button"
                className="btn-group location-btn"
                data-value="Golf Course Road"
                onClick={() => handleLocationSelection("Option2")}
                style={{
                  color:"#000",
                  padding: "10px 20px",
                  border:
                    selectedButton === "Option2"
                      ? "2px solid rgb(239, 156, 0)"
                      : "1px solid #ccc",
                  transition: "all 0.3s",
                  margin: "5px",
                  cursor: "pointer",
                  width:"50%",
                   height:"72px",
                   borderRadius: "12px",
                }}
              >
                Option 2
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box display="flex" justifyContent="space-between">
              <Button
                type="button"
                className="btn-group location-btn"
                data-value="Golf Course Road"
                onClick={() => handleLocationSelection("Option3")}
                style={{
                  color:"#000",
                  padding: "10px 20px",
                  border:
                    selectedButton === "Option3"
                      ? "2px solid rgb(239, 156, 0)"
                      : "1px solid #ccc",
                  transition: "all 0.3s",
                  margin: "5px",
                  cursor: "pointer",
                 width:"50%",
                  height:"72px",
                   borderRadius: "12px",
                }}
              >
                Option 3
              </Button>
              <Button
                type="button"
                className="btn-group location-btn"
                data-value="Golf Course Road"
                onClick={() => handleLocationSelection("Option4")}
                style={{
                  color:"#000",
                  padding: "10px 20px",
                  border:
                    selectedButton === "Option4"
                      ? "2px solid rgb(239, 156, 0)"
                      : "1px solid #ccc",
                  transition: "all 0.3s",
                  margin: "5px",
                  cursor: "pointer",
                 width:"50%",
                  height:"72px",
                   borderRadius: "12px",
                }}
              >
                Option 4
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box display="flex" justifyContent="space-between">
              <Button
                type="button"
                className="btn-group location-btn"
                data-value="Golf Course Road"
                onClick={() => handleLocationSelection("Option5")}
                style={{
                  color:"#000",
                  padding: "10px 20px",
                  border:
                    selectedButton === "Option3"
                      ? "2px solid rgb(239, 156, 0)"
                      : "1px solid #ccc",
                  transition: "all 0.3s",
                  margin: "5px",
                  cursor: "pointer",
                 width:"50%",
                  height:"72px",
                   borderRadius: "12px",
                }}
              >
                Option 5
              </Button>
             
            </Box>
          </Grid>
        </Box>
      </Container>

   <Container
        maxWidth="lg"
        sx={{
          // display: "flex",
          height: "250px",
          width: "80%",
          marginTop: "2%",
          borderRadius: "12px",
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
            // display: "flex",
            height: "250px",
            width: "100%",

            flexDirection: { xs: "column", md: "row" },
            margin: "0px",
            padding: "20px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <Typography
            variant="h4"
            display="block"
            fontSize={20}
            gutterBottom
            sx={{ color: { sx: "white", md: "black" } }}
          >
            What inspired you to start looking for a new home?
          </Typography>
          <Grid item xs={12} md={6} lg={6}>
            <Box display="flex" justifyContent="space-between">
              <Button
                type="button"
                className="btn-group location-btn"
                data-value="Golf Course Road"
                
                onClick={() => handleLocationSelection("Option1")}
                style={{
                  color:"#000",
                   width:"50%",
                    height:"72px",
                   borderRadius: "12px",
                  padding: "10px 20px",
                  border:
                    selectedButton === "Option1"
                      ? "2px solid rgb(239, 156, 0)"
                      : "1px solid #ccc",
                  transition: "all 0.3s",
                  margin: "5px",
                  cursor: "pointer",
                }}
              >
                Option 1
              </Button>
              <Button
                type="button"
                className="btn-group location-btn"
                data-value="Golf Course Road"
                onClick={() => handleLocationSelection("Option2")}
                style={{
                  color:"#000",
                  padding: "10px 20px",
                  border:
                    selectedButton === "Option2"
                      ? "2px solid rgb(239, 156, 0)"
                      : "1px solid #ccc",
                  transition: "all 0.3s",
                  margin: "5px",
                  cursor: "pointer",
                  width:"50%",
                   height:"72px",
                   borderRadius: "12px",
                }}
              >
                Option 2
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box display="flex" justifyContent="space-between">
              <Button
                type="button"
                className="btn-group location-btn"
                data-value="Golf Course Road"
                onClick={() => handleLocationSelection("Option3")}
                style={{
                  color:"#000",
                  padding: "10px 20px",
                  border:
                    selectedButton === "Option3"
                      ? "2px solid rgb(239, 156, 0)"
                      : "1px solid #ccc",
                  transition: "all 0.3s",
                  margin: "5px",
                  cursor: "pointer",
                 width:"50%",
                  height:"72px",
                   borderRadius: "12px",
                }}
              >
                Option 3
              </Button>
             
            </Box>
          </Grid>
         
        </Box>
      </Container>



   <Container
        maxWidth="lg"
        sx={{
          // display: "flex",
          height: "350px",
          width: "80%",
          marginTop: "2%",
          borderRadius: "12px",
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
            // display: "flex",
            height: "320px",
            width: "100%",

            flexDirection: { xs: "column", md: "row" },
            margin: "0px",
            padding: "20px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <Typography
            variant="h4"
            display="block"
            fontSize={20}
            gutterBottom
            sx={{ color: { sx: "white", md: "black" } }}
          >
            What inspired you to start looking for a new home?
          </Typography>
          <Grid item xs={12} md={6} lg={6}>
            <Box display="flex" justifyContent="space-between">
              <Button
                type="button"
                className="btn-group location-btn"
                data-value="Golf Course Road"
                
                onClick={() => handleLocationSelection("Option1")}
                style={{
                  color:"#000",
                   width:"50%",
                    height:"72px",
                   borderRadius: "12px",
                  padding: "10px 20px",
                  border:
                    selectedButton === "Option1"
                      ? "2px solid rgb(239, 156, 0)"
                      : "1px solid #ccc",
                  transition: "all 0.3s",
                  margin: "5px",
                  cursor: "pointer",
                }}
              >
                Option 1
              </Button>
              <Button
                type="button"
                className="btn-group location-btn"
                data-value="Golf Course Road"
                onClick={() => handleLocationSelection("Option2")}
                style={{
                  color:"#000",
                  padding: "10px 20px",
                  border:
                    selectedButton === "Option2"
                      ? "2px solid rgb(239, 156, 0)"
                      : "1px solid #ccc",
                  transition: "all 0.3s",
                  margin: "5px",
                  cursor: "pointer",
                  width:"50%",
                   height:"72px",
                   borderRadius: "12px",
                }}
              >
                Option 2
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box display="flex" justifyContent="space-between">
              <Button
                type="button"
                className="btn-group location-btn"
                data-value="Golf Course Road"
                onClick={() => handleLocationSelection("Option3")}
                style={{
                  color:"#000",
                  padding: "10px 20px",
                  border:
                    selectedButton === "Option3"
                      ? "2px solid rgb(239, 156, 0)"
                      : "1px solid #ccc",
                  transition: "all 0.3s",
                  margin: "5px",
                  cursor: "pointer",
                 width:"50%",
                  height:"72px",
                   borderRadius: "12px",
                }}
              >
                Option 3
              </Button>
             
            </Box>
          </Grid>
         
         <Grid
         item xs={12} md={6} lg={6}
          sx={{
            // display: "flex",
            height: "350px",
            width: "100%",

            flexDirection: { xs: "column", md: "row" },
            margin: "2% 0%",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <Typography
            variant="h4"
            display="block"
            fontSize={20}
            gutterBottom
            sx={{ color: { sx: "white", md: "black" } }}
          >
            What inspired you to start looking for a new home?
          </Typography>
          <Grid item xs={12} md={12} lg={12}>
             
               <TextField
                // variant="outlined"
                fullWidth
              
                value={""}
                sx={{ mb: "16px",    borderRadius: "15px",
                  border: "1px solid grey" }}
              >
            
              </TextField>
         
          </Grid>
         
        </Grid>
        </Box>
      </Container>

   <Container
        maxWidth="lg"
        sx={{
          // display: "flex",
          height: "350px",
          width: "80%",
          marginTop: "2%",
          borderRadius: "12px",
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
            // display: "flex",
            height: "300px",
            width: "100%",

            flexDirection: { xs: "column", md: "row" },
            margin: "0px",
            padding: "20px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <Typography
            variant="h4"
            display="block"
            fontSize={20}
            gutterBottom
            sx={{ color: { sx: "white", md: "black" } }}
          >
            What inspired you to start looking for a new home?
          </Typography>
          <Grid item xs={12} md={6} lg={6}>
            <Box display="flex" justifyContent="space-between">
              <Button
                type="button"
                className="btn-group location-btn"
                data-value="Golf Course Road"
                
                onClick={() => handleLocationSelection("Option1")}
                style={{
                  color:"#000",
                   width:"50%",
                    height:"72px",
                   borderRadius: "12px",
                  padding: "10px 20px",
                  border:
                    selectedButton === "Option1"
                      ? "2px solid rgb(239, 156, 0)"
                      : "1px solid #ccc",
                  transition: "all 0.3s",
                  margin: "5px",
                  cursor: "pointer",
                }}
              >
                Option 1
              </Button>
              <Button
                type="button"
                className="btn-group location-btn"
                data-value="Golf Course Road"
                onClick={() => handleLocationSelection("Option2")}
                style={{
                  color:"#000",
                  padding: "10px 20px",
                  border:
                    selectedButton === "Option2"
                      ? "2px solid rgb(239, 156, 0)"
                      : "1px solid #ccc",
                  transition: "all 0.3s",
                  margin: "5px",
                  cursor: "pointer",
                  width:"50%",
                   height:"72px",
                   borderRadius: "12px",
                }}
              >
                Option 2
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box display="flex" justifyContent="space-between">
              <Button
                type="button"
                className="btn-group location-btn"
                data-value="Golf Course Road"
                onClick={() => handleLocationSelection("Option3")}
                style={{
                  color:"#000",
                  padding: "10px 20px",
                  border:
                    selectedButton === "Option3"
                      ? "2px solid rgb(239, 156, 0)"
                      : "1px solid #ccc",
                  transition: "all 0.3s",
                  margin: "5px",
                  cursor: "pointer",
                 width:"50%",
                  height:"72px",
                   borderRadius: "12px",
                }}
              >
                Option 3
              </Button>
              <Button
                type="button"
                className="btn-group location-btn"
                data-value="Golf Course Road"
                onClick={() => handleLocationSelection("Option4")}
                style={{
                  color:"#000",
                  padding: "10px 20px",
                  border:
                    selectedButton === "Option3"
                      ? "2px solid rgb(239, 156, 0)"
                      : "1px solid #ccc",
                  transition: "all 0.3s",
                  margin: "5px",
                  cursor: "pointer",
                 width:"50%",
                  height:"72px",
                   borderRadius: "12px",
                }}
              >
                Option 4
              </Button>
             
            </Box>
          </Grid>
         
         <Box
          sx={{
            // display: "flex",
            height: "350px",
            width: "100%",

            flexDirection: { xs: "column", md: "row" },
            margin: "2% 0%",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <Typography
            variant="h4"
            display="block"
            fontSize={20}
            gutterBottom
            sx={{ color: { sx: "white", md: "black" } }}
          >
            What inspired you to start looking for a new home?
          </Typography>
          <Grid item xs={12} md={12} lg={12}>
             
               <TextField
                // variant="outlined"
                fullWidth
              
                value={""}
                sx={{ mb: "16px",    borderRadius: "15px",
                  border: "1px solid grey" }}
              >
            
              </TextField>
         
          </Grid>
         
        </Box>
        </Box>
      </Container>
      
   <Container
        maxWidth="lg"
        sx={{
          // display: "flex",
          height: "350px",
          width: "80%",
          marginTop: "2%",
          borderRadius: "12px",
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
            // display: "flex",
            height: "300px",
            width: "100%",

            flexDirection: { xs: "column", md: "row" },
            margin: "0px",
            padding: "20px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <Typography
            variant="h4"
            display="block"
            fontSize={20}
            gutterBottom
            sx={{ color: { sx: "white", md: "black" } }}
          >
            What inspired you to start looking for a new home?
          </Typography>
          <Grid item xs={12} md={6} lg={6}>
            <Box display="flex" justifyContent="space-between">
              <Button
                type="button"
                className="btn-group location-btn"
                data-value="Golf Course Road"
                
                onClick={() => handleLocationSelection("Option1")}
                style={{
                  color:"#000",
                   width:"50%",
                    height:"72px",
                   borderRadius: "12px",
                  padding: "10px 20px",
                  border:
                    selectedButton === "Option1"
                      ? "2px solid rgb(239, 156, 0)"
                      : "1px solid #ccc",
                  transition: "all 0.3s",
                  margin: "5px",
                  cursor: "pointer",
                }}
              >
                Option 1
              </Button>
              <Button
                type="button"
                className="btn-group location-btn"
                data-value="Golf Course Road"
                onClick={() => handleLocationSelection("Option2")}
                style={{
                  color:"#000",
                  padding: "10px 20px",
                  border:
                    selectedButton === "Option2"
                      ? "2px solid rgb(239, 156, 0)"
                      : "1px solid #ccc",
                  transition: "all 0.3s",
                  margin: "5px",
                  cursor: "pointer",
                  width:"50%",
                   height:"72px",
                   borderRadius: "12px",
                }}
              >
                Option 2
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box display="flex" justifyContent="space-between">
              <Button
                type="button"
                className="btn-group location-btn"
                data-value="Golf Course Road"
                onClick={() => handleLocationSelection("Option3")}
                style={{
                  color:"#000",
                  padding: "10px 20px",
                  border:
                    selectedButton === "Option3"
                      ? "2px solid rgb(239, 156, 0)"
                      : "1px solid #ccc",
                  transition: "all 0.3s",
                  margin: "5px",
                  cursor: "pointer",
                 width:"50%",
                  height:"72px",
                   borderRadius: "12px",
                }}
              >
                Option 3
              </Button>
              <Button
                type="button"
                className="btn-group location-btn"
                data-value="Golf Course Road"
                onClick={() => handleLocationSelection("Option4")}
                style={{
                  color:"#000",
                  padding: "10px 20px",
                  border:
                    selectedButton === "Option3"
                      ? "2px solid rgb(239, 156, 0)"
                      : "1px solid #ccc",
                  transition: "all 0.3s",
                  margin: "5px",
                  cursor: "pointer",
                 width:"50%",
                  height:"72px",
                   borderRadius: "12px",
                }}
              >
                Option 4
              </Button>
             
            </Box>
          </Grid>
         
         <Box
          sx={{
            // display: "flex",
            height: "350px",
            width: "100%",

            flexDirection: { xs: "column", md: "row" },
            margin: "2% 0%",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <Typography
            variant="h4"
            display="block"
            fontSize={20}
            gutterBottom
            sx={{ color: { sx: "white", md: "black" } }}
          >
            What inspired you to start looking for a new home?
          </Typography>
          <Grid item xs={12} md={12} lg={12}>
             
               <TextField
                // variant="outlined"
                fullWidth
              
                value={""}
                sx={{ mb: "16px",    borderRadius: "15px",
                  border: "1px solid grey" }}
              >
            
              </TextField>
         
          </Grid>
         
        </Box>
        </Box>
      </Container>
      
      </Container>
    </>
  );
};

export default DashboardScreen;
