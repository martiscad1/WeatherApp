import axios from "axios";
import { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import useDebounce from "../../hooks/useDebounce";
import SearchResult from "../SearchResult/SearchResult";
import "../SearchResult/SearchResult.css";

const SearchLocation = () => {
  const {
    setCityResults,
    setSearch,
    search,
    cityResults,
    setExistingFavorites,
  } = useContext(AppContext);

  const debouncedValue = useDebounce(search);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setExistingFavorites(JSON.parse(window.localStorage.getItem("Favorite")));
  }, []);

  const getLocationResults = async (searchValue) => {
    try {
      if (searchValue) {
        const geolocationUrl = "https://geocoding-api.open-meteo.com/v1/search";
        const res = await axios.get(geolocationUrl, {
          params: {
            name: searchValue,
            language: "en",
            count: 10,
            format: "json",
          },
        });

        setCityResults(res.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocationResults(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="SearchLocationContainer">
      <input
        onChange={handleChange}
        type="text"
        name="search-location"
        id="search-location"
        placeholder="Search location"
        value={search}
        className="SearchLocationInput"
      />
      <div className="SearchResults">
        {cityResults?.length &&
          cityResults.map((result) => {
            const { name, latitude, longitude, timezone, country_code } =
              result;
            return (
              <SearchResult
                key={result.id}
                city={name}
                latitude={latitude}
                longitude={longitude}
                timezone={timezone}
                country_code={country_code}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SearchLocation;
