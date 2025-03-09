import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const PrioritySelector = ({
  priorities,
  selectedPriority,
  onSelectPriority,
  getPriorityColor,
}) => {
  return (
    <>
      <Text style={styles.label}>Priority</Text>
      <View style={styles.priorityContainer}>
        {priorities.map((pri) => (
          <TouchableOpacity
            key={pri}
            style={[
              styles.priorityButton,
              selectedPriority === pri && {
                backgroundColor: getPriorityColor(pri),
              },
            ]}
            onPress={() => onSelectPriority(pri)}
          >
            <Text
              style={[
                styles.priorityButtonText,
                selectedPriority === pri && styles.priorityButtonTextSelected,
              ]}
            >
              {pri}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    color: "#eee",
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  priorityButton: {
    flex: 1,
    backgroundColor: "#333",
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  priorityButtonText: {
    color: "#eee",
  },
  priorityButtonTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PrioritySelector;
