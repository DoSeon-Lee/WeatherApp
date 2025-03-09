import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateSelector = ({
  dueDate,
  showDatePicker,
  onDatePress,
  onDateChange,
}) => {
  return (
    <>
      <Text style={styles.label}>Due Date</Text>
      <TouchableOpacity style={styles.dateButton} onPress={onDatePress}>
        <Text style={styles.dateButtonText}>
          {dueDate ? dueDate.toLocaleDateString() : "Select Due Date"}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dueDate || new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={new Date()}
        />
      )}
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
  dateButton: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  dateButtonText: {
    color: "#eee",
  },
});

export default DateSelector;
