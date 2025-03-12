import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../constants/theme";

const ErrorDisplay = ({ message }) => (
  <View style={styles.error}>
    <Text style={styles.errorText}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  error: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: THEME.text,
    fontSize: 18,
  },
});

export default ErrorDisplay;
