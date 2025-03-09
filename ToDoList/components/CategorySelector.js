import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

const CategorySelector = ({
  categories,
  selectedCategory,
  onSelectCategory,
  showAddCategory,
  onToggleAddCategory,
  newCategory,
  onChangeNewCategory,
  onAddCategory,
  onDeleteCategory,
  defaultCategories,
}) => {
  // Long Press Category
  const handleLongPress = (category) => {
    // Default category cannot be deleted
    if (defaultCategories.includes(category)) {
      Alert.alert("Not allowed", "Default category cannot be deleted.", [
        { text: "OK" },
      ]);
      return;
    }

    Alert.alert("Delete", `Delete "${category}" category?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => onDeleteCategory(category),
        style: "destructive",
      },
    ]);
  };

  return (
    <>
      <View style={styles.categoryHeader}>
        <Text style={styles.label}>Category</Text>
        <TouchableOpacity
          style={styles.addCategoryButton}
          onPress={onToggleAddCategory}
        >
          <Text style={styles.addCategoryButtonText}>
            {showAddCategory ? "Cancel" : "+"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Add Category */}
      {showAddCategory && (
        <View style={styles.newCategoryContainer}>
          <TextInput
            style={styles.newCategoryInput}
            value={newCategory}
            onChangeText={onChangeNewCategory}
            placeholder="New Category Name"
            placeholderTextColor="#808080"
            keyboardAppearance="dark"
          />
          <TouchableOpacity
            style={styles.newCategoryButton}
            onPress={onAddCategory}
          >
            <Text style={styles.newCategoryButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.categoryContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.categoryButtonSelected,
              defaultCategories.includes(cat) && styles.defaultCategoryButton,
            ]}
            onPress={() => onSelectCategory(cat)}
            onLongPress={() => handleLongPress(cat)}
            delayLongPress={500}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === cat && styles.categoryButtonTextSelected,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.categoryHint}>* Long press to delete category.</Text>
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
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 5,
  },
  addCategoryButton: {
    backgroundColor: "#242423",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  addCategoryButtonText: {
    color: "#808080",
    fontSize: 12,
    fontWeight: "bold",
  },

  // Add Category
  newCategoryContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  newCategoryInput: {
    flex: 1,
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 10,
    color: "#eee",
    marginRight: 10,
  },
  newCategoryButton: {
    backgroundColor: "#242423",
    paddingHorizontal: 10,
    borderRadius: 8,
    justifyContent: "center",
  },
  newCategoryButtonText: {
    color: "#808080",
    fontWeight: "bold",
    fontSize: 16,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
  },

  // Category Button
  categoryButton: {
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 5,
  },
  categoryButtonSelected: {
    backgroundColor: "#5E60CE",
  },
  defaultCategoryButton: {
    borderWidth: 1,
    borderColor: "#444",
  },
  categoryButtonText: {
    color: "#eee",
  },
  categoryButtonTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  categoryHint: {
    fontSize: 12,
    color: "#808080",
    fontStyle: "italic",
    marginBottom: 10,
  },
});

export default CategorySelector;
