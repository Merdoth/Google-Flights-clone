import {
  Container,
  Tabs,
  Button,
  Menu,
  MenuItem,
  useTheme,
  IconButton,
  Box,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import {
  SwapHoriz,
  Person2Outlined,
  ArrowDropDown,
  Add,
  Remove,
  ArrowDropUp,
  SearchOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import useThemeMode from "../../hooks/useContext";
import "react-datepicker/dist/react-datepicker.css";
import SelectMenuOption from "../common/FlightsSelect";
import LocationInputs from "./LocationInputs";
import DatePickers from "./DatePickers";
import { searchFlights, searchAirport, searchEverywhere } from "../../api/flightsAPI";
import { toast } from 'react-toastify';


import { useNavigate } from "react-router-dom";

type PassengerType = "adults" | "children" | "infants";
type FlightsSearchCardProps = {
  useExploreEverywhere?: boolean;
};

const FlightsSearchCard = ({ useExploreEverywhere = false }: FlightsSearchCardProps) => {
  const theme = useTheme();
  const { isDay } = useThemeMode();
  const navigate = useNavigate();

  const [anchorElTrip, setAnchorElTrip] = useState<null | HTMLElement>(null);
  const [anchorElPerson, setAnchorElPerson] = useState<null | HTMLElement>(
    null
  );
  const [anchorElClass, setAnchorElClass] = useState<null | HTMLElement>(null);

  const [tripType, setTripType] = useState<
    "Round trip" | "One way" | "Multi-city"
  >("Round trip");
  const [flightClass, setFlightClass] = useState<
    "Premium economy" | "Economy" | "Business" | "First Class"
  >("Economy");

  const [passengers, setPassengers] = useState<Record<PassengerType, number>>({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const [from, setFrom] = useState("Lagos");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPassengers =
    passengers.adults + passengers.children + passengers.infants;

  // HandleCountChange
  const handleCountChange = (type: PassengerType, direction: "inc" | "dec") => {
    setPassengers((prev) => {
      const value =
        direction === "inc" ? prev[type] + 1 : Math.max(0, prev[type] - 1);
      return { ...prev, [type]: value };
    });
  };

  // HandleSearch
  const handleSearch = async () => {
  setLoading(true);
  setError(null);

  try {
    const originData = await searchAirport(from);
    const origin = originData?.data?.[0];

    if (!origin || !departure) {
      setError("Please fill in all required fields.");
      return;
    }

    // ✅ If "Explore Everywhere" is enabled (e.g., on FlightsDetails page)
    if (useExploreEverywhere) {
  try {
    const everywhereResults = await searchEverywhere({
      originEntityId: origin.entityId,
      cabinClass: flightClass.toLowerCase(),
      journeyType: tripType === "Round trip" ? "round_trip" : "one_way",
      currency: "USD",
    });

    if (
      !everywhereResults ||
      !everywhereResults.data ||
      everywhereResults.data.itineraries?.length === 0
    ) {
      toast.warning("No flights found for 'Explore Everywhere'. Try adjusting your search.");
      return;
    }

    navigate("/flight-details", {
      state: {
        flights: everywhereResults,
        searchParams: {
          from,
          to: "Everywhere",
          departure,
          returnDate,
          passengers,
          flightClass,
        },
      },
    });
  } catch (err) {
    console.error("🌍 Explore Everywhere Error:", err);
    toast.error("Something went wrong while searching Explore Everywhere.");
  } finally {
    setLoading(false);
  }

  return;
}

    // ✅ Otherwise, do normal origin-destination search
    const destData = await searchAirport(to);
    const destination = destData?.data?.[0];

    if (!destination) {
      setError("Please select a destination.");
      return;
    }

    const result = await searchFlights({
      originSkyId: origin.skyId,
      destinationSkyId: destination.skyId,
      originEntityId: origin.entityId,
      destinationEntityId: destination.entityId,
      date: departure.toISOString().split("T")[0],
      returnDate: returnDate?.toISOString().split("T")[0],
      cabinClass: flightClass.toLowerCase(),
      adults: totalPassengers.toString(),
      sortBy: "best",
      currency: "USD",
      market: "en-US",
      countryCode: "US",
    });

    navigate("/flight-details", {
      state: {
        flights: result,
        searchParams: {
          from,
          to,
          departure,
          returnDate,
          passengers,
          flightClass,
        },
      },
    });
  } catch (err) {
    console.error("❌ Flight Search Error:", err);
    setError("Flight search failed. Please try again.");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
  if (error) {
    toast.error(error);
  }
}, [error]);

  return (
    <>
      <Container
        maxWidth="lg"
        className="flights-search-card"
        sx={{
          mt: "3rem",
          width: "86%",
          bgcolor: isDay ? "#fffff" : "#37373a",
          px: "10px",
          pt: 1,
          pb: 6.5,
          borderRadius: 2,
        }}
      >
        <Tabs
          className="search-tabs"
          sx={{ display: "flex", color: theme.palette.text.primary, gap: 2 }}
        >
          {/* Trip Type */}
          <SelectMenuOption
            theme={theme}
            label={tripType}
            options={["Round trip", "One way", "Multi-city"]}
            open={Boolean(anchorElTrip)}
            anchorEl={anchorElTrip}
            onOpen={(e) => setAnchorElTrip(e.currentTarget)}
            onClose={() => setAnchorElTrip(null)}
            onSelect={(type) => setTripType(type as typeof tripType)}
            isDay={isDay}
            icon={<SwapHoriz />}
          />

          {/* Passenger Count */}
          <div className="button-cont">
            <Button
              onClick={(e) => setAnchorElPerson(e.currentTarget)}
              startIcon={<Person2Outlined />}
              endIcon={
                anchorElPerson ? (
                  <ArrowDropUp sx={{ color: "#9dc0f9" }} />
                ) : (
                  <ArrowDropDown />
                )
              }
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "13px",
                borderBottom: anchorElPerson ? "2px solid #9dc0f9" : "none",
                bgcolor: anchorElPerson ? (isDay ? "#e7f1fe" : "#344a69") : "",
              }}
            >
              {totalPassengers}
            </Button>
            <Menu
              anchorEl={anchorElPerson}
              open={!!anchorElPerson}
              onClose={() => setAnchorElPerson(null)}
            >
              {(["adults", "children", "infants"] as PassengerType[]).map(
                (type) => (
                  <MenuItem key={type} disableRipple>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Typography textTransform="capitalize">{type}</Typography>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconButton
                          size="small"
                          onClick={() => handleCountChange(type, "dec")}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography minWidth="24px" textAlign="center">
                          {passengers[type]}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleCountChange(type, "inc")}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </MenuItem>
                )
              )}
            </Menu>
          </div>

          {/* Class Menu */}
          <SelectMenuOption
            theme={theme}
            label={flightClass}
            options={["Economy", "Premium economy", "Business", "First Class"]}
            open={Boolean(anchorElClass)}
            anchorEl={anchorElClass}
            onOpen={(e) => setAnchorElClass(e.currentTarget)}
            onClose={() => setAnchorElClass(null)}
            onSelect={(cls) => setFlightClass(cls as typeof flightClass)}
            isDay={isDay}
          />
        </Tabs>

        {/* Flight Input Fields */}
        <Stack
          spacing={2}
          direction="row"
          className="flight-inputs"
          sx={{
            alignItems: "center",
            gap: 2,
            overflow: "hidden",
            width: "100%",
          }}
        >
          {/* Location Input Fields */}
          <LocationInputs
            from={from}
            setFrom={setFrom}
            to={to}
            setTo={setTo}
            isDay={isDay}
          />

          {/* Date Pickers */}
          <DatePickers
            departure={departure}
            setDeparture={setDeparture}
            returnDate={returnDate}
            setReturnDate={setReturnDate}
            isDay={isDay}
          />
        </Stack>
      </Container>
      <Button
        onClick={handleSearch}
        disabled={loading}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          borderRadius: 10,
          overflow: "hidden",
          minWidth: "120px", // prevents jump
          position: "relative",
          px: 2,
          py: 1,
          bgcolor: isDay ? "#1e65c9" : "#8ab6fc",
          color: isDay ? "#fff" : "#2c2f37",
          mt: -3,
          "&:hover": { bgcolor: isDay ? "#1250a7" : "#9dc0f9" },
        }}
        aria-label={loading ? "Searching flights..." : "Search flights"}
      >
        {/* Loader */}
        <Box
          sx={{
            position: "absolute",
            opacity: loading ? 1 : 0,
            transition: "opacity 0.3s ease",
            mt: ".35rem",
          }}
        >
          <CircularProgress
            size={20}
            sx={{ color: isDay ? "#fff" : "#2c2f37" }}
          />
        </Box>

        {/* Text + Icon */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            opacity: loading ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          <SearchOutlined />
          <Typography
            variant="h5"
            fontSize={13}
            fontWeight={600}
            textTransform={"capitalize"}
          >
            Explore
          </Typography>
        </Box>
      </Button>
    </>
  );
};

export default FlightsSearchCard;
