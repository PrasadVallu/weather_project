import React, { useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = () => {
    setLoading(true);
    setError("");
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?appid=1635890035cbba097fd5c26c8ea672a1&q=${city}`
      )
      .then((response) => {
        const dailyData = response.data.list.filter(
          (reading, index) => index % 8 === 0
        );
        setForecast(dailyData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data. Please check the city name.");
        setLoading(false);
      });
  };

  const convertKelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);

  return (
    <div className="outer">
      <div className="container">
        <div className="search">
          <h1>Weather in your city</h1>
          <div className="d-flex">
            <input
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={getWeather}>Search</button>
            {loading && <div className="loader">Loading...</div>}
          </div>
          <div></div>
          
        </div>

        <div className="weather-forecast">
        {error && <div className="error-message">{error}</div>}
          {forecast.map((day, index) => (
            <div className="box" key={index}>
              <table className="day-forecast">
                <thead>
                  <tr>
                    <th colSpan={2}>
                      Date: {new Date(day.dt_txt).toLocaleDateString()}
                    </th>
                  </tr>
                  <tr className="bg-gray">
                    <td colSpan={2}>Temperature</td>
                  </tr>
                  <tr className="bg-gray">
                    <td>Min</td>
                    <td>Max</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{convertKelvinToCelsius(day.main.temp_min)}°C</td>
                    <td>{convertKelvinToCelsius(day.main.temp_max)}°C</td>
                  </tr>
                  <tr>
                    <td>Pressure</td>
                    <td>{day.main.pressure} hPa</td>
                  </tr>
                  <tr>
                    <td>Humidity</td>
                    <td>{day.main.humidity}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Weather;
