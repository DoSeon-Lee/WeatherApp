import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../constants/theme";

// 현재 시간 포맷팅
const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const Header = ({ city }) => (
  <View style={styles.header}>
    <Text style={styles.city}>{city}</Text>
    <Text style={styles.updateTime}>Updated: {getCurrentTime()}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  city: {
    color: THEME.text,
    fontSize: 28,
    fontWeight: "600",
  },
  updateTime: {
    color: THEME.secondary,
    fontSize: 14,
    marginTop: 5,
  },
});

export default Header;
