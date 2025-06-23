import { forwardRef } from "react";
import { Box, Typography } from "@mui/material";
import { CalendarMonthOutlined } from "@mui/icons-material";

type CustomDateInputProps = {
  isDay?: boolean;
  value?: string;
  onClick?: () => void;
  placeholder?: string;
  noBorderRight?: boolean;
};

const CustomDateInput = forwardRef<HTMLDivElement, CustomDateInputProps>(
  ({ isDay, value, onClick, placeholder, noBorderRight = false }, ref) => (
    <Box
      onClick={onClick}
      ref={ref}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        px: "16px",
        py: 1,
        cursor: "pointer",
        borderRight: noBorderRight
          ? "none"
          : isDay
          ? "1.5px solid #dcdee2"
          : "1.5px solid #5f6368",
      }}
    >
      {placeholder === "Departure" && (
        <CalendarMonthOutlined sx={{ fontSize: 20, color: "#ccc", mr: 1, display: {
          xs: "none",
          sm: "block",
        } }} />
      )}
      <Typography sx={{ color: isDay ? "#757575" : "#828282", fontSize: 16 }}>
        {value || placeholder}
      </Typography>
    </Box>
  )
);

export default CustomDateInput;
