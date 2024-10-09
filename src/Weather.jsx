import React, { useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  const getWeather = () => {
    setLoading(true);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?appid=15ca787f2d191cf1f09525804a2ce85d&q=${city}`
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
        setLoading(false);
      });
  };

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
          {forecast.map((day, index) => (
            <div className="box" key={index}>
              <table className="day-forecast">
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
                <tr>
                  <td>{day.main.temp_min}°C</td>
                  <td>{day.main.temp_max}</td>
                </tr>
                <tr>
                  <td>Pressure</td>
                  <td>{day.main.pressure} hPa</td>
                </tr>
                <tr>
                  <td>Humidity</td>
                  <td>{day.main.humidity} hPa</td>
                </tr>
              </table>
            </div>
            //   <div key={index} className="day-forecast">
            //     <h3>Date: {new Date(day.dt_txt).toLocaleDateString()}</h3>
            //     <p>
            //       Temperature (min-max): {day.main.temp_min}°C - {day.main.temp_max}
            //       °C
            //     </p>
            //     <p>Pressure: {day.main.pressure} hPa</p>
            //     <p>Humidity: {day.main.humidity}%</p>
            //   </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Weather;
