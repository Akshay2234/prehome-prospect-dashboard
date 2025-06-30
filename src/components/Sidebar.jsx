import React, { useState, useEffect, useRef } from 'react';
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
  Paper,
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
import axios from 'axios';

const drawerWidth = 240;

export default function Sidebar() {
  const [selectedItem, setSelectedItem] = useState('Dashboard');
  const [notifications, setNotifications] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef();

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

  // ✅ Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      const userId = localStorage.getItem("user_id");
      if (!userId) return;

      try {
        const res = await axios.get(`https://prehome-prospect-dashboard.onrender.com/api/notifications/${userId}`);
        setNotifications(res.data || []);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar disableGutters sx={{ alignItems: 'center', justifyContent: 'center', p: 3 }}>
        <img height={80} width="auto" src={logo} alt="Logo" />
      </Toolbar>

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

      <Box sx={{ flexGrow: 1 }} />

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
          {isMobile && (
            <IconButton edge="start" color="inherit" sx={{ mr: 2 }} aria-label="menu">
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" noWrap sx={{ flexGrow: 1, color: 'black' }} />

          {/* ✅ Notification Bell with Dropdown */}
          <Box sx={{ position: 'relative' }} ref={dropdownRef}>
            <IconButton color="inherit" sx={{ color: 'black' }} onClick={() => setOpenDropdown(!openDropdown)}>
              <Badge badgeContent={notifications.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {openDropdown && (
              <Paper
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: '40px',
                  width: 300,
                  maxHeight: 350,
                  overflowY: 'auto',
                  zIndex: 999,
                  p: 2,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Notifications
                </Typography>
                {notifications.length === 0 ? (
                  <Typography variant="body2">No notifications</Typography>
                ) : (
                  notifications.map((note, idx) => (
                    <Box key={idx} sx={{ mb: 1, borderBottom: '1px solid #eee', pb: 1 }}>
                      <Typography variant="body2">{note.message}</Typography>
                      <Typography variant="caption" sx={{ color: 'gray' }}>
                        {new Date(note.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                  ))
                )}
              </Paper>
            )}
          </Box>

          {isMobile && (
            <IconButton sx={{ color: 'black', ml: 1 }} onClick={() => handleListItemClick({ name: 'Logout', route: 'logout' })}>
              <MdLogout />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {!isMobile && (
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
          <Drawer
            variant="permanent"
            sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      )}
    </Box>
  );
}
