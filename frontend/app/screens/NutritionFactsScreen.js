import { StyleSheet, View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

import theme from "@/config/theme";
import NutritionEntry from "@/components/nutrition-facts-screen/NutritionEntry";
import NutritionFactsHeader from "@/components/nutrition-facts-screen/NutritionFactsHeader";
import NutritionFactsFooter from "@/components/nutrition-facts-screen/NutritionFactsFooter";
import { Nutrition } from "@/helper/nutrition";
import { getFood } from "@/helper/api";
import useHook from "@/helper/useHook";
import { useNavigation } from "@react-navigation/native";

// %DV: https://www.fda.gov/food/new-nutrition-facts-label/daily-value-new-nutrition-and-supplement-facts-labels

const notBold = "Helvetica";
const italic = "Helvetica-Italic";
const bold = "Helvetica-Bold";
const veryBold = "Helvetica-Black";

export default function NutritionFactsScreen({ route }) {
  const navigation = useNavigation();

  const { description: foodName } = route.params;
  const [allNutrients, setAllNutrients] = useState(route.params.foodNutrients);

  const defaultServings = "1";
  const defaultServingSize = "100";
  const defaultUnit = "g";

  // hooks have to be placed at the top
  const [{ data }, getFoodWrapper] = useHook(getFood);
  const [servings, setServings] = useState(defaultServings); // keep it as str
  const [servingSize, setServingSize] = useState(defaultServingSize); // keep it as str
  const [unit, setUnit] = useState(defaultUnit);

  useEffect(() => {
    async function init() {
      const id = navigation.getParam("id");
      await getFoodWrapper(id);

      const gramWeight = data?.foodPortions?.gramWeight;
      if (gramWeight) {
        setServingSize(gramWeight);
      }
    }

    init();
  }, []);
  useEffect(() => {
    const gramWeight = data?.foodPortions?.[0]?.gramWeight;
    if (gramWeight) {
      setServingSize(String(gramWeight));
    }

    if (allNutrients?.length === 0 && data) {
      setAllNutrients(
        data.foodNutrients.map(nutrient => ({
          nutrientName: nutrient.nutrient.name,
          value: nutrient.amount,
          unitName: nutrient.nutrient.unitName,
        }))
      );
    }
  }, [data]);
  useEffect(() => {
    setServingSize(unit === "g" || unit === "ml" ? defaultServingSize : "1");
  }, [unit]);
  useEffect(() => {
    // can be made more efficient
    const nutrition = new Nutrition(
      allNutrients,
      servings,
      servingSize,
      unit,
      defaultServings,
      defaultServingSize,
      defaultUnit
    );
    navigation.setParams({ nutrients: nutrition.getValues() });
  }, [servings, servingSize, unit]);

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

  // can be made more efficient but will take more code
  const nutrition = new Nutrition(
    allNutrients,
    servings,
    servingSize,
    unit,
    defaultServings,
    defaultServingSize,
    defaultUnit
  );

  const usdaDefaultServingSize = data?.foodPortions?.[0]?.portionDescription;

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

      {usdaDefaultServingSize ? (
        <Text style={styles.defaultServingSize}>
          Default serving size: {usdaDefaultServingSize}
        </Text>
      ) : (
        <View style={{ height: 10 }}></View>
      )}

      {nutrition && (
        <FlatList
          style={styles.label}
          data={Object.entries(nutrition.nutrients)}
          keyExtractor={nutrient => nutrient[0]}
          ListHeaderComponent={
            <NutritionFactsHeader
              styles={styles}
              nutrition={nutrition}
              detailedNutrition={data}
              servings={servings}
              setServings={setServings}
              servingSize={servingSize}
              setServingSize={setServingSize}
              unit={unit}
              setUnit={setUnit}
            />
          }
          renderItem={({ item: [nutrientName, nutrient] }) =>
            nutrientName !== "Energy" && (
              <NutritionEntry
                styles={styles}
                nutrient={nutrientName}
                value={nutrition.getValue(nutrientName)}
                dailyValue={nutrition.getPercentDailyValue(nutrientName)}
                hide0Pct={nutrient.hide0Pct}
                bold={nutrient.bold}
                italic={nutrient.italic}
                indent={nutrient.indent}
                borderBottomStyleName={nutrient.borderBottomStyleName}
              />
            )
          }
          ListFooterComponent={
            <NutritionFactsFooter
              textStyles={styles.text}
              detailedNutrition={data}
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
