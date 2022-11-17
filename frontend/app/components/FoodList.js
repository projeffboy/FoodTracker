import React from "react";
import { FlatList } from "react-native";
import FoodListItem from "./FoodListItem";

const FoodList = ({ foods }) => (
  <FlatList
    data={foods}
    keyExtractor={food => food}
    renderItem={({ item }) => <FoodListItem food={item} />}
  />
);

export default FoodList;
