import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import { Box, Container, Divider, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import useThemeMode from "../hooks/useContext";
import FlightsSearchCard from "./FlightsSearchCard";

const FlightsDetails = () => {
  const { isDay } = useThemeMode();
  const location = useLocation();

  const { flights, searchParams } = location.state || {};
  const flightResults = flights?.data?.itineraries || [];

  return (
    <div>
      <Container
        className="home-container"
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 7.8,
          pb: 16,
        }}
      >
        <FlightsSearchCard useExploreEverywhere />

        {flightResults.length > 0 ? (
          <Box sx={{ mt: 6, width: "88%" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: 20, fontWeight: 600 }}
            >
              Showing results for {searchParams?.from} → {searchParams?.to}
            </Typography>

            {flightResults.map((flight: any, index: number) => (
              <Box
                key={index}
                sx={{
                  mb: 2,
                  p: 2,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  background: isDay ? "#f9f9f9" : "#2b2b2b",
                }}
              >
                <Typography>
                  ✈️ {flight?.segments?.[0]?.origin?.name ?? "Unknown"} →{" "}
                  {flight?.segments?.[0]?.destination?.name ?? "Unknown"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {flight?.price?.formatted || "N/A"}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              mt: 9,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #ccc",
              width: "86%",
              padding: "70px 0",
              borderRadius: 5,
            }}
          >
            <AirplanemodeActiveIcon
              sx={{
                fontSize: 55,
                transform: "rotate(90deg)",
                color: isDay ? "#5d5f62" : "#e1dfdf",
                animation: "fly 2.5s ease-in-out infinite",
                "@keyframes fly": {
                  "0%": { transform: "rotate(90deg) translateY(0px)" },
                  "50%": {
                    transform: "rotate(90deg) translateY(-10px) scale(1.05)",
                  },
                  "100%": { transform: "rotate(90deg) translateY(0px)" },
                },
              }}
            />
            <Divider>-.-.-.-.-.-.-.-.-.-.-</Divider>
            <Typography
              variant="body1"
              sx={{ mt: 2, fontSize: {
                sm: 19,
                xs: 14
              }, textAlign: "center", color: isDay ? "#5d5f62" : "#e1dfdf" }}
            >
              No flight results found. Try searching again.
            </Typography>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default FlightsDetails;
