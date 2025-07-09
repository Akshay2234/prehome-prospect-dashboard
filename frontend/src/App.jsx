import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import Sidebar from "./components/Sidebar";
import AvailablePropertyScreen from "./screens/AvailablePropertyScreen";
import PropertyDetails from "./screens/PropertyDetails";
import DashboardScreen from "./screens/DashboardScreen";
import PrehomeHelp from "./screens/PrehomeHelp";
import Login from "./screens/Auth/Login";
import Signup from "./screens/Auth/signup";
import SetPassword from "./screens/Auth/SetPassword";

function AppContent() {
  const location = useLocation();

  const hiddenSidebarRoutes = ["/login","/","/set-password", "/auth", "/signup", "/verify", "/convert-new-user"];

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {!hiddenSidebarRoutes.includes(location.pathname) && <Sidebar />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: hiddenSidebarRoutes.includes(location.pathname) ? 0 : 3,
          backgroundColor: "#f4f5f7",
          overflowY: "auto",
          mt: hiddenSidebarRoutes.includes(location.pathname) ? 0 : 5,
          pb: { xs: 8, sm: 0 },
        }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/available-property" element={<AvailablePropertyScreen />} />
          <Route path="/prehome-help" element={<PrehomeHelp />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/set-password" element={<SetPassword />} />
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
