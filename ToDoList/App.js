import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SwipeListView } from "react-native-swipe-list-view";
import TodoItem from "./components/TodoItem";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskModal from "./components/TaskModal";
import TaskList from "./components/TaskList";
import { TaskProvider, useTaskContext } from "./contexts/TaskContext";
import CategoryFilter from "./components/CategoryFilter";

// 기본 Category 목록
const DEFAULT_TODO_CATEGORIES = ["Business", "Personal", "Study", "Etc"];
const DEFAULT_SCHEDULE_CATEGORIES = ["Personal", "Shopping", "Study", "Etc"];

// 중요도 목록
const PRIORITIES = ["Low", "Medium", "High"];

// AsyncStorage 키
const TODO_TASKS_KEY = "@todo_tasks";
const SCHEDULE_TASKS_KEY = "@schedule_tasks";
const TODO_CATEGORIES_KEY = "@todo_categories";
const SCHEDULE_CATEGORIES_KEY = "@schedule_categories";

const AppContent = () => {
  const {
    activeTab,
    todoCategories,
    scheduleCategories,
    getActiveTasks,
    getActiveCategories,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    addCategory,
    deleteCategory,
    changeTab,
    DEFAULT_TODO_CATEGORIES,
    DEFAULT_SCHEDULE_CATEGORIES,
  } = useTaskContext();

  const [task, setTask] = useState(""); // input value
  const [editIndex, setEditIndex] = useState(-1); // edit index
  const [modalVisible, setModalVisible] = useState(false); // modal visible
  const [dueDate, setDueDate] = useState(null); // due date
  const [showDatePicker, setShowDatePicker] = useState(false); // date picker
  const [category, setCategory] = useState("Etc"); // category
  const [priority, setPriority] = useState("Low"); // priority
  const [memo, setMemo] = useState(""); // memo
  const [newCategory, setNewCategory] = useState(""); // New Category
  const [showAddCategory, setShowAddCategory] = useState(false); // Add Category

  // reset form
  const resetForm = () => {
    setTask("");
    setDueDate(null);
    setCategory("Etc");
    setPriority("Low");
    setMemo("");
    setEditIndex(-1);
  };

  // modal open
  const handleOpenModal = () => {
    if (task.trim().length === 0) {
      return;
    }
    setModalVisible(true);
  };

  // modal close
  const handleAddTask = () => {
    if (task.trim().length === 0) {
      return;
    }

    const { tasks } = getActiveTasks();

    if (editIndex !== -1) {
      // Edit existing task
      updateTask(tasks[editIndex].id, {
        text: task,
        dueDate: dueDate,
        category: category,
        priority: priority,
        memo: memo,
      });
      setEditIndex(-1);
    } else {
      // Add new task
      addTask({
        text: task,
        dueDate: dueDate,
        category: category,
        priority: priority,
        memo: memo,
      });
    }

    // input form reset
    resetForm();
    setModalVisible(false);
  };

  // list edit
  const handleEditTask = (id) => {
    const { tasks } = getActiveTasks();
    const taskToEdit = tasks.find((item) => item.id === id);
    setTask(taskToEdit.text);
    setDueDate(taskToEdit.dueDate);
    setCategory(taskToEdit.category || "Etc");
    setPriority(taskToEdit.priority || "Low");
    setMemo(taskToEdit.memo || "");
    setEditIndex(tasks.findIndex((item) => item.id === id));
    setModalVisible(true);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  // priority에 따른 color 반환
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "#FF6B6B";
      case "Medium":
        return "#5E60CE";
      case "Low":
        return "#808080";
      default:
        return "#808080";
    }
  };

  // todo color change
  const handleTitlePress = () => {
    changeTab("todo");
    // Tab change => Category reset
    setCategory("Etc");
  };

  // schedule color change
  const handleSchedulePress = () => {
    changeTab("schedule");
    // Tab change => Category reset
    setCategory("Etc");
  };

  // Modal Cancel
  const handleModalCancel = () => {
    setModalVisible(false);
    setShowAddCategory(false);
    if (editIndex === -1) resetForm();
  };

  // New Category
  const handleAddCategory = () => {
    if (newCategory.trim() === "") {
      Alert.alert("Error", "Please enter a category name.");
      return;
    }

    const { categories } = getActiveCategories();

    if (categories.includes(newCategory.trim())) {
      Alert.alert("Error", "Duplicate Category");
      return;
    }

    addCategory(newCategory.trim());
    setNewCategory("");
    setShowAddCategory(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Header
          activeTab={activeTab}
          onTodoPress={handleTitlePress}
          onSchedulePress={handleSchedulePress}
        />

        <TaskInput
          activeTab={activeTab}
          task={task}
          onChangeText={setTask}
          onSubmitEditing={handleOpenModal}
          onAddPress={handleOpenModal}
          isEditing={editIndex !== -1}
        />

        <TaskList
          activeTab={activeTab}
          categories={
            activeTab === "todo" ? todoCategories : scheduleCategories
          }
          tasks={getActiveTasks().tasks}
          onDeleteTask={deleteTask}
          onEditTask={handleEditTask}
          onToggleTask={toggleTaskCompletion}
          getPriorityColor={getPriorityColor}
        />
      </View>

      {/* Task Add/Edit Modal */}
      <TaskModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        editIndex={editIndex}
        activeTab={activeTab}
        task={task}
        onChangeTask={setTask}
        dueDate={dueDate}
        showDatePicker={showDatePicker}
        onDatePress={() => setShowDatePicker(true)}
        onDateChange={handleDateChange}
        categories={activeTab === "todo" ? todoCategories : scheduleCategories}
        category={category}
        onSelectCategory={setCategory}
        showAddCategory={showAddCategory}
        onToggleAddCategory={() => setShowAddCategory(!showAddCategory)}
        newCategory={newCategory}
        onChangeNewCategory={setNewCategory}
        onAddCategory={handleAddCategory}
        onDeleteCategory={deleteCategory}
        defaultCategories={
          activeTab === "todo"
            ? DEFAULT_TODO_CATEGORIES
            : DEFAULT_SCHEDULE_CATEGORIES
        }
        priorities={PRIORITIES}
        priority={priority}
        onSelectPriority={setPriority}
        getPriorityColor={getPriorityColor}
        memo={memo}
        onChangeMemo={setMemo}
        onCancel={handleModalCancel}
        onSave={handleAddTask}
      />

      {/* iOS Status Bar */}
      <StatusBar style="light" />
    </KeyboardAvoidingView>
  );
};

export default function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}

// Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  list: {
    flex: 1,
  },
});
