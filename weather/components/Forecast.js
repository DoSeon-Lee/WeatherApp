import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { THEME } from "../constants/theme";
import { getWeatherIcon } from "../utils/weatherIcons";

// Get day name
const getDay = (date) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
};

// Format date
const formatDate = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
};

// ForecastItem component
const ForecastItem = ({ day }) => (
  <View style={styles.forecastItem}>
    <View style={styles.forecastDay}>
      <Text style={styles.forecastDayText}>
        {formatDate(day.date)} ({getDay(day.date)})
      </Text>
    </View>

    <View style={styles.forecastInfo}>{getWeatherIcon(day.weather, 30)}</View>

    <View style={styles.forecastMinMax}>
      <Text style={styles.forecastMinMaxText}>
        {Math.round(day.temp_min)}° / {Math.round(day.temp_max)}°
      </Text>
    </View>
  </View>
);

// Forecast component
const Forecast = ({ days }) => (
  <View style={styles.forecastContainer}>
    <ScrollView
      showsVerticalScrollIndicator={false} // 스크롤 바 숨김
      contentContainerStyle={styles.forecastList}
    >
      {days.map((day, index) => (
        <ForecastItem key={index} day={day} /> // 예보 날짜 반복
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  forecastContainer: {
    flex: 1,
  },

  // Forecast list
  forecastList: {
    paddingBottom: 10,
  },

  // Forecast item
  forecastItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: THEME.card,
  },

  // Date
  forecastDay: {
    flex: 2,
  },
  forecastDayText: {
    fontSize: 16,
    color: THEME.text,
  },

  // Weather icon & temperature
  forecastInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  forecastTemp: {
    fontSize: 18,
    fontWeight: "500",
    color: THEME.text,
    marginLeft: 10,
  },

  // Min/Max temperature
  forecastMinMax: {
    flex: 1,
    alignItems: "flex-end",
  },
  forecastMinMaxText: {
    fontSize: 14,
    color: THEME.secondary,
  },
});

export default Forecast;
