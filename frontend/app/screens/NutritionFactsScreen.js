import { StyleSheet, Image, View, Text, ScrollView } from "react-native";
import React from "react";

import theme from "../config/theme";
import { getNutrient, percentDV } from "../helper";
import NutritionEntry from "../components/NutritionEntry";

// %DV: https://www.fda.gov/food/new-nutrition-facts-label/daily-value-new-nutrition-and-supplement-facts-labels

export default function NutritionFactsScreen({ navigation }) {
  const description = navigation.getParam("description");
  const foodNutrients = navigation.getParam("foodNutrients");

  const nutrients = {
    energy: { longForm: "energy", dailyValueInG: 2000 },
    fat: { longForm: "Total lipid (fat)", dailyValueInG: 78 },
    saturatedFat: {
      longForm: "Fatty acids, total saturated",
      dailyValueInG: 20,
    },
    transFat: { longForm: "Fatty acids, total trans", dailyValueInG: 2.2 },
    cholesterol: { longForm: "Cholesterol", dailyValueInG: 0.3 },
    sodium: { longForm: "Sodium, Na", dailyValueInG: 2.3 },
    carbs: { longForm: "Carbohydrate, by difference", dailyValueInG: 275 },
    fiber: { longForm: "Fiber, total dietary", dailyValueInG: 28 },
    sugars: { longForm: "Sugars, total including NLEA", dailyValueInG: 50 },
    protein: { longForm: "Protein", dailyValueInG: 50 },
    vitaminD: { longForm: "Vitamin D (D2 + D3)", dailyValueInG: 20e-6 },
    calcium: { longForm: "Calcium, Ca", dailyValueInG: 1.3 },
    iron: { longForm: "Iron, Fe", dailyValueInG: 18e-3 },
    potassium: { longForm: "Potassium, K", dailyValueInG: 4.7 },
  };
  for (let nutrient in nutrients) {
    nutrients[nutrient].value = getNutrient(
      foodNutrients,
      nutrients[nutrient].longForm
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{description}</Text>
      </View>
      <View style={styles.label}>
        <View style={[styles.thinBorderBottom, { paddingBottom: 0 }]}>
          <Text style={styles.h1}>Nutrition Facts</Text>
        </View>
        <View style={[styles.entry, styles.veryThickBorderBottom]}>
          <Text style={[styles.h3, { marginBottom: 4 }]}>Serving size</Text>
          <Text style={styles.h3}>100g</Text>
        </View>
        <View style={styles.thickBorderBottom}>
          <Text style={styles.boldText}>Amount per serving</Text>
          <View style={styles.entry}>
            <Text style={styles.h2}>Calories</Text>
            <Text style={styles.h2}>{nutrients.energy.value.join("")}</Text>
          </View>
        </View>
        <View style={[styles.thinBorderBottom, { alignItems: "flex-end" }]}>
          <Text style={styles.boldText}>% Daily Value*</Text>
        </View>
        <NutritionEntry
          styles={styles}
          nutrition="Total Fat"
          value={nutrients.fat.value.join("")}
          dailyValue={percentDV(
            nutrients.fat.value,
            nutrients.fat.dailyValueInG
          )}
          bold
        />
        <NutritionEntry
          styles={styles}
          nutrition="Saturated Fat"
          value={nutrients.saturatedFat.value.join("")}
          dailyValue={percentDV(
            nutrients.saturatedFat.value,
            nutrients.saturatedFat.dailyValueInG
          )}
          indent
        />
        <NutritionEntry
          styles={styles}
          italic="Trans"
          nutrition="Fat"
          value={nutrients.transFat.value.join("")}
          dailyValue={percentDV(
            nutrients.transFat.value,
            nutrients.transFat.dailyValueInG
          )}
          indent
        />
        <NutritionEntry
          styles={styles}
          nutrition="Cholesterol"
          value={nutrients.cholesterol.value.join("")}
          dailyValue={percentDV(
            nutrients.cholesterol.value,
            nutrients.cholesterol.dailyValueInG
          )}
          bold
        />
        <NutritionEntry
          styles={styles}
          nutrition="Sodium"
          value={nutrients.sodium.value.join("")}
          dailyValue={percentDV(
            nutrients.sodium.value,
            nutrients.sodium.dailyValueInG
          )}
          bold
        />
        <NutritionEntry
          styles={styles}
          nutrition="Total Carbohydrate"
          value={nutrients.carbs.value.join("")}
          dailyValue={percentDV(
            nutrients.carbs.value,
            nutrients.carbs.dailyValueInG
          )}
          bold
        />
        <NutritionEntry
          styles={styles}
          nutrition="Dietary Fiber"
          value={nutrients.fiber.value.join("")}
          dailyValue={percentDV(
            nutrients.fiber.value,
            nutrients.fiber.dailyValueInG
          )}
          indent
        />
        <NutritionEntry
          styles={styles}
          nutrition="Total Sugars"
          value={nutrients.sugars.value.join("")}
          dailyValue={percentDV(
            nutrients.sugars.value,
            nutrients.sugars.dailyValueInG
          )}
          indent
        />
        <NutritionEntry
          styles={styles}
          nutrition="Protein"
          value={nutrients.protein.value.join("")}
          dailyValue={percentDV(
            nutrients.protein.value,
            nutrients.protein.dailyValueInG
          )}
          bold
          borderBottom={styles.veryThickBorderBottom}
        />
        <NutritionEntry
          styles={styles}
          nutrition="Vitamin D"
          value={nutrients.vitaminD.value.join("")}
          dailyValue={percentDV(
            nutrients.vitaminD.value,
            nutrients.vitaminD.dailyValueInG
          )}
          bold
        />
        <NutritionEntry
          styles={styles}
          nutrition="Calcium"
          value={nutrients.calcium.value.join("")}
          dailyValue={percentDV(
            nutrients.calcium.value,
            nutrients.calcium.dailyValueInG
          )}
          bold
        />
        <NutritionEntry
          styles={styles}
          nutrition="Iron"
          value={nutrients.iron.value.join("")}
          dailyValue={percentDV(
            nutrients.iron.value,
            nutrients.iron.dailyValueInG
          )}
          bold
        />
        <NutritionEntry
          styles={styles}
          nutrition="Potassium"
          value={nutrients.potassium.value.join("")}
          dailyValue={percentDV(
            nutrients.potassium.value,
            nutrients.potassium.dailyValueInG
          )}
          bold
          borderBottom={styles.thickBorderBottom}
        />
        <View style={styles.finePrintContainer}>
          <Text style={[styles.text, styles.finePrint]}>
            The % Daily Value (DV) tells you how much a nutrient in a serving of
            food contributes to a daily diet. 2,000 calories a day is used for
            general nutrition advice.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const borderBottom = {
  marginHorizontal: 8,
  marginBottom: 4,
  paddingBottom: 4,
  borderBottomColor: theme.dark,
};

const header = {
  color: theme.dark,
  fontWeight: "bold",
};

const text = {
  color: theme.dark,
  fontSize: 16,
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  titleContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  label: {
    borderWidth: 2,
    borderColor: theme.dark,
  },
  title: {
    ...header,
    fontWeight: "initial",
    fontSize: 20,
    textAlign: "center",
  },
  h1: {
    ...header,
    fontSize: 36,
  },
  h2: {
    ...header,
    fontSize: 28,
  },
  h3: {
    ...header,
    fontSize: 20,
  },
  entry: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  thinBorderBottom: {
    ...borderBottom,
    borderBottomWidth: 0.5,
  },
  thickBorderBottom: {
    ...borderBottom,
    borderBottomWidth: 8,
  },
  veryThickBorderBottom: {
    ...borderBottom,
    borderBottomWidth: 16,
  },
  bold: {
    fontWeight: "bold",
  },
  text,
  boldText: {
    ...text,
    ...header,
  },
  indent: {
    paddingLeft: 18,
  },
  finePrintContainer: {
    marginHorizontal: 8,
    marginBottom: 8,
  },
  finePrint: {
    fontSize: 10,
    letterSpacing: -1,
  },
});
