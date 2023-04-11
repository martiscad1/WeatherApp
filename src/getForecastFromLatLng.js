import axios from "axios";

const forecastUrl = "https://api.open-meteo.com/v1/forecast";
const getForecastFromLatLng = async ({
  latitude,
  longitude,
  timezone,
  tempUnit,
}) => {
  const response = await axios.get(forecastUrl, {
    params: {
      latitude,
      longitude,
      timezone,
      temperature_unit: tempUnit,
      hourly: [
        "temperature_2m",
        "precipitation_probability",
        "precipitation",
        "weathercode",
        "windspeed_10m",
        "relativehumidity_2m",
        "is_day",
      ],
      daily: ["weathercode", "temperature_2m_max", "temperature_2m_min"],
      current_weather: true,
      forecast_days: 7,
    },
  });

  return response.data;
};

export default getForecastFromLatLng;
