import { FlatList } from "react-native";
import FoodListItem from "./FoodListItem";

export default FoodList = ({ foods }) => (
  <FlatList
    data={foods}
    keyExtractor={food => food.fdcId}
    renderItem={({ item }) => <FoodListItem food={item} />}
  />
);
