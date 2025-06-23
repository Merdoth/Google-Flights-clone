import {
  Menu,
  MenuItem,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { ArrowDropDown, ArrowDropUp, Check } from "@mui/icons-material";
import type { ReactNode } from "react";

type SelectMenuOptionProps<T> = {
  theme?: any
  label: T;
  options: T[];
  open: boolean;
  anchorEl: null | HTMLElement;
  onOpen: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
  onSelect: (option: T) => void;
  isDay: boolean;
  icon?: ReactNode;
};

function SelectMenuOption<T extends string>({
  theme,
  label,
  options,
  open,
  anchorEl,
  onOpen,
  onClose,
  onSelect,
  isDay,
  icon,
}: SelectMenuOptionProps<T>) {
  return (
    <>
      <Button
        onClick={onOpen}
        startIcon={icon}
        endIcon={open ? <ArrowDropUp sx={{ color: "#9dc0f9" }} /> : <ArrowDropDown />}
        sx={{
          color: theme.palette.text.secondary,
          fontSize: "13px",
          borderBottom: open ? "2px solid #9dc0f9" : "none",
          bgcolor: open ? (isDay ? "#e7f1fe" : "#344a69") : "",
          textTransform: "none",
          
        }}
      >
        <span>{label}</span>
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={label === option}
            onClick={() => {
              onSelect(option);
              onClose();
            }}
          >
            <Box display="flex" alignItems="center" paddingLeft="10px" width="100%">
              {label === option && <Check fontSize="small" sx={{ marginRight: "15px" }} />}
              <Typography variant="body2">{option}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default SelectMenuOption;
