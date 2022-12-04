import { StyleSheet, Text, View } from "react-native";

import theme from "@/config/theme";
import { kJ_to_kcal } from "@/helper/nutrition";
import { round } from "@/helper/utility";

export default function FoodDetails({
  styles: moreStyles,
  food,
  servingSizes,
  energy,
}) {
  styles = { ...styles, moreStyles };

  const kcal = energy ? kJ_to_kcal(energy) : ["", ""];
  const defaultServingSize = servingSizes?.[0];

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
    <View style={styles.details}>
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
  );
}

let styles = StyleSheet.create({
  details: {
    flex: 1,
    paddingVertical: 16,
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
