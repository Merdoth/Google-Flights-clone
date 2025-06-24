import axios from "axios";

const API_HOST = "sky-scrapper.p.rapidapi.com";
const BASE_URL = `https://${API_HOST}/api`;

type SearchParams = {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  returnDate?: string;
  cabinClass?: string;
  adults?: string;
  sortBy?: string;
  currency?: string;
  market?: string;
  countryCode?: string;
};



export const searchFlights = async (params: SearchParams) => {
  try {
    const response = await axios.get(`${BASE_URL}/v2/flights/searchFlights`, {
      params,
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_AIRSCRAPER_API_KEY,
        "x-rapidapi-host": API_HOST,
      },
    });

    return response.data;
  } catch (error) {
      console.error("❌ Failed to fetch flights:", error);
    throw error;
  }
};


export const searchAirport = async (query: string) => {
  const response = await axios.get(`${BASE_URL}/v1/flights/searchAirport`,
    {
      params: { query },
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_AIRSCRAPER_API_KEY,
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      },
    }
  );
  return response.data;
}

export const searchEverywhere = async ({
  originEntityId,
  cabinClass = "economy",
  journeyType = "one_way",
  currency = "USD",
}: {
  originEntityId: string;
  cabinClass?: string;
  journeyType?: "one_way" | "round_trip";
  currency?: string;
}) => {
  const response = await axios.get(`${BASE_URL}/v2/flights/searchFlightEverywhere`,
    {
      params: {
        originEntityId,
        cabinClass,
        journeyType,
        currency,
      },
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_AIRSCRAPER_API_KEY,
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      },
    }
  );

  return response.data;
};
