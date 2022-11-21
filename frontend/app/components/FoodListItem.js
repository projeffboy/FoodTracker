import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";

import theme from "../config/theme";
import { getNutrient } from "../helper";

const FoodListItem = ({ food: { description, foodNutrients }, navigation }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() =>
      navigation.navigate("NutritionFacts", { description, foodNutrients })
    }
  >
    <Text style={styles.itemText}>{description}</Text>
    <Text style={styles.calories}>{getNutrient(foodNutrients, "energy")}</Text>
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
  calories: {
    marginHorizontal: 8,
    color: theme.medium,
  },
});
