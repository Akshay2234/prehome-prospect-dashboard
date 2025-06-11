import { Box, Typography } from "@mui/material";

import "../assets/style.css";
import PropertyCards from "../components/PropertyCards";

const AvailablePropertyScreen = () => {
  return (
    <>
      <Box
        width="lg"
        
      >
        <h4
          className="Heading-application"
       
 
        >
          Available Properties
        </h4>

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
