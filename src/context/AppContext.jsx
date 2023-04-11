import { createContext, useState } from "react";
import getForecastFromLatLng from "../getForecastFromLatLng";

const AppContext = createContext();
// const geolocationUrl = "https://geocoding-api.open-meteo.com/v1/search?";
// const forecastUrl = "https://api.open-meteo.com/v1/forecast";
export const AppProvider = ({ children }) => {
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState("");
  const [cityResults, setCityResults] = useState(null);
  const [favorite, setFavorite] = useState([]);
  const [existingFavorites, setExistingFavorites] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tempUnit, setTempUnit] = useState("celsius");

  const getForecastBySearchValue = async ({
    longitude,
    latitude,
    timezone,
    city,
    isFavorite = false,
    mainLocation,
    tempUnit,
  }) => {
    const response = await getForecastFromLatLng({
      latitude,
      longitude,
      timezone,
      tempUnit,
    });

    setLocation({
      latitude,
      longitude,
      timezone,
      city,
      isFavorite,
      mainLocation,
    });
    setIsLoading(false);
    setForecast(response);
  };

  return (
    <AppContext.Provider
      value={{
        searchValue,
        forecast,
        setForecast,
        location,
        search,
        setSearch,
        cityResults,
        setCityResults,
        favorite,
        setFavorite,
        existingFavorites,
        setExistingFavorites,
        isMenuOpen,
        setIsMenuOpen,
        isLoading,
        setIsLoading,
        tempUnit,
        setTempUnit,
        setLocation,
        setSearchValue,
        getForecastBySearchValue,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
