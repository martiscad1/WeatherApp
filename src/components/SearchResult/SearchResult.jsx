import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import "./SearchResult.css";

const SearchResult = ({
  city,
  latitude,
  longitude,
  timezone,
  country_code,
}) => {
  const {
    getForecastBySearchValue,
    setCityResults,
    setSearch,
    setIsLoading,
    tempUnit,
  } = useContext(AppContext);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const currentFavorites = await JSON.parse(
        localStorage.getItem("Favorite")
      );

      let isFavoriteCity;
      if (currentFavorites?.length) {
        isFavoriteCity = currentFavorites.filter(
          (favorite) => favorite.city === city
        )[0];
      }
      const selectedCity = {
        tempUnit,
        latitude,
        longitude,
        timezone,
        city,
        isFavorite: isFavoriteCity ? true : false,
        mainLocation: isFavoriteCity ? isFavoriteCity.mainLocation : false,
      };

      getForecastBySearchValue(selectedCity);
      setCityResults(() => null);
      setSearch("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="SearchResult" onClick={handleClick}>
      <span>{`${city}, ${country_code}`}</span>
    </div>
  );
};

export default SearchResult;
