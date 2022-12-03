import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import theme from "@/config/theme";
import { kJ_to_kcal } from "@/helper/nutrition";
import { addToDiaryWithFeedback } from "@/helper/toast";
import { round } from "@/helper/utility";

export default FoodListItem = ({
  food: {
    id,
    description,
    optional: { foodNutrients, servingSizeStr, servingSizeInG },
  },
}) => {
  const navigation = useNavigation();
  const { paddingVertical } = styles.itemText;
  const kcal = foodNutrients?.Energy
    ? kJ_to_kcal(foodNutrients.Energy)
    : ["", ""];

  function quickAdd() {
    addToDiaryWithFeedback(id, description, foodNutrients);
  }

  function servingSizeKcal() {
    if (servingSizeInG === undefined) {
      return kcal[0];
    }

    let output = kcal[0] * (servingSizeInG / 100);
    if (output >= 10) {
      return round(output, 0);
    } else if (output >= 1) {
      return round(output, 1);
    } else {
      return round(output, 2);
    }
  }

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate("NutritionFacts", {
          description,
          foodNutrients,
          id,
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
        <Text style={styles.itemText}>{description}</Text>
        <View style={styles.calories}>
          <Text style={styles.caloriesText}>
            {servingSizeKcal()}
            <Text style={styles.unit}>{kcal[1]}</Text>
            {" - "}
            <Text style={styles.servingSize}>{servingSizeStr || "100g"}</Text>
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
