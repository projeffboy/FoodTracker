import { StyleSheet, View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

import theme from "@/config/theme";
import NutritionEntry from "@/components/nutrition-facts-screen/NutritionEntry";
import NutritionFactsHeader from "@/components/nutrition-facts-screen/NutritionFactsHeader";
import NutritionFactsFooter from "@/components/nutrition-facts-screen/NutritionFactsFooter";
import {
  getPercentDailyValue,
  kJ_to_kcal,
  stdNutrients,
  total,
} from "@/helper/nutrition";
import { createObj, remove_prefix } from "@/helper/utility";

// %DV: https://www.fda.gov/food/new-nutrition-facts-label/daily-value-new-nutrition-and-supplement-facts-labels

const notBold = "Helvetica";
const italic = "Helvetica-Italic";
const bold = "Helvetica-Bold";
const veryBold = "Helvetica-Black";

export default function NutritionFactsScreen({ route }) {
  const {
    id,
    food,
    optional: { nutrients, servingSizes, defaultServingSize, ingredients },
  } = route.params;

  const defaultServings = "1";
  const defaultServingGrams = "100";

  // hooks have to be placed at the top
  const [servings, setServings] = useState(defaultServings); // NOTE: it is a str
  const [servingSize, setServingSize] = useState(defaultServingGrams); // NOTE: it is a str
  const [servingSizeUnit, setServingSizeUnit] = useState("g");
  useEffect(() => {
    let newServingSize = "1";
    if (servingSizeUnit === "g" || servingSizeUnit === "ml") {
      newServingSize = defaultServingGrams;
    } else if (servingSizeUnit === "oz") {
      newServingSize = "5";
    }

    setServingSize(newServingSize);
  }, [servingSizeUnit]);

  const [loaded] = useFonts({
    // for some reason absolute paths don't work when the string below has a variable in it
    [notBold]: require("../assets/fonts/" + notBold + ".ttf"),
    [italic]: require("../assets/fonts/" + italic + ".ttf"),
    [bold]: require("../assets/fonts/" + bold + ".ttf"),
    [veryBold]: require("../assets/fonts/" + veryBold + ".ttf"),
  });
  if (!loaded) {
    return null;
  }

  function getTotal(num, round = true) {
    const text = servingSizes.map(({ text }) => text);
    const grams = servingSizes.map(({ grams }) => grams);
    const servingSizeConvertToGrams = createObj(text, grams);

    return total(
      num,
      servings,
      servingSize,
      servingSizeUnit,
      servingSizeConvertToGrams,
      defaultServingGrams,
      round
    );
  }
  const getTotalWithArr = ([num, unit]) => [getTotal(num), unit];
  function getKcal() {
    if (!nutrients.Energy) {
      return;
    }

    const total = getTotal(kJ_to_kcal(nutrients.Energy)[0]);
    if (total >= 1) {
      return Math.round(total);
    } else {
      return total;
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.titleContainer, { alignItems: "center" }]}>
        <MaterialCommunityIcons
          name="food-fork-drink"
          size={24}
          color={styles.title.color}
        />
        <Text style={styles.title}> {food} </Text>
        <Text> </Text>
      </View>

      {defaultServingSize ? (
        <Text style={styles.defaultServingSize}>
          Default serving size: {defaultServingSize}
        </Text>
      ) : (
        <View style={{ height: 10 }}></View>
      )}

      {nutrients && (
        <FlatList
          style={styles.label}
          ListHeaderComponent={
            <NutritionFactsHeader
              styles={styles}
              kcal={getKcal()}
              servings={servings}
              setServings={setServings}
              servingSize={servingSize}
              setServingSize={setServingSize}
              servingSizeUnit={servingSizeUnit}
              setServingSizeUnit={setServingSizeUnit}
              servingSizesText={servingSizes.map(({ text }) => text)}
            />
          }
          data={Object.entries(stdNutrients)}
          keyExtractor={stdNutrient => stdNutrient[0]}
          renderItem={({ item: [stdNutrientName, stdNutrient] }) =>
            stdNutrientName !== "Energy" && (
              <NutritionEntry
                styles={styles}
                nutrient={stdNutrientName}
                value={
                  nutrients[stdNutrientName] &&
                  getTotalWithArr(nutrients[stdNutrientName])
                }
                dailyValue={
                  Array.isArray(nutrients[stdNutrientName]) &&
                  getPercentDailyValue(
                    getTotal(
                      remove_prefix(nutrients[stdNutrientName])[0],
                      false
                    ),
                    stdNutrient.dailyGrams,
                    servings,
                    servingSize,
                    servingSizeUnit,
                    defaultServingGrams
                  )
                }
                hide0Pct={stdNutrient.hide0Pct}
                bold={stdNutrient.bold}
                italic={stdNutrient.italic}
                indent={stdNutrient.indent}
                borderBottomStyleName={stdNutrient.borderBottomStyleName}
              />
            )
          }
          ListFooterComponent={
            <NutritionFactsFooter
              textStyles={styles.text}
              ingredients={ingredients}
            />
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
    flex: 1,
  },
  titleContainer: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: theme.yellow,
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
  defaultServingSize: {
    marginBottom: 8,
    textAlign: "center",
    color: theme.medium,
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
