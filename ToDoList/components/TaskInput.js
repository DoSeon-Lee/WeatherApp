import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from "react-native";

const TaskInput = ({
  activeTab,
  task,
  onChangeText,
  onSubmitEditing,
  onAddPress,
  isEditing,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={
          activeTab === "todo" ? "Add a new task..." : "Add a new schedule..."
        }
        placeholderTextColor="#808080"
        value={task}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        returnKeyType="next"
        keyboardAppearance="dark"
      />
      <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
        <Text style={styles.addButtonText}>{isEditing ? "Edit" : "+"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#242423",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#242423",
    marginRight: 10,
    color: "#eee",
  },
  addButton: {
    backgroundColor: "#242423",
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#808080",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TaskInput;
