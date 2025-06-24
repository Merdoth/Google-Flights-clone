import { Box, InputBase } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TripOriginSharp from "@mui/icons-material/TripOriginSharp";
import SwapHoriz from "@mui/icons-material/SwapHoriz";

const LocationInputs = ({ from, to, setFrom, setTo, isDay }: {
  from: string;
  to: string;
  setFrom: (val: string) => void;
  setTo: (val: string) => void;
  isDay: boolean;
}) => {
  return (
    <Box className="location-input" sx={{ display: "flex", alignItems: "center", position: "relative", gap: 2, width: "68%" }}>
      {/* From Field */}
      <Box className="input-box" sx={{ display: "flex", alignItems: "center", borderColor: isDay ? "#dcdee2" : "#5f6368" }}>
        <TripOriginSharp sx={{ color: isDay ? "#3d4043" : "#ccc", mr: 1, width: "15px", display: {
          xs: "none",
          sm: "block",
        }}} />
        <InputBase value={from} onChange={(e) => setFrom(e.target.value)} sx={{ color: isDay ? "#5d5f62" : "#dcdee2", fontSize: 16, width: "auto" }} />

        
      </Box>

      {/* Swap Icon */}
      <Box className="swap-box" sx={{
        width: 36,
        height: 36,
        backgroundColor: {
          xs: isDay ? "#fff" : "#202124",
          sm: isDay ? "#fff" : "#37373a",
        },
        borderColor: isDay ? "#dcdee2" : "#5f6368",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        left: 0,
        right: 0,
        margin: "0 auto",
      }}>
        <SwapHoriz sx={{ fontSize: 24, color: isDay ? "#b5b6b7" : "#7a7b7e" }} />
      </Box>

      {/* To Field */}
      <Box className="input-box where-to" sx={{ display: "flex", alignItems: "center", borderColor: isDay ? "#dcdee2" : "#5f6368", width: "48%" }}>
        <LocationOnOutlinedIcon sx={{ color: isDay ? "#3d4043" : "#ccc", mr: 1, width: "23px", display: {
          xs: "none",
          sm: "block",
        } }} />
        <InputBase placeholder="Where to?" value={to} onChange={(e) => setTo(e.target.value)} sx={{ color: isDay ? "#000" : "#dcdee2", fontSize: 16, width: "auto" }} />
      </Box>
    </Box>
    
  );
};

export default LocationInputs;