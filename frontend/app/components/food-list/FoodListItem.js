import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import theme from "@/config/theme";
import { addToDiaryWithFeedback } from "@/helper/toast";
import FoodDetails from "./food-list-item/FoodDetails";

export default FoodListItem = ({ food: { id, food, optional } }) => {
  const { nutrients, servingSizes } = optional; // there is also `ingredients`

  const navigation = useNavigation();

  const { paddingVertical } = styles.itemText;

  function quickAdd() {
    addToDiaryWithFeedback(id, food, nutrients);
  }

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate("NutritionFacts", {
          id,
          food,
          optional,
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
      <FoodDetails
        styles={styles}
        food={food}
        servingSizes={servingSizes}
        energy={nutrients?.Energy}
      />
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
  },
});
