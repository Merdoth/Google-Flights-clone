import { Box, Button, Container, Tooltip, Typography } from "@mui/material";
import useThemeMode from "../hooks/useContext";
import FlightsSearchCard from "./FlightsSearchCard";
import { InfoOutlined } from "@mui/icons-material";
import CitiesCard from "./common/CitiesCard";
// import { useSearchFlights } from "../hooks/useSearchFlights";


const FlightsHome = () => {
  const { isDay } = useThemeMode();

  const citiesDetails = [
    {
       city: "Lisbon",
       src: "/assets/lisbon.png",
       price: "NGN 1,363,100",
       date: "Jul 17 — Jul 23",
       stops: "1 stop",
       duration: "14 hr 15 min"
    },
    {
      src: "/assets/los-angeles.png",
      city: "Los Angeles",
       price: "NGN 1,686,980",
       date: "Jun 30 — Jul 6",
       stops: "1 stop",
       duration: "22 hr 55 min"
    },
    {
      src: "/assets/london.png",
      city: "London",
       price: "NGN 1,118,481",
       date: "Jul 4 — Jul 10",
       stops: "1 stop",
       duration: "18 hr 45 min"
    },
    {
     src: "/assets/sydney.png",
     city: "Cape Town",
       price: "",
       date: "",
       stops: "",
       duration: ""
    }
  ]

  return (
    <div>
      {/* Home container */}
      <Container
        className="home-container"
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          pb: 16
        }}
      >
        <Box
          maxWidth="lg"
          className="hero-bg"
          sx={{
            mt: 7.8,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={`${
              isDay ? "/assets/hero-bg-white.png" : "/assets/hero-bg-black.png"
            }`}
            alt="background illustration"
          />
          <Typography
            variant="h2"
            sx={{
              fontWeight: 500,
              fontSize: 55,
              marginTop: -2.3,
              marginLeft: -2,
            }}
          >
            Flights
          </Typography>
        </Box>
        <FlightsSearchCard />
        
        <Box className="explore-map" sx={{ mt: 4,  width: "88%", px: 1.4}}>
          <Typography variant="h6" sx={{textAlign: "left", display: "flex", alignItems: "center", justifyContent: "left", fontSize: 19, fontWeight: 600}}>Find cheap flights from Lagos to anywhere 
            <Tooltip title="This is a tooltip with more information" arrow>
            <InfoOutlined sx={{ ml: "8px", fontSize: 20, color: "#80868b", cursor: "pointer"}} />
            </Tooltip>
          </Typography>

          <Box className="citi-btns" sx={{display: "flex", mt: 3, alignItems: "center", gap: 1.5 }}>
            <Button sx={{borderRadius: 5, bgcolor: isDay ? "#f4f7ff" : "#2d343e", color: isDay ? "#1c73e8" : "#9dc0f9", textTransform: "capitalize", px: 1.6, py: 0.5, height: "34px", fontSize: 13.5, fontWeight: 600}}>
              Lagos
            </Button>
            <Button sx={{borderRadius: 5, bgcolor:  isDay ? "#fff" : "transparent", border: "0.6px solid #5d5f62", color: isDay ? "#5d5f62" : "#fff", textTransform: "capitalize", px: 1.6, py: 0.5, height: "34px", fontSize: 13.5, fontWeight: 600, "&:hover": { color: isDay ? "#4e91f7" : "#8ab5f7"} }}>
              Ibadan
            </Button>
          </Box>

          <Box className="map" sx={{ width: "auto"}}>
            <img src={`/assets/${isDay ? "map-white.png" : "map-black.png"}`} alt="map of lagos" />
          </Box>

          <CitiesCard citiesDetails={citiesDetails} />
        </Box>
      </Container>
    </div>
  );
};

export default FlightsHome;
