import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import Sidebar from "./components/Sidebar";
import AvailablePropertyScreen from "./screens/AvailablePropertyScreen";
import DashboardScreen from "./screens/DashboardScreen";
import PrehomeHelp from "./screens/PrehomeHelp";
import PropertyDetails from "./screens/propertyDetails";
function AppContent() {
  const location = useLocation();

  // Routes where the Sidebar should be hidden
  const hiddenSidebarRoutes = ["/login", "/auth", "/signup", "/verify","/convert-new-user"];

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Conditionally render Sidebar */}
      {!hiddenSidebarRoutes.includes(location.pathname) && <Sidebar />}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: hiddenSidebarRoutes.includes(location.pathname)?0:3,
          backgroundColor: "#f4f5f7", // Light background
          overflowY: "auto", // Scrollable content
          mt: hiddenSidebarRoutes.includes(location.pathname)?0:5,
          pb: { xs: 8, sm: 0 }, // Add padding to avoid overlapping BottomNavigationBar on mobile
        }}
      >
        <Routes>
         
          <Route path="/" element={<DashboardScreen/>} />
          <Route
            path="/available-property"
            element={
                <AvailablePropertyScreen />
            }
          />
          <Route
            path="/property-detail"
            element={
                <PropertyDetails />
            }
          />
          <Route
            path="/prehome-help"
            element={
                <PrehomeHelp />
            }
          />
         
        </Routes>
      </Box>

   
      
    </Box>
  );
}

function App() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
        <Router>
          <AppContent />
        </Router>
    </ThemeProvider>
  );
}

export default App;
