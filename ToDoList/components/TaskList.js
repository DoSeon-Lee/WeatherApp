import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import TodoItem from "./TodoItem";
import CategoryFilter from "./CategoryFilter";

const TaskList = ({
  activeTab,
  categories,
  tasks,
  onDeleteTask,
  onEditTask,
  onToggleTask,
  getPriorityColor,
}) => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [openRowKey, setOpenRowKey] = useState(null);
  const listRef = useRef(null);

  // 필터링된 작업 목록 가져오기
  const getFilteredTasks = () => {
    if (selectedFilter === "All") {
      return tasks;
    } else {
      return tasks.filter((task) => task.category === selectedFilter);
    }
  };

  // 필터 변경 처리
  const handleFilterChange = (category) => {
    setSelectedFilter(category);
  };

  // 스와이프 항목이 열릴 때 호출되는 함수
  const onRowOpen = (rowKey) => {
    setOpenRowKey(rowKey);
  };

  // 스와이프 항목이 닫힐 때 호출되는 함수
  const onRowClose = () => {
    setOpenRowKey(null);
  };

  // 목록 밖을 클릭했을 때 호출되는 함수
  const handleContentPress = () => {
    if (openRowKey !== null && listRef.current) {
      listRef.current.closeRow(openRowKey);
      setOpenRowKey(null);
    }
  };

  // 탭이 변경될 때 필터 초기화
  React.useEffect(() => {
    setSelectedFilter("All");
  }, [activeTab]);

  return (
    <View style={styles.container} onTouchStart={handleContentPress}>
      {/* 카테고리 필터 */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedFilter}
        onSelectCategory={handleFilterChange}
      />

      {/* 작업 목록 */}
      <SwipeListView
        ref={listRef}
        data={getFilteredTasks()}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onDelete={() => onDeleteTask(item.id)}
            onEdit={() => onEditTask(item.id)}
            onToggle={() => onToggleTask(item.id)}
            priorityColor={getPriorityColor(item.priority)}
          />
        )}
        keyExtractor={(item) => item.id}
        style={styles.list}
        onRowOpen={onRowOpen}
        onRowClose={onRowClose}
        closeOnRowPress={true}
        closeOnScroll={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});

export default TaskList;
