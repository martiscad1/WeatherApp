import weatherCodesMeaning from "../../weatherCodes";
import HourForecast from "./HourForecast";
import "./HourlyForecast.css";
const HourlyForecast = ({ hourly, current_weather, tempUnit }) => {
  const {
    time: hours,
    weathercode,
    temperature_2m: temperature,
    relativehumidity_2m: humidity,
    is_day: isDay,
  } = hourly;

  const { time: currentTime } = current_weather;
  const todaysHours = [...hours]; // spred operator
  const startingIndex = hours.indexOf(currentTime) + 1;
  const nrOfResults = 24;

  const todaysWeatherCodes = [...weathercode];
  const todaysTemperature = [...temperature];
  const todaysHumidity = [...humidity];
  const todaysIsDay = [...isDay];
  const next24Temperatures = todaysTemperature.splice(
    startingIndex,
    nrOfResults
  );
  const next24Humidity = todaysHumidity.splice(startingIndex, nrOfResults);
  const next24Hours = todaysHours.splice(startingIndex, nrOfResults);
  const next24IsDay = todaysIsDay.splice(startingIndex, nrOfResults);
  const next24WeatherCodes = todaysWeatherCodes.splice(
    startingIndex,
    nrOfResults
  );

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1424,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <div className="HourlyForecastSection">
      <div className="HourlyForecastContent">
        <div className="HourlyForecastWrapper">
          {next24Hours.map((hour, index) => (
            <HourForecast
              key={index}
              hour={hour}
              temperature={next24Temperatures[index]}
              icon={
                next24IsDay[index]
                  ? next24WeatherCodes[index] + 100
                  : next24WeatherCodes[index]
              }
              description={weatherCodesMeaning[next24WeatherCodes[index]]}
              humidity={next24Humidity[index]}
              isDay={isDay}
              tempUnit={tempUnit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;
