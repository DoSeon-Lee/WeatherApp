// OpenWeatherMap API Key
export const API_KEY = "32b3cfc5f46d3239049a02586c9c8f84";

// API Endpoint
export const WEATHER_API = {
  CURRENT: (lat, lon) =>
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  FORECAST: (lat, lon) =>
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
};
