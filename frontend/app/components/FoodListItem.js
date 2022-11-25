import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";

import theme from "../config/theme";
import { getNutrient, kJ_to_kcal } from "../helper/nutrition";
import { Nutrition } from "../helper/nutrition";
import { addToDiaryWithFeedback } from "../helper/toast";

const FoodListItem = ({ food: { description, foodNutrients }, navigation }) => {
  function quickAdd() {
    const nutrition = new Nutrition(foodNutrients);

    addToDiaryWithFeedback(description, nutrition.getValues());
  }

  const kcal = kJ_to_kcal(getNutrient(foodNutrients, "energy"));

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate("NutritionFacts", { description, foodNutrients })
      }
    >
      <TouchableOpacity onPress={quickAdd}>
        <FontAwesome
          name="plus"
          size={16}
          color={theme.dark}
          style={styles.addFoodButton}
        />
      </TouchableOpacity>
      <Text style={styles.itemText}>{description}</Text>
      <View style={styles.calories}>
        <Text style={styles.caloriesText}>{kcal[0]}</Text>
        <Text style={{ ...styles.caloriesText, fontSize: 10 }}>{kcal[1]}</Text>
      </View>
      <FontAwesome name="chevron-right" size={16} color={theme.dark} />
    </TouchableOpacity>
  );
};

export default withNavigation(FoodListItem);

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderBottomColor: theme.medium,
    flexDirection: "row",
    alignItems: "center",
  },
  addFoodButton: {
    paddingVertical: 16,
    paddingHorizontal: 12,
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
