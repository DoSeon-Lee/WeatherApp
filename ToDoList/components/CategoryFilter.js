import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedCategory === "All" && styles.filterButtonSelected,
          ]}
          onPress={() => onSelectCategory("All")}
        >
          <Text
            style={[
              styles.filterButtonText,
              selectedCategory === "All" && styles.filterButtonTextSelected,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterButton,
              selectedCategory === category && styles.filterButtonSelected,
            ]}
            onPress={() => onSelectCategory(category)}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedCategory === category &&
                  styles.filterButtonTextSelected,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  scrollView: {
    flexDirection: "row",
  },
  filterButton: {
    backgroundColor: "#242423",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 8,
  },
  filterButtonSelected: {
    backgroundColor: "#5E60CE",
  },
  filterButtonText: {
    color: "#808080",
    fontWeight: "500",
  },
  filterButtonTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CategoryFilter;
