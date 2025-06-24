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
} from "@mui/material";
import {
  SwapHoriz,
  Person2Outlined,
  ArrowDropDown,
  Add,
  Remove,
  ArrowDropUp,
} from "@mui/icons-material";
import { useState } from "react";
import useThemeMode from "../../hooks/useContext";
import "react-datepicker/dist/react-datepicker.css";
import SelectMenuOption from "../common/FlightsSelect";
import LocationInputs from "./LocationInputs";
import DatePickers from "./DatePickers";

type PassengerType = "adults" | "children" | "infants";

const FlightsSearchCard = () => {
  const theme = useTheme();
  const { isDay } = useThemeMode();

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

  const totalPassengers =
    passengers.adults + passengers.children + passengers.infants;

  const handleCountChange = (type: PassengerType, direction: "inc" | "dec") => {
    setPassengers((prev) => {
      const value =
        direction === "inc" ? prev[type] + 1 : Math.max(0, prev[type] - 1);
      return { ...prev, [type]: value };
    });
  };

  return (
    <Container
      maxWidth="lg"
      className="flights-search-card"
      sx={{
        mt: "3rem",
        width:"86%",
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
        sx={{ alignItems: "center", gap: 2, overflow: "hidden", width: "100%" }}
      >
         {/* Location Input Fields */}
        <LocationInputs from={from} setFrom={setFrom} to={to} setTo={setTo} isDay={isDay} />

        {/* Date Pickers */}
        <DatePickers departure={departure} setDeparture={setDeparture} returnDate={returnDate} setReturnDate={setReturnDate} isDay={isDay} />
      </Stack>
    </Container>
  );
};

export default FlightsSearchCard;
