import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface CityDetails  {
    src: string;
    city: string;
    price: string;
    date: string;
    stops: string;
    duration: string;
}

interface CitiesCardProps {
  citiesDetails: CityDetails[];
}


const CitiesCard = ({ citiesDetails }: CitiesCardProps) => {
  const navigate = useNavigate();

  return (

          <Box className="cities-cont" sx={{ width: "auto", mt: 2,  display: "flex", alignItems: "start",  gap: 4}}>
            {citiesDetails.map((cityDets, index: number) => (
              <Box className="citi" sx={{ width: "auto", display: "flex", flexDirection: "column", cursor: "pointer"}} key={index} onClick={() => navigate("/flight-details")}  role="button" // Better accessibility
      tabIndex={0} // Make it focusable
>
                <Box className="citi-img" sx={{ width: "225px", height: "110px"}}>
                <img src={cityDets?.src} alt="city of liston" />
                </Box>
                <Box className="citi-text"  sx={{ display: "flex", flexDirection: "column"}}>
                <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mt: 0.6}}>
                  <Typography sx={{ fontWeight: 700, fontSize: 14.5}}>{cityDets?.city}</Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: 14.5}}>{cityDets?.price}</Typography>
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "start", mt: 0.4}}>
                  <Typography sx={{ fontWeight: 500, fontSize: 14}}>{cityDets?.date}</Typography>
                  <Typography sx={{ fontWeight: 500, fontSize: 14}}>{cityDets?.stops} . {cityDets?.duration}</Typography>
                </Box>
                </Box>
              </Box>
            ))}
          </Box>
  );
};

export default CitiesCard;
