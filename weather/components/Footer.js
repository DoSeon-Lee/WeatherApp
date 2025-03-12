import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../constants/theme";

const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>OpenWeatherMap API provided</Text>
  </View>
);

const styles = StyleSheet.create({
  footer: {
    marginTop: 20,
    alignItems: "center",
    paddingBottom: 10,
  },
  footerText: {
    fontSize: 12,
    color: THEME.secondary,
  },
});

export default Footer;
