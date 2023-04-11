import React, { useContext, useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";
import Menu from "./components/Menu/Menu";
import { default as Spinner } from "./components/Spinner/Spinner";
import TodaysForecast from "./components/TodaysForecast/TodaysForecast";
import WeeklyForecast from "./components/WeeklyForecast/WeeklyForecast";
import AppContext from "./context/AppContext";
import getForecastFromLatLng from "./getForecastFromLatLng";
import useGeoLocation from "./hooks/useGeoLocation";

function App() {
  const { forecast, location, setLocation, setForecast, isLoading } =
    useContext(AppContext);

  let geoLocation = useGeoLocation();

  // const geolocationUrl = "https://geocoding-api.open-meteo.com/v1/search?";
  // const forecastUrl = "https://api.open-meteo.com/v1/forecast";

  const getForecast = async () => {
    try {
      if (geoLocation.loaded) {
        const { longitude, latitude } = geoLocation.coordinates;
        const { timezone, city, isFavorite } = geoLocation;
        setLocation({ latitude, longitude, timezone, city, isFavorite });
        const forecast = await getForecastFromLatLng({
          longitude,
          latitude,
          timezone,
        });

        setForecast(forecast);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getForecast();
  }, [geoLocation.loaded]);

  let selectedTempUnit;
  if (forecast) {
    selectedTempUnit = forecast.hourly_units.temperature_2m;
  }

  return (
    <div className="App">
      <Menu />

      <div className="Wrapper">
        {!isLoading && forecast ? (
          <>
            <div className="TodaysForecast">
              <TodaysForecast
                city={location.city}
                longitude={location.longitude}
                latitude={location.latitude}
                timezone={location.timezone}
                isFavorite={location.isFavorite}
                temperature={forecast?.current_weather?.temperature}
                weathercode={forecast?.current_weather?.weathercode}
                isDay={forecast?.current_weather?.is_day}
                tempUnit={selectedTempUnit}
              />
              <HourlyForecast {...forecast} tempUnit={selectedTempUnit} />
            </div>
            <WeeklyForecast {...forecast.daily} tempUnit={selectedTempUnit} />
          </>
        ) : (
          <Spinner />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
