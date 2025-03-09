import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Header = ({ activeTab, onTodoPress, onSchedulePress }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onTodoPress}>
        <Text
          style={[
            styles.title,
            { color: activeTab === "todo" ? "#eee" : "#808080" },
          ]}
        >
          To Do
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSchedulePress}>
        <Text
          style={[
            styles.title,
            { color: activeTab === "schedule" ? "#eee" : "#808080" },
          ]}
        >
          Schedule
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Header;
