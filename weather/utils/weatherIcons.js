import React from "react";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { THEME } from "../constants/theme";

// 날씨 아이콘 Map
export const weatherIcons = {
  Clear: {
    icon: (size) => <FontAwesome5 name="sun" size={size} color="#FFB300" />,
    gradient: ["#FFB300", "#FFF176"],
    background: "#FFB300",
  },
  Clouds: {
    icon: (size) => <FontAwesome5 name="cloud" size={size} color="#78909C" />,
    gradient: ["#78909C", "#B0BEC5"],
    background: "#78909C",
  },
  Rain: {
    icon: (size) => (
      <FontAwesome5 name="cloud-rain" size={size} color="#4FC3F7" />
    ),
    gradient: ["#4FC3F7", "#B3E5FC"],
    background: "#4FC3F7",
  },
  Drizzle: {
    icon: (size) => (
      <FontAwesome5 name="cloud-rain" size={size} color="#4FC3F7" />
    ),
    gradient: ["#4FC3F7", "#B3E5FC"],
    background: "#4FC3F7",
  },
  Thunderstorm: {
    icon: (size) => <FontAwesome5 name="bolt" size={size} color="#FFD600" />,
    gradient: ["#FFD600", "#FFF59D"],
    background: "#FFD600",
  },
  Snow: {
    icon: (size) => (
      <FontAwesome5 name="snowflake" size={size} color="#E1F5FE" />
    ),
    gradient: ["#E1F5FE", "#FFFFFF"],
    background: "#E1F5FE",
  },
  Mist: {
    icon: (size) => (
      <MaterialCommunityIcons name="weather-fog" size={size} color="#B0BEC5" />
    ),
    gradient: ["#B0BEC5", "#CFD8DC"],
    background: "#B0BEC5",
  },
  Smoke: {
    icon: (size) => (
      <MaterialCommunityIcons name="weather-fog" size={size} color="#B0BEC5" />
    ),
    gradient: ["#B0BEC5", "#CFD8DC"],
    background: "#B0BEC5",
  },
  Haze: {
    icon: (size) => (
      <MaterialCommunityIcons name="weather-hazy" size={size} color="#B0BEC5" />
    ),
    gradient: ["#B0BEC5", "#CFD8DC"],
    background: "#B0BEC5",
  },
  Dust: {
    icon: (size) => (
      <MaterialCommunityIcons
        name="weather-windy"
        size={size}
        color="#B0BEC5"
      />
    ),
    gradient: ["#B0BEC5", "#CFD8DC"],
    background: "#B0BEC5",
  },
  Fog: {
    icon: (size) => (
      <MaterialCommunityIcons name="weather-fog" size={size} color="#B0BEC5" />
    ),
    gradient: ["#B0BEC5", "#CFD8DC"],
    background: "#B0BEC5",
  },
  Sand: {
    icon: (size) => (
      <MaterialCommunityIcons
        name="weather-windy"
        size={size}
        color="#FFD54F"
      />
    ),
    gradient: ["#FFD54F", "#FFECB3"],
    background: "#FFD54F",
  },
  Ash: {
    icon: (size) => (
      <MaterialCommunityIcons
        name="weather-windy"
        size={size}
        color="#757575"
      />
    ),
    gradient: ["#757575", "#BDBDBD"],
    background: "#757575",
  },
  Squall: {
    icon: (size) => (
      <MaterialCommunityIcons
        name="weather-windy"
        size={size}
        color="#4FC3F7"
      />
    ),
    gradient: ["#4FC3F7", "#B3E5FC"],
    background: "#4FC3F7",
  },
  Tornado: {
    icon: (size) => (
      <MaterialCommunityIcons
        name="weather-tornado"
        size={size}
        color="#757575"
      />
    ),
    gradient: ["#757575", "#BDBDBD"],
    background: "#757575",
  },
};

// 기본 아이콘 (날씨 정보가 없을 때)
export const defaultWeatherIcon = {
  icon: (size) => (
    <FontAwesome5 name="cloud-sun" size={size} color={THEME.primary} />
  ),
  gradient: [THEME.primary, THEME.background],
  background: THEME.primary,
};

// 날씨 아이콘 가져오기
export const getWeatherIcon = (weather, size = 50) => {
  const iconData = weatherIcons[weather] || defaultWeatherIcon;
  return iconData.icon(size);
};
