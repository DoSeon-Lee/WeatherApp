import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import CategorySelector from "./CategorySelector";
import PrioritySelector from "./PrioritySelector";
import DateSelector from "./DateSelector";

const TaskModal = ({
  visible,
  onRequestClose,
  editIndex,
  activeTab,
  task,
  onChangeTask,
  dueDate,
  showDatePicker,
  onDatePress,
  onDateChange,
  categories,
  category,
  onSelectCategory,
  showAddCategory,
  onToggleAddCategory,
  newCategory,
  onChangeNewCategory,
  onAddCategory,
  onDeleteCategory,
  defaultCategories,
  priorities,
  priority,
  onSelectPriority,
  getPriorityColor,
  memo,
  onChangeMemo,
  onCancel,
  onSave,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {editIndex !== -1
              ? "Edit Task"
              : activeTab === "todo"
              ? "New Task"
              : "New Schedule"}
          </Text>

          <ScrollView style={styles.modalScroll}>
            <Text style={styles.label}>Task</Text>
            <TextInput
              style={styles.modalInput}
              value={task}
              onChangeText={onChangeTask}
              placeholderTextColor="#808080"
              keyboardAppearance="dark"
            />

            <DateSelector
              dueDate={dueDate}
              showDatePicker={showDatePicker}
              onDatePress={onDatePress}
              onDateChange={onDateChange}
            />

            <CategorySelector
              categories={categories}
              selectedCategory={category}
              onSelectCategory={onSelectCategory}
              showAddCategory={showAddCategory}
              onToggleAddCategory={onToggleAddCategory}
              newCategory={newCategory}
              onChangeNewCategory={onChangeNewCategory}
              onAddCategory={onAddCategory}
              onDeleteCategory={onDeleteCategory}
              defaultCategories={defaultCategories}
            />

            <PrioritySelector
              priorities={priorities}
              selectedPriority={priority}
              onSelectPriority={onSelectPriority}
              getPriorityColor={getPriorityColor}
            />

            <Text style={styles.label}>Memo</Text>
            <TextInput
              style={[styles.modalInput, styles.memoInput]}
              value={memo}
              onChangeText={onChangeMemo}
              placeholder="Memo..."
              placeholderTextColor="#808080"
              multiline={true}
              numberOfLines={4}
              keyboardAppearance="dark"
            />
          </ScrollView>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.saveButton]}
              onPress={onSave}
            >
              <Text style={styles.modalButtonText}>
                {editIndex !== -1 ? "Edit" : "Add"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#242423",
    borderRadius: 15,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#eee",
    textAlign: "center",
  },
  modalScroll: {
    maxHeight: 400,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    color: "#eee",
  },
  modalInput: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 12,
    color: "#eee",
    marginBottom: 10,
  },
  memoInput: {
    height: 100,
    textAlignVertical: "top",
  },

  // Modal Buttons
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#444",
  },
  saveButton: {
    backgroundColor: "#5E60CE",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default TaskModal;
