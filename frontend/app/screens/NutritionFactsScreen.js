import { StyleSheet, View, Text, ScrollView, FlatList } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

import theme from "../config/theme";
import NutritionEntry from "../components/NutritionEntry";
import NutritionFactsHeader from "../components/NutritionFactsHeader";
import NutritionFactsFooter from "../components/NutritionFactsFooter";
import Nutrients from "../helper/nutrients";

// %DV: https://www.fda.gov/food/new-nutrition-facts-label/daily-value-new-nutrition-and-supplement-facts-labels

const notBold = "Helvetica";
const italic = "Helvetica-Italic";
const bold = "Helvetica-Bold";
const veryBold = "Helvetica-Black";

let nutrients;

export default function NutritionFactsScreen({ navigation }) {
  // hooks have to be placed at the top
  const [servings, setServings] = useState("1"); // keep it as str
  const [servingSize, setServingSize] = useState("100"); // keep it as str
  const [allNutrients, setAllNutrients] = useState(
    navigation.getParam("foodNutrients")
  );

  useEffect(() => {
    nutrients = new Nutrients(servings, servingSize, allNutrients);
  }, [allNutrients]);

  useEffect(() => {
    if (nutrients === undefined) {
      return;
    }

    nutrients.servings = servings;
  }, [servings]);

  useEffect(() => {
    if (nutrients === undefined) {
      return;
    }

    nutrients.servingSize = servingSize;
  }, [servingSize]);

  const [loaded] = useFonts({
    [notBold]: require("../assets/fonts/" + notBold + ".ttf"),
    [italic]: require("../assets/fonts/" + italic + ".ttf"),
    [bold]: require("../assets/fonts/" + bold + ".ttf"),
    [veryBold]: require("../assets/fonts/" + veryBold + ".ttf"),
  });
  if (!loaded) {
    return null;
  }

  const foodName = navigation.getParam("description");
  return (
    <View style={styles.container}>
      <View style={[styles.titleContainer, { alignItems: "center" }]}>
        <MaterialCommunityIcons
          name="food-fork-drink"
          size={24}
          color={theme.dark}
        />
        <Text style={styles.title}> {foodName} </Text>
        <Text> </Text>
      </View>
      {nutrients && (
        <FlatList
          style={styles.label}
          data={Object.entries(nutrients.nutrients)}
          keyExtractor={nutrient => nutrient[0]}
          ListHeaderComponent={
            <NutritionFactsHeader
              styles={styles}
              nutrients={nutrients}
              servings={servings}
              setServings={setServings}
              servingSize={servingSize}
              setServingSize={setServingSize}
            />
          }
          renderItem={({ item: [nutrientName, nutrient] }) =>
            nutrientName !== "Energy" && (
              <NutritionEntry
                styles={styles}
                nutrition={nutrientName}
                value={nutrients.getValue(nutrientName)}
                dailyValue={nutrients.getPercentDailyValue(nutrientName)}
                hide0Pct={nutrient.hide0Pct}
                bold={nutrient.bold}
                italic={nutrient.italic}
                indent={nutrient.indent}
                borderBottomStyleName={nutrient.borderBottomStyleName}
              />
            )
          }
          ListFooterComponent={
            <NutritionFactsFooter textStyles={styles.text} />
          }
        />
      )}
    </View>
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
  notBold: {
    fontFamily: notBold,
  },
  container: {
    margin: 8,
    alignItems: "center",
  },
  titleContainer: {
    marginTop: 8,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: theme.accent,
    paddingVertical: 4,
    paddingHorizontal: 16,
    maxWidth: "100%",
    borderRadius: 8,
  },
  title: {
    ...header,
    fontFamily: bold,
    fontSize: 20,
    textAlign: "center",
    color: theme.dark,
  },
  label: {
    borderWidth: 2,
    borderColor: theme.dark,
  },
  servings: {
    flexDirection: "row",
    marginHorizontal: 8,
    alignItems: "center",
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
});
