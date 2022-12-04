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
  servingSizeNumOfUnit,
  stdNutrients,
  total,
} from "@/helper/nutrition";
import {
  createObj,
  formatNaN,
  fractionToDecimal,
  remove_prefix,
} from "@/helper/utility";
import { servingGramsUsedToCalculateNutrition } from "@/helper/api";
import AddFood from "@/components/AddFood";

const notBold = "Helvetica";
const italic = "Helvetica-Italic";
const bold = "Helvetica-Bold";
const veryBold = "Helvetica-Black";

export default function NutritionFactsScreen({ route, navigation }) {
  const {
    id,
    food,
    optional: { nutrients, servingSizes, ingredients },
  } = route.params;
  const defaultServingGrams = servingGramsUsedToCalculateNutrition;
  const defaultServings = "1";
  let defaultServingSizeNum = servingSizes?.[0]?.num || "100";
  if (defaultServingSizeNum.includes("/")) {
    defaultServingSizeNum = fractionToDecimal(defaultServingSizeNum);
  }
  const defaultServingSizeUnit = servingSizes?.[0]?.unit || "g";
  const [servings, setServings] = useState(String(defaultServings)); // NOTE: it is a str
  const [servingSizeNum, setServingSizeNum] = useState(
    String(defaultServingSizeNum)
  ); // NOTE: it is a str
  const [servingSizeUnit, setServingSizeUnit] = useState(
    defaultServingSizeUnit
  );
  useEffect(() => {
    const num = servingSizeNumOfUnit(servingSizeUnit, servingSizes);
    setServingSizeNum(String(num));
  }, [servingSizeUnit]);
  const text = servingSizes.map(({ unit }) => unit);
  const grams = servingSizes.map(({ grams }) => grams);
  let servingSizeToGrams = createObj(text, grams);
  servingSizeToGrams = {
    ...servingSizeToGrams,
    g: 1,
    oz: 28.3495,
    lb: 453.592,
  };
  // For the add food button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddFood
          foodEntry={{
            id,
            food,
            nutrients,
            servings,
            servingSizeNum,
            servingSizeUnit,
            servingGrams: servingSizeToGrams[servingSizeUnit],
          }}
        />
      ),
    });
  }, [servings, servingSizeNum, servingSizeUnit]);

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
    return formatNaN(
      total(
        num,
        servings,
        servingSizeNum,
        servingSizeUnit,
        servingSizeToGrams,
        defaultServingGrams,
        round
      )
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
  const dailyValuePercent = (nutrientName, dailyGrams) =>
    Array.isArray(nutrients[nutrientName])
      ? formatNaN(
          getPercentDailyValue(
            getTotal(remove_prefix(nutrients[nutrientName])[0], false),
            dailyGrams,
            servings,
            servingSizeNum,
            servingSizeUnit,
            defaultServingGrams
          )
        )
      : 0;

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

      {nutrients && (
        <FlatList
          style={styles.label}
          ListHeaderComponent={
            <NutritionFactsHeader
              styles={styles}
              kcal={getKcal()}
              servings={servings}
              setServings={setServings}
              servingSizeNum={servingSizeNum}
              setServingSizeNum={setServingSizeNum}
              servingSizeUnit={servingSizeUnit}
              setServingSizeUnit={setServingSizeUnit}
              servingSizes={servingSizes}
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
                dailyValuePercent={dailyValuePercent(
                  stdNutrientName,
                  stdNutrient.dailyGrams
                )}
                stdNutrient={stdNutrient}
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
  label: {
    borderWidth: 2,
    borderColor: theme.dark,
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
  text,
  boldText: {
    ...text,
    ...header,
  },
});
