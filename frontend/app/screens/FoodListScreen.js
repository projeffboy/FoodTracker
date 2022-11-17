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

export default function FoodListScreen() {
  const foods = ["Green Apple", "Red Apple", "Crabapple", "Pineapple"];

  return (
    <View style={styles.foodList}>
      <Search atFoodList />
      <Text style={styles.header}>Top Results</Text>
      <FlatList
        data={foods}
        keyExtractor={food => food}
        renderItem={({ item }) => <FoodListItem food={item} />}
      />
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
