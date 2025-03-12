import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { THEME } from "../constants/theme";

const Loading = () => {
  // animation value 관리
  const [rotation] = useState(new Animated.Value(0));
  const [bounceValue] = useState(new Animated.Value(0));

  // Animation effect
  useEffect(() => {
    // Rotation animation for the sun icon
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Bounce animation for the cloud icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Interpolate rotation value to rotate the sun
  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // Interpolate bounce value for the cloud
  const bounce = bounceValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  return (
    <View style={styles.loading}>
      <View style={styles.iconContainer}>
        {/* Sun icon with rotation animation */}
        <Animated.View
          style={{ transform: [{ rotate: spin }], marginRight: -15, zIndex: 1 }}
        >
          <FontAwesome5 name="sun" size={60} color="#FFB300" />
        </Animated.View>

        {/* Cloud icon with bounce animation */}
        <Animated.View style={{ transform: [{ translateY: bounce }] }}>
          <MaterialCommunityIcons name="cloud" size={80} color="#78909C" />
        </Animated.View>
      </View>

      {/* Loading indicator */}
      <ActivityIndicator
        size="large"
        color={THEME.primary}
        style={styles.indicator}
      />
      <Text style={styles.loadingText}>Fetching Weather Info...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  indicator: {
    marginTop: 20,
  },
  loadingText: {
    color: THEME.text,
    fontSize: 18,
    marginTop: 10,
  },
});

export default Loading;
