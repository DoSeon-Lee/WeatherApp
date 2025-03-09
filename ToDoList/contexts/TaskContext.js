import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 기본 카테고리 목록
const DEFAULT_TODO_CATEGORIES = ["Business", "Personal", "Study", "Etc"];
const DEFAULT_SCHEDULE_CATEGORIES = ["Personal", "Shopping", "Study", "Etc"];

// AsyncStorage 키
const TODO_TASKS_KEY = "@todo_tasks";
const SCHEDULE_TASKS_KEY = "@schedule_tasks";
const TODO_CATEGORIES_KEY = "@todo_categories";
const SCHEDULE_CATEGORIES_KEY = "@schedule_categories";

// 컨텍스트 생성
const TaskContext = createContext();

// 컨텍스트 프로바이더 컴포넌트
export const TaskProvider = ({ children }) => {
  const [todoTasks, setTodoTasks] = useState([]);
  const [scheduleTasks, setScheduleTasks] = useState([]);
  const [todoCategories, setTodoCategories] = useState(DEFAULT_TODO_CATEGORIES);
  const [scheduleCategories, setScheduleCategories] = useState(
    DEFAULT_SCHEDULE_CATEGORIES
  );
  const [activeTab, setActiveTab] = useState("todo");

  // 앱 시작 시 저장된 데이터 불러오기
  useEffect(() => {
    const loadData = async () => {
      try {
        // To Do 목록 불러오기
        const todoData = await AsyncStorage.getItem(TODO_TASKS_KEY);
        if (todoData) {
          const parsedTodoTasks = JSON.parse(todoData);
          const todoTasksWithDates = parsedTodoTasks.map((task) => ({
            ...task,
            dueDate: task.dueDate ? new Date(task.dueDate) : null,
          }));
          setTodoTasks(todoTasksWithDates);
        }

        // Schedule 목록 불러오기
        const scheduleData = await AsyncStorage.getItem(SCHEDULE_TASKS_KEY);
        if (scheduleData) {
          const parsedScheduleTasks = JSON.parse(scheduleData);
          const scheduleTasksWithDates = parsedScheduleTasks.map((task) => ({
            ...task,
            dueDate: task.dueDate ? new Date(task.dueDate) : null,
          }));
          setScheduleTasks(scheduleTasksWithDates);
        }

        // To Do 카테고리 불러오기
        const todoCategoriesData = await AsyncStorage.getItem(
          TODO_CATEGORIES_KEY
        );
        if (todoCategoriesData) {
          setTodoCategories(JSON.parse(todoCategoriesData));
        }

        // Schedule 카테고리 불러오기
        const scheduleCategoriesData = await AsyncStorage.getItem(
          SCHEDULE_CATEGORIES_KEY
        );
        if (scheduleCategoriesData) {
          setScheduleCategories(JSON.parse(scheduleCategoriesData));
        }
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    loadData();
  }, []);

  // todoTasks가 변경될 때마다 AsyncStorage에 저장
  useEffect(() => {
    const saveTodoTasks = async () => {
      try {
        await AsyncStorage.setItem(TODO_TASKS_KEY, JSON.stringify(todoTasks));
      } catch (error) {
        console.error("To Do 목록 저장 실패:", error);
      }
    };

    saveTodoTasks();
  }, [todoTasks]);

  // scheduleTasks가 변경될 때마다 AsyncStorage에 저장
  useEffect(() => {
    const saveScheduleTasks = async () => {
      try {
        await AsyncStorage.setItem(
          SCHEDULE_TASKS_KEY,
          JSON.stringify(scheduleTasks)
        );
      } catch (error) {
        console.error("Schedule 목록 저장 실패:", error);
      }
    };

    saveScheduleTasks();
  }, [scheduleTasks]);

  // todoCategories가 변경될 때마다 AsyncStorage에 저장
  useEffect(() => {
    const saveTodoCategories = async () => {
      try {
        await AsyncStorage.setItem(
          TODO_CATEGORIES_KEY,
          JSON.stringify(todoCategories)
        );
      } catch (error) {
        console.error("To Do 카테고리 저장 실패:", error);
      }
    };

    saveTodoCategories();
  }, [todoCategories]);

  // scheduleCategories가 변경될 때마다 AsyncStorage에 저장
  useEffect(() => {
    const saveScheduleCategories = async () => {
      try {
        await AsyncStorage.setItem(
          SCHEDULE_CATEGORIES_KEY,
          JSON.stringify(scheduleCategories)
        );
      } catch (error) {
        console.error("Schedule 카테고리 저장 실패:", error);
      }
    };

    saveScheduleCategories();
  }, [scheduleCategories]);

  // 현재 활성화된 탭에 따라 적절한 tasks와 setTasks 함수 반환
  const getActiveTasks = () => {
    return activeTab === "todo"
      ? { tasks: todoTasks, setTasks: setTodoTasks }
      : { tasks: scheduleTasks, setTasks: setScheduleTasks };
  };

  // 현재 활성화된 탭에 따른 카테고리 목록 반환
  const getActiveCategories = () => {
    return activeTab === "todo"
      ? {
          categories: todoCategories,
          setCategories: setTodoCategories,
          storageKey: TODO_CATEGORIES_KEY,
        }
      : {
          categories: scheduleCategories,
          setCategories: setScheduleCategories,
          storageKey: SCHEDULE_CATEGORIES_KEY,
        };
  };

  // 작업 추가
  const addTask = (newTask) => {
    const { tasks, setTasks } = getActiveTasks();
    setTasks([
      ...tasks,
      {
        id: Date.now().toString(),
        ...newTask,
        completed: false,
      },
    ]);
  };

  // 작업 수정
  const updateTask = (id, updatedTask) => {
    const { tasks, setTasks } = getActiveTasks();
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
  };

  // 작업 삭제
  const deleteTask = (id) => {
    const { tasks, setTasks } = getActiveTasks();
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // 작업 완료 상태 토글
  const toggleTaskCompletion = (id) => {
    const { tasks, setTasks } = getActiveTasks();
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // 카테고리 추가
  const addCategory = (newCategory) => {
    const { categories, setCategories } = getActiveCategories();
    if (!categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  // 카테고리 삭제
  const deleteCategory = (categoryToDelete) => {
    const { tasks, setTasks } = getActiveTasks();
    const { categories, setCategories } = getActiveCategories();

    // 기본 카테고리는 삭제할 수 없음
    if (
      [...DEFAULT_TODO_CATEGORIES, ...DEFAULT_SCHEDULE_CATEGORIES].includes(
        categoryToDelete
      )
    ) {
      return false;
    }

    // 카테고리 삭제
    const updatedCategories = categories.filter(
      (cat) => cat !== categoryToDelete
    );
    setCategories(updatedCategories);

    // 해당 카테고리를 사용하는 작업들의 카테고리를 'Etc'로 변경
    const updatedTasks = tasks.map((task) => {
      if (task.category === categoryToDelete) {
        return { ...task, category: "Etc" };
      }
      return task;
    });
    setTasks(updatedTasks);

    return true;
  };

  // 탭 변경
  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  // 컨텍스트 값
  const contextValue = {
    todoTasks,
    scheduleTasks,
    todoCategories,
    scheduleCategories,
    activeTab,
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
  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};

// 커스텀 훅
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export default TaskContext;
