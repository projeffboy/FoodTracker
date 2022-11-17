import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

import theme from "../config/theme";

export default function FoodListItem({ food, index }) {
  return (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.itemText}>{food}</Text>
      <FontAwesome name="plus" size={16} color={theme.dark} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.dark,
    flexDirection: "row",
  },
  itemText: {
    fontSize: 16,
    color: theme.dark,
    flex: 1,
  },
});
