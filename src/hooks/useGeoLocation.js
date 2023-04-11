import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import getFavoritesFromLocalStorage from "./getFavoritesFromLocalStorage";

const getCityLocation = async (location) => {
  const res = await axios.get(location);

  return {
    city: res.data.city,
    county: res.data.principalSubdivision,
  };
};

const useGeoLocation = () => {
  const { getForecastBySearchValue, setIsLoading } = useContext(AppContext);
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { latitude: "", longitude: "" },
    timezone: "",
    city: "",
    isFavorite: false,
    mainLocation: false,
  });

  const onSuccess = async (location) => {
    const getLocation = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&localityLanguage=en`;
    try {
      const { city } = await getCityLocation(getLocation);

      const currentFavorites = await getFavoritesFromLocalStorage();
      const isFavoriteCity = currentFavorites
        ? currentFavorites?.filter((favorite) => favorite.city === city)[0]
        : false;

      setLocation({
        loaded: true,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        city,
        isFavorite: isFavoriteCity ? true : false,
        mainLocation: isFavoriteCity ? isFavoriteCity.mainLocation : false,
        coordinates: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onError = async (error) => {
    const currentFavorites = await getFavoritesFromLocalStorage();
    if (currentFavorites.length) {
      const pinnedFavorite = currentFavorites.filter(
        (favorite) => favorite.mainLocation == true
      )[0];
      getForecastBySearchValue(
        pinnedFavorite ? pinnedFavorite : currentFavorites[0]
      );
    } else {
      setLocation({
        loaded: false,
        error: {
          code: error.code,
          message: error.message,
        },
      });
    }
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};

export default useGeoLocation;
