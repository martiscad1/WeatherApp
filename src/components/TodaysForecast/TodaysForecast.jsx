import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import weatherCodesMeaning from "../../weatherCodes";
import "./TodaysForecast.css";

const TodaysForecast = ({
  city,
  temperature,
  weathercode,
  latitude,
  longitude,
  timezone,
  isFavorite,
  tempUnit,
  isDay,
}) => {
  const { location, setExistingFavorites } = useContext(AppContext);
  const [hideFavoriteButton, setHideFavoriteButton] = useState(isFavorite);

  const handleAddFavorite = async () => {
    const currentCity = {
      latitude,
      longitude,
      timezone,
      city,
      isFavorite: true,
      mainLocation: false,
    };
    setHideFavoriteButton(true);
    let currentFavorite = await JSON.parse(localStorage.getItem("Favorite"));
    if (!currentFavorite) currentFavorite = [];
    currentFavorite = [currentCity, ...currentFavorite];
    setExistingFavorites(() => currentFavorite);
    window.localStorage.setItem("Favorite", JSON.stringify(currentFavorite));
  };

  useEffect(() => {
    setHideFavoriteButton(isFavorite);
  }, [isFavorite, location]);

  return (
    <div className="CurrentHourForecast">
      <div className="Flex AlignItemsCenter">
        <img
          src={`/icons/animated/${isDay ? weathercode + 100 : weathercode}.svg`}
          alt=""
          className="WeatherIcon"
        />
        <div className="JucstifyContentCenter">
          <div className="CurrentTemperature">
            {Math.round(temperature)}
            {tempUnit}
          </div>
        </div>
      </div>
      <div>{weatherCodesMeaning[weathercode]}</div>
      <div>
        <h1 className="CurrentCity">
          {city}
          {!hideFavoriteButton && (
            <button onClick={handleAddFavorite} className="SetFavoriteButton">
              <svg
                className="Icon"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  className="Icon"
                  fill="currentColor"
                  d="M12 2c3.9 0 7 3.1 7 7c0 5.2-7 13-7 13S5 14.2 5 9c0-3.9 3.1-7 7-7m0 2C9.2 4 7 6.2 7 9c0 1 0 3 5 9.7C17 12 17 10 17 9c0-2.8-2.2-5-5-5m0 7.5l2.4 1.5l-.6-2.8L16 8.3l-2.9-.2L12 5.4L10.9 8L8 8.3l2.2 1.9l-.7 2.8l2.5-1.5Z"
                />
              </svg>
            </button>
          )}
        </h1>
      </div>
    </div>
  );
};

export default TodaysForecast;
