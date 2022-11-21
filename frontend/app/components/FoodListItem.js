import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";

import theme from "../config/theme";
import { getNutrient, kJ_to_kcal } from "../helper";

const FoodListItem = ({ food: { description, foodNutrients }, navigation }) => {
  const kcal = kJ_to_kcal(getNutrient(foodNutrients, "energy"));

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate("NutritionFacts", { description, foodNutrients })
      }
    >
      <Text style={styles.itemText}>{description}</Text>
      <View style={styles.calories}>
        <Text style={styles.caloriesText}>{kcal[0]}</Text>
        <Text style={{ ...styles.caloriesText, fontSize: 10 }}>{kcal[1]}</Text>
      </View>
      <FontAwesome name="plus" size={16} color={theme.dark} />
    </TouchableOpacity>
  );
};

export default withNavigation(FoodListItem);

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.dark,
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    color: theme.dark,
    flex: 1,
  },
  calories: {
    marginHorizontal: 8,
    flexDirection: "row",
    alignItems: "baseline",
  },
  caloriesText: {
    color: theme.medium,
  },
});
