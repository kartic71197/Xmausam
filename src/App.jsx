import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "7a9acab2c2f848419ad60043253004"; 

  const handleSearch = async () => {
    if (!city) return;

    setLoading(true);
    setWeatherData(null);

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );

      if (!res.ok) {
        throw new Error("City not found");
      }

      const data = await res.json();
      setWeatherData(data);
    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading data...</p>}

      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <strong>Temperature:</strong> {weatherData.current.temp_c} °C
          </div>
          <div className="weather-card">
            <strong>Humidity:</strong> {weatherData.current.humidity}%
          </div>
          <div className="weather-card">
            <strong>Condition:</strong> {weatherData.current.condition.text}
          </div>
          <div className="weather-card">
            <strong>Wind Speed:</strong> {weatherData.current.wind_kph} kph
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
