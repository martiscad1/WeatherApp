import React from "react";

const HourForecast = ({
  hour,
  temperature,
  icon,
  description,
  humidity,
  tempUnit,
}) => {
  return (
    <div className="HourlyForecast">
      <div className="GridItemCenter">
        {new Date(hour).getHours().toString().padStart(2, "0")}:00
      </div>
      <div className="GridItemCenter">
        {Math.round(temperature)}
        {tempUnit}
      </div>
      <img
        src={`/icons/animated/${icon}.svg`}
        alt=""
        className="HourlyForecastIcon"
      />
      {/* <div className="GridItemCenter">{description}</div> */}
      <div className="GridItemCenter Flex AlignItemsCenter">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 21.5q-3.325 0-5.663-2.3T4 13.6q0-1.575.613-3.012T6.35 8.05L12 2.5l5.65 5.55q1.125 1.1 1.738 2.538T20 13.6q0 3.3-2.337 5.6T12 21.5Z"
          />
        </svg>
        {humidity}%
      </div>
    </div>
  );
};

export default HourForecast;
