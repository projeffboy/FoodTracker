import { FlatList } from "react-native";
import FoodListItem from "./food-list/FoodListItem";

export default FoodList = ({ foods }) => (
  <FlatList
    data={foods}
    keyExtractor={food => food.id}
    renderItem={({ item }) => <FoodListItem food={item} />}
  />
);
