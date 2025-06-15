# 🌫️ Air Quality Forecast Dashboard

This is a React-based web application that allows users to monitor air quality levels (PM2.5 and PM10) for any city in India. It fetches real-time air quality data and displays a 24-hour forecast in a responsive line chart.

The project integrates with AWS Lambda for live air quality metrics and uses Open-Meteo for forecast data. The interface is built with Tailwind CSS and Recharts for a clean and interactive user experience.

---

## ⚙️ Features

- 🔍 Search any city in India for real-time air quality data.
- 📈 View 24-hour forecast for PM2.5 and PM10 particles.
- 🌐 Responsive and clean UI built with Tailwind CSS.
- 📡 Integrated with AWS Lambda for live AQI metrics.
- 📊 Chart visualizations powered by Recharts.
- 🗺️ Automatic city-to-coordinates conversion via geocoding.

---

## 🛠 Tech Stack

- React.js
- Tailwind CSS
- Recharts
- AWS Lambda
- Open-Meteo API
- Maps.co (Geocoding API)

---

## 📸 Screenshot

![Air Quality Forecast Dashboard](./assets/screenshot.png)

_This dashboard displays real-time PM2.5 and PM10 levels for any city across India, along with a 24-hour forecast chart using Open-Meteo data._

---

## 🔗 APIs Used

- 🔹 [AWS Lambda (Custom)] – Used to fetch live PM2.5 and PM10 values.
- 🔹 [Open-Meteo Air Quality API](https://open-meteo.com/) – Used for hourly PM2.5 and PM10 forecast.
- 🔹 [Maps.co Geocoding API](https://geocode.maps.co/) – Converts city names to latitude and longitude.

---

## 🧠 How It Works

1. Enter any Indian city in the input field.
2. The app uses Maps.co API to convert the city name to geographic coordinates.
3. Those coordinates are used to:
   - Fetch current PM2.5 and PM10 values via AWS Lambda.
   - Fetch 24-hour forecast via Open-Meteo.
4. All results are displayed visually with live chart updates.

---

## ✨ Future Enhancements

- Historical AQI data tracking.
- Weekly or monthly forecast option.
- Mobile app version.
- Health advisory tips based on AQI levels.

---

## 👨‍💻 Author

Developed by [Atharv Chawan](https://www.linkedin.com/in/atharv-chawan-ab01152a7/)

---

