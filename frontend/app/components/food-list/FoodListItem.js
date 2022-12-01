import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import theme from "@/config/theme";
import { Nutrition } from "@/helper/nutrition";
import { addToDiaryWithFeedback } from "@/helper/toast";

export default FoodListItem = ({
  food: {
    id,
    description,
    optional: {
      kcal = ["", ""],
      foodNutrients,
      servingSizeStr,
      servingSizeInG,
    },
  },
}) => {
  const navigation = useNavigation();
  const { paddingVertical } = styles.itemText;

  function quickAdd() {
    const nutrition = new Nutrition(foodNutrients);

    addToDiaryWithFeedback(id, description, nutrition.getValues());
  }

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate("NutritionFacts", {
          description,
          foodNutrients: foodNutrients || [],
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
      <Text style={styles.itemText}>{description}</Text>
      <View style={styles.calories}>
        <Text style={styles.caloriesText}>{kcal[0]}</Text>
        <Text style={{ ...styles.caloriesText, fontSize: 10 }}>{kcal[1]}</Text>
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
  itemText: {
    fontSize: 16,
    color: theme.dark,
    flex: 1,
    paddingVertical: 16,
  },
  calories: {
    marginHorizontal: 8,
    flexDirection: "row",
    alignItems: "baseline",
  },
  caloriesText: {
    color: theme.medium,
  },
});
