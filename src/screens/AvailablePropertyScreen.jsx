import { Box, Typography } from "@mui/material";

import "../assets/style.css";
import PropertyCards from "../components/PropertyCards";

const AvailablePropertyScreen = () => {
  return (
    <>
      <Box
        width="lg"
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ margin: "50px 0 0 25px", display: { xs: "none", md: "block" } }}
        >
          Available Properties
        </Typography>

        <PropertyCards
          Heading="Entire Bromo mountain view Cabin in Surabaya from card"
          SubHeading="Luxurious villa with stunning ocean views and private beach access from card."
        />
        <PropertyCards
          Heading="Entire Bromo mountain view Cabin in Surabaya from card"
          SubHeading="Luxurious villa with stunning ocean views and private beach access from card."
        />
        <PropertyCards
          Heading="Entire Bromo mountain view Cabin in Surabaya from card"
          SubHeading="Luxurious villa with stunning ocean views and private beach access from card."
        />
        <PropertyCards
          Heading="Entire Bromo mountain view Cabin in Surabaya from card"
          SubHeading="Luxurious villa with stunning ocean views and private beach access from card."
        />
      </Box>
    </>
  );
};

export default AvailablePropertyScreen;
