import { Box, Typography, Container, useMediaQuery } from "@mui/material";
// import ViewPropButton from "../components/ViewPropButton";
import OutlineCta from "../components/OutlineCta";
import cardImage from "../assets/Frame 86.png";
import BootstrapCarousel from "../components/BootstrapCarousel";
import LeftArrow from "../assets/Component 13.png";
// import shortlistIcon from "../assets/event_upcoming.png"
import mapImage from "../assets/mapimage.png";
import ShortlistCTA from "../components/ShortListCta";
import { useTheme } from "@mui/material/styles";

const PropertyDetails = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      className="property-main-box"
      sx={{
        p: 2,
        backgroundColor: { xs: "#fff", md: "#ECECEC" },
        minHeight: "100vh",
      }}
    >
      {/* Top Navigation */}
      <Container maxWidth="lg">
        <Box className="navigation-box">
          <img src={LeftArrow} alt="" />
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ display: { xs: "none", md: "block",lg:"block" } }}
          >
            Property Details
          </Typography>
          {isMobile && (
            <Typography fontWeight="bold" fontSize={16} padding="8% 0">
              About The Property
            </Typography>
          )}
        </Box>
        <Box className="Heading-box">
          <h6 className="prop-card-head">
            Entire Bromo mountain view Cabin in Surabaya
          </h6>

          {/* <ViewPropButton text="Shortlist Property" img={shortlistIcon} onClick={clicked}></ViewPropButton> */}
          <ShortlistCTA></ShortlistCTA>
        </Box>

        <Box className="cta-container">
          <OutlineCta text="Balcony view"></OutlineCta>
          <OutlineCta text="Option 1"></OutlineCta>
          <OutlineCta text="Option 2"></OutlineCta>
          <OutlineCta text="Option 3"></OutlineCta>
          <OutlineCta text="Option 4"></OutlineCta>
          <OutlineCta text="Option 5"></OutlineCta>
        </Box>
      </Container>

      <Container maxWidth="lg">
        <BootstrapCarousel id="carouselOne" img={cardImage} />
      </Container>

      <Box className="text-card-container">
        <Box className="text-card">
          <p className="Heading-text-card">Property Features</p>
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
          <p className="sub-Heading-1">Exterior Features</p>
          <p className="sub-Heading">
            Fireplace, hardwood floors, granite countertops, stainless steel
            appliances, central air conditioning, etc.
          </p>
        </Box>

        <Box className="text-card">
          <p className="Heading-text-card">General Property Information</p>
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
          <p className="sub-Heading-1">Exterior Features</p>
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
        <img src={mapImage} alt="" width="100%" />
      </Container>
    </Box>
  );
};
export default PropertyDetails;
