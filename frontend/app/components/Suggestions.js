import { StyleSheet, Text, View } from "react-native";
import FoodList from "../components/FoodList";
import MyError from "../components/MyError";
import theme from "../config/theme";

export default Suggestions = ({ loading, error, data }) => {
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
  } else if (data?.length > 0) {
    const modifiedData = data.map(food => ({
      ...food,
      description: food.name.toLowerCase(),
      fdcId: food.id,
      foodNutrients: [
        {
          nutrientName: "Energy",
          value: "5",
          unitName: "kcal",
        },
      ],
    }));

    return <FoodList foods={modifiedData} />;
  } else {
    return (
      <View style={styles.noPredictions}>
        <Text>No matches found.</Text>
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
});
