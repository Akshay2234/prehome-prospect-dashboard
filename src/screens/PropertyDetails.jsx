import { Box, Typography, Container } from "@mui/material";
import ViewPropButton from "../components/ViewPropButton";
import OutlineCta from "../components/OutlineCta";
import cardImage from "../assets/Frame 86.png";
import BootstrapCarousel from "../components/BootstrapCarousel";
import LeftArrow from "../assets/Component 13.png";

const PropertyDetails = () => {
  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* Top Navigation */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          margin: "50px 0 0 0px",
        }}
      >
        <img src={LeftArrow} alt="" />
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ display: { xs: "none", md: "block" } }}
        >
          Property Details
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          display="block"
          fontWeight="bold"
          // fontSize={24}
          gutterBottom
          className="Heading"
          sx={{
            color: { sx: "white", md: "black" },
            fontSize: { xs: 16, md: 20, lg: 24 },
          }}
        >
          Entire Bromo mountain view Cabin in Surabaya
        </Typography>

        <ViewPropButton text="Shortlist Property"></ViewPropButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          //   justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <OutlineCta text="Balcony view"></OutlineCta>
        <OutlineCta text="Option 1"></OutlineCta>
        <OutlineCta text="Option 2"></OutlineCta>
        <OutlineCta text="Option 3"></OutlineCta>
        <OutlineCta text="Option 4"></OutlineCta>
        <OutlineCta text="Option 5"></OutlineCta>
      </Box>

      <Container maxWidth="lg">
        <BootstrapCarousel id="carouselOne" img={cardImage} />
      </Container>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box className="text-card">
          <p className="Heading">Property Features</p>
          <p className="sub-Heading-1">Interior Features</p>
          <p className="sub-Heading">
            Fireplace, hardwood floors, granite countertops, stainless steel
            appliances, central air conditioning, etc.
          </p>


          <p className="sub-Heading-1">Exterior Features</p>
          <p className="sub-Heading">
            Fireplace, hardwood floors, granite countertops, stainless steel
            appliances, central air conditioning, etc.
          </p>
        </Box>
        <Box className="text-card">
          <p className="Heading">Property Features</p>
          <p className="sub-Heading-1">Interior Features</p>
          <p className="sub-Heading">
            Fireplace, hardwood floors, granite countertops, stainless steel
            appliances, central air conditioning, etc.
          </p>


          <p className="sub-Heading-1">Exterior Features</p>
          <p className="sub-Heading">
            Fireplace, hardwood floors, granite countertops, stainless steel
            appliances, central air conditioning, etc.
          </p>

          <p className="Heading">Property Features</p>
          <p className="sub-Heading-1">Interior Features</p>
          <p className="sub-Heading">
            Fireplace, hardwood floors, granite countertops, stainless steel
            appliances, central air conditioning, etc.
          </p>


          <p className="sub-Heading-1">Exterior Features</p>
          <p className="sub-Heading">
            Fireplace, hardwood floors, granite countertops, stainless steel
            appliances, central air conditioning, etc.
          </p>
        </Box>
      </Box>

      <Container maxWidth="lg">
        <img src={cardImage} alt="" width="100%" />
      </Container>
    </Box>
  );
};
export default PropertyDetails;
