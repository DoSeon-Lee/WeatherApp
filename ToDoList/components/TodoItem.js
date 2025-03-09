import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SwipeRow } from "react-native-swipe-list-view";

const TodoItem = ({ item, onDelete, onEdit, onToggle, priorityColor }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  // date format
  const formatDate = (date) => {
    if (!date) return "No Due Date";
    return new Date(date).toLocaleDateString();
  };

  return (
    <>
      <SwipeRow
        rightOpenValue={-150}
        disableRightSwipe
        stopRightSwipe={-150}
        closeOnRowPress={true}
        previewRowKey={item.id}
        previewOpenValue={-40}
        previewOpenDelay={1000}
      >
        {/* Hidden View (Swipe => Edit, Delete Button) */}
        <View style={styles.rowBack}>
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnEdit]}
            onPress={onEdit}
          >
            <Ionicons name="pencil-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnDelete]}
            onPress={onDelete}
          >
            <Ionicons name="trash-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Visible View (기본 보이는 항목) */}
        <TouchableOpacity
          style={styles.rowFront}
          onPress={() => setDetailsVisible(true)}
          activeOpacity={0.8}
        >
          <View style={styles.item}>
            <TouchableOpacity onPress={onToggle} style={styles.itemLeft}>
              {/* checkbox */}
              <View
                style={[
                  styles.checkbox,
                  item.completed && styles.checkboxCompleted,
                ]}
              >
                {item.completed && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
              </View>

              {/* text container */}
              <View style={styles.textContainer}>
                <Text
                  style={[
                    styles.itemText,
                    item.completed && styles.itemTextCompleted,
                  ]}
                  numberOfLines={1}
                >
                  {item.text}
                </Text>

                <View style={styles.itemDetails}>
                  {item.dueDate && (
                    <View style={styles.detailItem}>
                      <Ionicons
                        name="calendar-outline"
                        size={12}
                        color="#808080"
                      />
                      <Text style={styles.detailText}>
                        {formatDate(item.dueDate)}
                      </Text>
                    </View>
                  )}

                  {item.category && (
                    <View style={styles.detailItem}>
                      <Ionicons
                        name="bookmark-outline"
                        size={12}
                        color="#808080"
                      />
                      <Text style={styles.detailText}>{item.category}</Text>
                    </View>
                  )}

                  {item.priority && (
                    <View
                      style={[
                        styles.priorityIndicator,
                        { backgroundColor: priorityColor },
                      ]}
                    />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </SwipeRow>

      {/* Task click => details modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={detailsVisible}
        onRequestClose={() => setDetailsVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setDetailsVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView>
                <View style={styles.modalHeader}>
                  <View
                    style={[
                      styles.priorityBadge,
                      { backgroundColor: priorityColor },
                    ]}
                  >
                    <Text style={styles.priorityText}>
                      {item.priority || "Medium"}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setDetailsVisible(false)}
                  >
                    <Ionicons name="close" size={24} color="#808080" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.modalTitle}>{item.text}</Text>

                <View style={styles.detailRow}>
                  <Ionicons name="calendar-outline" size={18} color="#808080" />
                  <Text style={styles.detailRowText}>
                    {formatDate(item.dueDate)}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons name="bookmark-outline" size={18} color="#808080" />
                  <Text style={styles.detailRowText}>
                    {item.category || "Etc"}
                  </Text>
                </View>

                {item.memo && item.memo.trim() !== "" && (
                  <View style={styles.memoContainer}>
                    <Text style={styles.memoText}>{item.memo}</Text>
                  </View>
                )}

                {/* madal button */}
                <View style={styles.modalButtons}>
                  {!item.completed && (
                    <TouchableOpacity
                      style={[styles.modalButton, styles.editModalButton]}
                      onPress={() => {
                        setDetailsVisible(false);
                        onEdit();
                      }}
                    >
                      <Ionicons
                        name="pencil-outline"
                        size={18}
                        color="#5E60CE"
                      />
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={[styles.modalButton, styles.deleteModalButton]}
                    onPress={() => {
                      setDetailsVisible(false);
                      onDelete();
                    }}
                  >
                    <Ionicons name="trash-outline" size={18} color="#FF6B6B" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.modalButton, styles.toggleModalButton]}
                    onPress={() => {
                      setDetailsVisible(false);
                      onToggle();
                    }}
                  >
                    <Ionicons
                      name={
                        item.completed ? "refresh-outline" : "checkmark-outline"
                      }
                      size={18}
                      color="#4CAF50"
                    />
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  // Swipe
  rowFront: {
    backgroundColor: "transparent",
    justifyContent: "center",
    marginBottom: 15,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#242423",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingLeft: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  backRightBtn: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    top: 0,
    width: 75,
    paddingHorizontal: 10,
  },
  backRightBtnEdit: {
    backgroundColor: "#5E60CE",
    right: 75,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  backRightBtnDelete: {
    backgroundColor: "#FF6B6B",
    right: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  backTextWhite: {
    color: "#FFF",
    fontSize: 12,
    marginTop: 5,
  },

  // Default Style
  item: {
    backgroundColor: "#242423",
    color: "#808080",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: "#808080",
    borderWidth: 2,
    borderColor: "#242423",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxCompleted: {
    backgroundColor: "#242423",
    borderColor: "#242423",
  },
  textContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color: "#eee",
  },
  itemTextCompleted: {
    textDecorationLine: "line-through",
    color: "#808080",
  },
  itemDetails: {
    flexDirection: "row",
    marginTop: 4,
    alignItems: "center",
  },
  detailItem: {
    flexDirection: "row",
    marginRight: 10,
    alignItems: "center",
  },
  detailText: {
    fontSize: 12,
    color: "#808080",
    marginLeft: 3,
  },
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 5,
  },
  buttons: {
    flexDirection: "row",
  },
  editButton: {
    marginRight: 10,
  },
  deleteButton: {
    marginLeft: 5,
  },

  // List Click => Details Modal Style
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "80%",
  },
  modalContent: {
    backgroundColor: "#242423",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  priorityText: {
    color: "#fff",
  },
  closeButton: {
    padding: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#eee",
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  detailRowText: {
    color: "#eee",
    marginLeft: 10,
    fontSize: 16,
  },

  // memo
  memoContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  memoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#eee",
    marginBottom: 5,
  },
  memoText: {
    color: "#eee",
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    minHeight: 80,
  },

  // modal button
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  editModalButton: {
    backgroundColor: "#242423",
  },
  deleteModalButton: {
    backgroundColor: "#242423",
  },
  toggleModalButton: {
    backgroundColor: "#242423",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default TodoItem;
