import { Box } from "@mui/material";
import DatePicker from "react-datepicker";
import CustomDateInput from "../common/CustomDateInput";
import "react-datepicker/dist/react-datepicker.css";

const DatePickers = ({ departure, returnDate, setDeparture, setReturnDate, isDay }: {
  departure: Date | null;
  returnDate: Date | null;
  setDeparture: (val: Date | null) => void;
  setReturnDate: (val: Date | null) => void;
  isDay: boolean;
}) => {
  return (
    <Box className="date-box" sx={{ display: "flex", alignItems: "center", width: "30%", borderColor: isDay ? "#dcdee2" : "#5f6368" }}>
      <DatePicker
        selected={departure}
        onChange={(date) => setDeparture(date)}
        monthsShown={2}
        placeholderText="Departure"
        dateFormat="dd MMMM"
        popperPlacement="bottom-start"
        calendarClassName={isDay ? "light" : "dark"}
        customInput={<CustomDateInput isDay={isDay} placeholder="Departure" />}
      />

      <DatePicker
        selected={returnDate}
        onChange={(date) => setReturnDate(date)}
        monthsShown={2}
        placeholderText="Return"
        dateFormat="dd MMMM"
        popperPlacement="bottom-start"
        calendarClassName={isDay ? "light" : "dark"}
        customInput={<CustomDateInput isDay={isDay} placeholder="Return" noBorderRight />}
      />
    </Box>
  );
};

export default DatePickers;