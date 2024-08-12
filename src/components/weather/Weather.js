import React, { useState } from "react";
import { getWeather } from "../../services/weatherService";
import "./Weather.css"
const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  

  const handleSubmit = (event) => {
    event.preventDefault();
    getWeather(city)
        .then(result => {
        console.log(result)
        setWeatherData(result);
    })
    
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          name="city"
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <div className="data">
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: { Math.ceil(Number(weatherData.main.temp) -273.15)} °C</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
