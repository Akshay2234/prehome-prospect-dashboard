import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import Sidebar from "./components/Sidebar";
import AvailablePropertyScreen from "./screens/AvailablePropertyScreen";
import PropertyDetailsScreen from "./screens/PropertyDetailsScreen";
import BottomNavigationBar from "./components/BottomNavigationBar";
// import AuthScreen from "./screens/AuthScreen";
// import SignUpPasswordScreen from "./screens/SignUpPasswordScreen";
// import LoginWithPasswordScreen from "./screens/LoginWithPasswordScreen";
// import OtpVerifyScreen from "./screens/OtpVerifyScreen";
// import ConvertNewUser from "./screens/ConvertNewUser";
import AuthRoute from "./components/AuthRoute";
import { GoogleOAuthProvider } from "@react-oauth/google";
import DashboardScreen from "./screens/DashboardScreen";
import PrehomeHelp from "./screens/PrehomeHelp";

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
          {/* <Route
            path="/"
            element={
              <AuthRoute>
                <h1>Home Page</h1>
              </AuthRoute>
            }
          /> */}
          <Route path="/" element={<DashboardScreen/>} />
          {/* <Route path="/" element={<AuthRoute><DashboardScreen/></AuthRoute>} /> */}
          {/* <Route path="/auth" element={<AuthScreen />} /> */}
          {/* <Route path="/verify" element={<OtpVerifyScreen />} />
          <Route path="/signup" element={<SignUpPasswordScreen />} />
          <Route path="/login" element={<LoginWithPasswordScreen />} />
          <Route path="/convert-new-user" element={<ConvertNewUser />} /> */}
          <Route
            path="/available-property"
            element={
                <AvailablePropertyScreen />
            }
          />
          <Route
            path="/property-detail"
            element={
                <PropertyDetailsScreen />
            }
          />
          <Route
            path="/prehome-help"
            element={
                <PrehomeHelp />
            }
          />
          <Route
            path="*"
            element={
              <AuthRoute>
                <h1>404 - Page Not Found</h1>
              </AuthRoute>
            }
          />
        </Routes>
      </Box>

      {/* Bottom Navigation for Mobile */}
      {
        !hiddenSidebarRoutes.includes(location.pathname) && <BottomNavigationBar />
      }
      
    </Box>
  );
}

function App() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <GoogleOAuthProvider clientId="597576292269-1lsjf5rb8vi3n472f4l64ebuthl79fss.apps.googleusercontent.com">
        <Router>
          <AppContent />
        </Router>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
}

export default App;
