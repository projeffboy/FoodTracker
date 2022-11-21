import { StyleSheet, Image, View, Text, ScrollView } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

import theme from "../config/theme";
import { getNutrient, percentDV, kJ_to_kcal } from "../helper";
import NutritionEntry from "../components/NutritionEntry";

// %DV: https://www.fda.gov/food/new-nutrition-facts-label/daily-value-new-nutrition-and-supplement-facts-labels

const notBold = "Helvetica";
const italic = "Helvetica-Italic";
const bold = "Helvetica-Bold";
const veryBold = "Helvetica-Black";

export default function NutritionFactsScreen({ navigation }) {
  const [loaded] = useFonts({
    [notBold]: require("../assets/fonts/" + notBold + ".ttf"),
    [italic]: require("../assets/fonts/" + italic + ".ttf"),
    [bold]: require("../assets/fonts/" + bold + ".ttf"),
    [veryBold]: require("../assets/fonts/" + veryBold + ".ttf"),
  });
  if (!loaded) {
    return null;
  }

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
    let substring = nutrient === "energy";

    nutrients[nutrient].value = getNutrient(
      foodNutrients,
      nutrients[nutrient].longForm,
      substring
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <MaterialCommunityIcons
          name="food-fork-drink"
          size={24}
          color={theme.darkAccent}
        />
        <Text style={styles.title}> {description} </Text>
        <Text> </Text>
      </View>
      <View style={styles.label}>
        <View style={[styles.thinBorderBottom, { paddingBottom: 0 }]}>
          <Text style={styles.h1}>Nutrition Facts</Text>
        </View>
        <View style={{ ...styles.entry, marginHorizontal: 8 }}>
          <Text style={[styles.h3, { fontFamily: notBold }]}>
            1 servings per container
          </Text>
        </View>
        <View style={[styles.entry, styles.veryThickBorderBottom]}>
          <Text style={[styles.h3, { marginBottom: 4 }]}>Serving size</Text>
          <Text style={styles.h3}>100g</Text>
        </View>
        <View style={styles.thickBorderBottom}>
          <Text style={styles.boldText}>Amount per serving</Text>
          <View style={styles.entry}>
            <Text style={styles.h2}>Calories</Text>
            <Text style={styles.h2}>
              {kJ_to_kcal(nutrients.energy.value)[0]}
            </Text>
          </View>
        </View>
        <View style={[styles.thinBorderBottom, { alignItems: "flex-end" }]}>
          <Text style={styles.boldText}>% Daily Value*</Text>
        </View>
        <NutritionEntry
          styles={styles}
          nutrition="Total Fat"
          value={nutrients.fat.value}
          dailyValue={percentDV(
            nutrients.fat.value,
            nutrients.fat.dailyValueInG
          )}
          bold
        />
        <NutritionEntry
          styles={styles}
          nutrition="Saturated Fat"
          value={nutrients.saturatedFat.value}
          dailyValue={percentDV(
            nutrients.saturatedFat.value,
            nutrients.saturatedFat.dailyValueInG
          )}
          indent
        />
        <NutritionEntry
          styles={styles}
          italic="Trans "
          nutrition="Fat"
          value={nutrients.transFat.value}
          dailyValue={percentDV(
            nutrients.transFat.value,
            nutrients.transFat.dailyValueInG
          )}
          indent
        />
        <NutritionEntry
          styles={styles}
          nutrition="Cholesterol"
          value={nutrients.cholesterol.value}
          dailyValue={percentDV(
            nutrients.cholesterol.value,
            nutrients.cholesterol.dailyValueInG
          )}
          bold
        />
        <NutritionEntry
          styles={styles}
          nutrition="Sodium"
          value={nutrients.sodium.value}
          dailyValue={percentDV(
            nutrients.sodium.value,
            nutrients.sodium.dailyValueInG
          )}
          bold
        />
        <NutritionEntry
          styles={styles}
          nutrition="Total Carbohydrate"
          value={nutrients.carbs.value}
          dailyValue={percentDV(
            nutrients.carbs.value,
            nutrients.carbs.dailyValueInG
          )}
          bold
        />
        <NutritionEntry
          styles={styles}
          nutrition="Dietary Fiber"
          value={nutrients.fiber.value}
          dailyValue={percentDV(
            nutrients.fiber.value,
            nutrients.fiber.dailyValueInG
          )}
          indent
        />
        <NutritionEntry
          styles={styles}
          nutrition="Total Sugars"
          value={nutrients.sugars.value}
          dailyValue={percentDV(
            nutrients.sugars.value,
            nutrients.sugars.dailyValueInG
          )}
          indent
        />
        <NutritionEntry
          styles={styles}
          nutrition="Protein"
          value={nutrients.protein.value}
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
          value={nutrients.vitaminD.value}
          dailyValue={percentDV(
            nutrients.vitaminD.value,
            nutrients.vitaminD.dailyValueInG
          )}
        />
        <NutritionEntry
          styles={styles}
          nutrition="Calcium"
          value={nutrients.calcium.value}
          dailyValue={percentDV(
            nutrients.calcium.value,
            nutrients.calcium.dailyValueInG
          )}
        />
        <NutritionEntry
          styles={styles}
          nutrition="Iron"
          value={nutrients.iron.value}
          dailyValue={percentDV(
            nutrients.iron.value,
            nutrients.iron.dailyValueInG
          )}
        />
        <NutritionEntry
          styles={styles}
          nutrition="Potassium"
          value={nutrients.potassium.value}
          dailyValue={percentDV(
            nutrients.potassium.value,
            nutrients.potassium.dailyValueInG
          )}
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
  fontFamily: veryBold,
};

const text = {
  color: theme.dark,
  fontSize: 16,
  fontFamily: notBold,
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  titleContainer: {
    marginTop: 8,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    ...header,
    fontFamily: bold,
    fontSize: 20,
    textAlign: "center",
    color: theme.darkAccent,
  },
  label: {
    borderWidth: 2,
    borderColor: theme.dark,
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
    letterSpacing: -0.5,
  },
});
