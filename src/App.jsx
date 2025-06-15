import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function App() {
  const [city, setCity] = useState("Mumbai");
  const [forecastData, setForecastData] = useState([]);
  const [displayCity, setDisplayCity] = useState("");
  const [currentAQI, setCurrentAQI] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAQILevel = (value) => {
    if (value <= 50) return { level: "Good", color: "bg-green-500", description: "Air quality is satisfactory, and air pollution poses little or no risk." };
    if (value <= 100) return { level: "Moderate", color: "bg-yellow-400", description: "Air quality is acceptable; some pollutants may be a concern for a small number of sensitive people." };
    if (value <= 150) return { level: "Unhealthy for Sensitive Groups", color: "bg-orange-400", description: "Members of sensitive groups may experience health effects. The general public is less likely to be affected." };
    if (value <= 200) return { level: "Unhealthy", color: "bg-red-500", description: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious effects." };
    if (value <= 300) return { level: "Very Unhealthy", color: "bg-purple-600", description: "Health alert: everyone may experience more serious health effects." };
    return { level: "Hazardous", color: "bg-maroon-700", description: "Health warnings of emergency conditions. The entire population is more likely to be affected." };
  };

  const handleFetch = async () => {
    if (!city.trim()) {
      setForecastData([]);
      setDisplayCity("");
      setCurrentAQI(null);
      return;
    }

    setLoading(true);
    try {
      const geoRes = await fetch(
        `https://geocode.maps.co/search?q=${encodeURIComponent(city)}&format=json`
      );
      const geoJson = await geoRes.json();

      if (!geoJson[0]) throw new Error("City not found");

      const lat = geoJson[0].lat;
      const lon = geoJson[0].lon;
      const resolvedCity = geoJson[0].display_name.split(",")[0];
      setDisplayCity(resolvedCity);

      const airRes = await fetch(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5`
      );
      const airJson = await airRes.json();

      const time = airJson.hourly.time;
      const pm25 = airJson.hourly.pm2_5;
      const pm10 = airJson.hourly.pm10;

      const chartData = time.slice(0, 24).map((t, idx) => ({
        time: new Date(t).toLocaleString("en-IN", {
          weekday: "short",
          hour: "2-digit",
          hour12: true,
        }),
        pm25: pm25[idx],
        pm10: pm10[idx],
      }));

      setForecastData(chartData);
      setCurrentAQI(pm25[0]); // set first hour's PM2.5 as current AQI value

    } catch (err) {
      console.error("Error:", err);
      setForecastData([]);
      setDisplayCity("");
      setCurrentAQI(null);
    }
    setLoading(false);
  };

  const currentAQIData = currentAQI !== null ? getAQILevel(currentAQI) : null;

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Air Quality Forecast</h1>
        </div>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 border px-4 py-2 rounded shadow-md"
            placeholder="Enter city name"
          />
          <button
            onClick={handleFetch}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700"
          >
            Check Forecast
          </button>
        </div>

        {/* Live AQI Section */}
        {!loading && currentAQIData && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Live Air Quality in {displayCity}</h2>
            <div className="flex items-center gap-4">
              <span
                className={`text-white text-sm font-bold px-3 py-1 rounded-full ${currentAQIData.color}`}
              >
                {currentAQIData.level}
              </span>
              <span className="text-gray-700 text-sm">
                PM2.5: {currentAQI} µg/m³ — {currentAQIData.description}
              </span>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : forecastData.length > 0 && displayCity ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Hourly PM2.5 and PM10 Forecast for {displayCity}
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" interval={2} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pm25"
                  stroke="#8884d8"
                  name="PM2.5"
                />
                <Line
                  type="monotone"
                  dataKey="pm10"
                  stroke="#82ca9d"
                  name="PM10"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
