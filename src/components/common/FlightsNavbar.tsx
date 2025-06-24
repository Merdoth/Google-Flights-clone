import {
  AppsRounded,
  DarkMode,
  LightModeOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  useTheme,
} from "@mui/material";
import useThemeMode from "../../hooks/useContext";
import { useNavigate } from "react-router-dom";

const FlightsNavbar = () => {
  const { isDay, toggleTheme } = useThemeMode();
  const theme = useTheme(); // 👈 get current MUI theme
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar className="navbar" sx={{ overflow: "hidden" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className="hamburger"
          >
            <MenuOutlined
              sx={{ color: `${isDay ? "#606367" : "#e2e2e3"}`, width: "28px" }}
            />
          </IconButton>
          <img
            src={`${isDay ? "/logo-light.png" : "/logo-dark.png"}`}
            alt="App Logo"
            className="logo"
            style={{ cursor: "pointer"}}
            onClick={() => navigate("/")}
          />
        </Box>

        <Box
          className="profile"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: theme.palette.background.default,
          }}
        >
          <IconButton onClick={toggleTheme}>
            {isDay ? (
              <DarkMode sx={{ color: "#606367", width: "18px" }} />
            ) : (
              <LightModeOutlined sx={{ color: "#e2e2e3", width: "18px" }} />
            )}
          </IconButton>

          <IconButton className="apps-icon">
            <AppsRounded
              sx={{ color: `${isDay ? "#606367" : "#e2e2e3"}`, width: "24px" }}
            />
          </IconButton>

          <IconButton sx={{ width: 32, height: 32 }}>
            <Avatar alt="User" sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default FlightsNavbar;
