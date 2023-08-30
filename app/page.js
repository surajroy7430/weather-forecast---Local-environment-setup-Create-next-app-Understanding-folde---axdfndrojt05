'use client'
import React, { useState } from 'react';

const WeatherForecast = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [forecastData, setForecastData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`);
      const data = await res.json();
      const timeseries = data.properties.timeseries.slice(0, 30);
      setForecastData(timeseries);
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  return (
    <div id="root">
      <h1>Weather Forecast</h1>
      <form onSubmit={handleSubmit}>
        <label>Latitude: 
        <input 
          type='text' 
          className='latitude' 
          value={latitude} 
          onChange={(e) => setLatitude(e.target.value)}
        />
        </label>
        <label>Longitude: 
          <input 
            type='text' 
            className='longitude' 
            value={longitude} 
            onChange={(e) => setLongitude(e.target.value)}
          />
        </label>
        <button type='submit'>Get Forecast</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Temperature (°C)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecastData.map((forecast) => (
            <tr key={forecast.time}>
              <td>{new Date(forecast.time).toLocaleString()}</td>
              <td>{forecast.data.instant.details.air_temperature.toFixed(1)}</td>
              <td>{forecast.data.next_1_hours.summary.symbol_code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};

export default WeatherForecast;
