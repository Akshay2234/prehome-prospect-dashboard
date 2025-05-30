import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import {
  Home as HomeIcon,
  Favorite as FavoriteIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { MdDomain, MdOutlineAssignmentInd } from "react-icons/md";
import bot from '../assets/bot.png'

const BottomNavigationBar = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleNavigation = (newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/available-property");
        break;
      case 2:
        navigate("/property-detail");
        break;
      case 3:
        navigate("/settings");
        break;
      default:
        break;
    }
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: "block", sm: "none" }, // Show only on mobile
        zIndex:999999
      }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => handleNavigation(newValue)}
        showLabels
      >
        <BottomNavigationAction label="Application" icon={<MdOutlineAssignmentInd size={24} />} />
        <BottomNavigationAction label="Property" icon={<MdDomain size={24} />} />
        <BottomNavigationAction label="Help" icon={<Paper variant="outlined">
   <img src={bot} height={24} />
</Paper>} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavigationBar;
