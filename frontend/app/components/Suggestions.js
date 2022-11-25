import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import FoodList from "../components/FoodList";
import MyError from "../components/MyError";
import theme from "../config/theme";
import { getFoods } from "../helper/api";

export default Suggestions = ({ loading, error, data }) => {
  const [foods, setFoods] = useState();

  useEffect(() => {
    async function getFoodNutrients() {
      if (data) {
        const fmtData = data?.map(food => ({
          fdcId: food.id,
          description: food.name.toLowerCase(),
        }));
        const ids = fmtData.map(food => food.fdcId);
        const nutrition = await getFoods(ids);
        const foodsWithNutritionInfo = fmtData.map((food, i) => ({
          ...food,
          foodNutrients: nutrition[i].foodNutrients.map(nutrient => ({
            nutrientName: nutrient.nutrient.name,
            value: nutrient.amount,
            unitName: nutrient.nutrient.unitName,
          })),
        })); // assume the order is the same

        setFoods(foodsWithNutritionInfo);
      }
    }

    getFoodNutrients();
  }, [data]);

  if (loading) {
    return (
      <View style={styles.noPredictions}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Analyzing photo...</Text>
      </View>
    );
  } else if (error !== null) {
    return (
      <View style={styles.noPredictions}>
        <MyError />
      </View>
    );
  } else if (data?.length > 0 && foods) {
    return <FoodList foods={foods} />;
  } else {
    return (
      <View style={styles.noPredictions}>
        <Text style={styles.noMatches}>No matches found.</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  noPredictions: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: theme.medium,
    fontSize: 16,
    marginTop: 16,
  },
  noMatches: {
    fontSize: 16,
  },
});
