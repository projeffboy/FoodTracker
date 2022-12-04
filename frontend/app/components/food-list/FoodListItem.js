import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import theme from "@/config/theme";
import { kJ_to_kcal } from "@/helper/nutrition";
import { addToDiaryWithFeedback } from "@/helper/toast";
import { round } from "@/helper/utility";

export default FoodListItem = ({ food: { id, food, optional } }) => {
  const { nutrients, servingSizes } = optional; // there is also `ingredients`

  const navigation = useNavigation();

  const { paddingVertical } = styles.itemText;
  const kcal = nutrients?.Energy ? kJ_to_kcal(nutrients.Energy) : ["", ""];
  const defaultServingSize = servingSizes?.[0];

  function quickAdd() {
    addToDiaryWithFeedback(id, food, nutrients);
  }

  function servingSizeKcal() {
    const servingGrams = servingSizes?.[0]?.grams;
    if (servingGrams === undefined) {
      return kcal[0];
    }

    const servingKcal = kcal[0] * (servingGrams / 100);
    if (servingKcal >= 10) {
      return round(servingKcal, 0);
    } else if (servingKcal >= 1) {
      return round(servingKcal, 1);
    } else {
      return round(servingKcal, 2);
    }
  }

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate("NutritionFacts", {
          id,
          food,
          optional,
        })
      }
    >
      <TouchableOpacity
        onPress={quickAdd}
        hitSlop={{ top: paddingVertical, bottom: paddingVertical }}
      >
        <FontAwesome
          name="plus"
          size={16}
          color={theme.dark}
          style={styles.addFoodButton}
        />
      </TouchableOpacity>
      <View style={styles.description}>
        <Text style={styles.itemText}>{food}</Text>
        <View style={styles.calories}>
          <Text style={styles.caloriesText}>
            {servingSizeKcal()}
            <Text style={styles.unit}>{kcal[1]}</Text>
            {" - "}
            <Text style={styles.servingSize}>
              {defaultServingSize
                ? defaultServingSize.num + " " + defaultServingSize.unit
                : "100g"}
            </Text>
          </Text>
        </View>
      </View>
      <FontAwesome name="chevron-right" size={16} color={theme.dark} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderBottomColor: theme.medium,
    flexDirection: "row",
    alignItems: "center",
  },
  addFoodButton: {
    paddingHorizontal: 12,
  },
  description: {
    flex: 1,
    paddingVertical: 16,
  },
  itemText: {
    fontSize: 16,
    color: theme.dark,
    flex: 1,
  },
  unit: {
    fontSize: 10,
  },
  servingSize: {
    fontSize: 12,
    color: theme.green,
  },
  calories: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  caloriesText: {
    color: theme.medium,
  },
});
