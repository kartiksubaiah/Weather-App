import fetch from "node-fetch"; // Import fetch for API requests

export default async function handler(req, res) {
  const { location } = req.query; // Get the city name from query parameters
  const API_KEY = process.env.OPENWEATHER_API_KEY; // API Key from environment variables

  if (!location) {
    res.status(400).json({ error: "Location query parameter is required" });
    return;
  }

  // OpenWeatherMap API base URL
  const baseUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  try {
    // Fetch data from OpenWeatherMap
    const response = await fetch(`${baseUrl}${location}&appid=${API_KEY}`);
    const data = await response.json();

    if (response.status === 200) {
      res.status(200).json(data); // Send the weather data as JSON to the frontend
    } else {
      res.status(response.status).json({ error: "City not found" }); // Handle errors
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch weather data", details: error.message });
  }
}
