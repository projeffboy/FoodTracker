import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";

import theme from "../config/theme";

const FoodListItem = ({ food, navigation }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => navigation.navigate("NutritionFacts", { food })}
  >
    <Text style={styles.itemText}>{food}</Text>
    <FontAwesome name="plus" size={16} color={theme.dark} />
  </TouchableOpacity>
);

export default withNavigation(FoodListItem);

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
