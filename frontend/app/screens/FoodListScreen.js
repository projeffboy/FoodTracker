import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Search from "../components/Search";
import FoodListItem from "../components/FoodListItem";

import theme from "../config/theme";
import FoodList from "../components/FoodList";

export default function FoodListScreen({ navigation }) {
  const searchTerm = navigation.getParam("searchTerm");
  const foods = ["Green Apple", "Red Apple", "Crabapple", "Pineapple"];

  return (
    <View style={styles.foodList}>
      <Search atFoodList initialInput={searchTerm} />
      <Text style={styles.header}>Top Results</Text>
      <FoodList foods={foods} />
    </View>
  );
}

const styles = StyleSheet.create({
  foodList: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.dark,
    paddingVertical: 16,
  },
});
