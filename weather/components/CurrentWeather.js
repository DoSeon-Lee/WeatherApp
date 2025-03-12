import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { THEME } from "../constants/theme";
import { getWeatherIcon } from "../utils/weatherIcons";

const CurrentWeather = ({ weatherData }) => (
  <View style={styles.currentWeather}>
    <View style={styles.currentWeatherTop}>
      {getWeatherIcon(weatherData.weather, 80)}
      <Text style={styles.currentTemp}>{Math.round(weatherData.temp)}°</Text>
    </View>

    {/* Weather description */}
    <Text style={styles.currentDescription}>{weatherData.description}</Text>

    {/* Weather details */}
    <View style={styles.currentWeatherDetails}>
      <View style={styles.weatherDetail}>
        <Ionicons name="water-outline" size={16} color={THEME.primary} />
        <Text style={styles.weatherDetailText}>
          Humidity: {weatherData.humidity}%
        </Text>
      </View>

      <View style={styles.weatherDetail}>
        <FontAwesome5 name="temperature-low" size={16} color={THEME.primary} />
        <Text style={styles.weatherDetailText}>
          Feels like: {Math.round(weatherData.feels_like)}°
        </Text>
      </View>

      {weatherData.wind_speed > 0 && (
        <View style={styles.weatherDetail}>
          <FontAwesome5 name="wind" size={16} color={THEME.primary} />
          <Text style={styles.weatherDetailText}>
            Wind: {weatherData.wind_speed} m/s
          </Text>
        </View>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  currentWeather: {
    alignItems: "center",
    marginBottom: 30,
  },

  // Weather icon & temperature
  currentWeatherTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  currentTemp: {
    fontSize: 70,
    fontWeight: "bold",
    color: THEME.text,
    marginLeft: 20,
  },
  currentDescription: {
    fontSize: 20,
    color: THEME.secondary,
    marginBottom: 15,
    textTransform: "capitalize",
  },

  // Weather details
  currentWeatherDetails: {
    width: "100%",
    marginTop: 10,
  },
  weatherDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    justifyContent: "center",
  },
  weatherDetailText: {
    marginLeft: 8,
    color: THEME.text,
    fontSize: 16,
  },
});

export default CurrentWeather;
