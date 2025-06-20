import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import logo from '../assets/logo.png';

const drawerWidth = 240;

export default function Sidebar() {
  const [selectedItem, setSelectedItem] = useState('Dashboard');
  const [notifications, setNotifications] = useState(5); // Example notification count
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleListItemClick = (text) => {
    if (text.route === 'logout') {
      localStorage.removeItem('user_id');
      localStorage.removeItem('authToken');
      navigate('/login');
      return;
    }

    navigate(`/${text.route}`);
    setSelectedItem(text.name);
  };

  const drawer = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Logo */}
      <Toolbar disableGutters sx={{ alignItems: 'center', justifyContent: 'center', p: 3 }}>
        <img height={80} width="auto" src={logo} alt="Logo" />
      </Toolbar>

      {/* Menu Items */}
      <List>
        {[
          { name: 'Dashboard', route: 'dashboard' },
          { name: 'Properties', route: 'available-property' },
          { name: 'PreHome Help', route: 'prehome-help' },
        ].map((text, index) => (
          <ListItem
            button
            key={text.name}
            onClick={() => handleListItemClick(text)}
            sx={{
              cursor: 'pointer',
              backgroundColor: selectedItem === text.name ? '#fdf0d9' : 'transparent',
            }}
          >
            <ListItemIcon>
              {index === 0 && <PeopleIcon />}
              {index === 1 && <AssessmentIcon />}
              {index === 2 && <SettingsIcon />}
            </ListItemIcon>
            <ListItemText sx={{ fontFamily: 'Poppins' }} primary={text.name} />
          </ListItem>
        ))}
      </List>

      {/* Spacer to push logout button to bottom */}
      <Box sx={{ flexGrow: 1 }} />

      {/* Logout Button */}
      <Box sx={{ p: 2 }}>
        <ListItem
          button
          onClick={() => handleListItemClick({ name: 'Logout', route: 'logout' })}
          sx={{
            cursor: 'pointer',
            backgroundColor: selectedItem === 'Logout' ? '#fdf0d9' : 'transparent',
          }}
        >
          <ListItemIcon>
            <MdLogout />
          </ListItemIcon>
          <ListItemText sx={{ fontFamily: 'Poppins' }} primary="Logout" />
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <Box>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
          ml: isMobile ? 0 : `${drawerWidth}px`,
          backgroundColor: 'white',
        }}
      >
        <Toolbar>
          {/* Only Show Menu Icon on Mobile */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* AppBar Title */}
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, color: 'black' }}>
            {/* Admin Dashboard */}
          </Typography>

          {/* Notification Icon */}
          <IconButton color="inherit" sx={{ color: 'black' }}>
            <Badge badgeContent={notifications} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Logout Button for Mobile */}
          {isMobile && (
            <IconButton
              sx={{ color: 'black', ml: 1 }}
              onClick={() => handleListItemClick({ name: 'Logout', route: 'logout' })}
            >
              <MdLogout />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Desktop Only */}
      {!isMobile && (
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
          }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="permanent"
            sx={{
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      )}
    </Box>
  );
}
