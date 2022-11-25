import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import Search from "../components/Search";
import { RootSiblingParent } from "react-native-root-siblings";

import theme from "../config/theme";
import FoodList from "../components/FoodList";
import { searchFoods } from "../helper/api";
import useHook from "../helper/useHook";
import MyError from "../components/MyError";

export default function FoodListScreen({ navigation }) {
  const initialSearchTerm = navigation.getParam("searchTerm");
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const [{ data, loading, error }, searchFoodsWrapper] = useHook(searchFoods);

  useEffect(() => {
    searchFoodsWrapper(searchTerm);
  }, []);

  function List() {
    if (loading) {
      return <ActivityIndicator size="large" marginVertical={30} />;
    } else if (error) {
      return <MyError />;
    } else if (data && data.length > 0) {
      return <FoodList foods={data} />;
    } else {
      return <Text style={styles.noMatches}>No matches found.</Text>;
    }
  }

  return (
    <RootSiblingParent>
      <View style={styles.foodList}>
        <Search
          term={searchTerm}
          setTerm={setSearchTerm}
          submit={() => searchTerm.trim() !== "" && searchFoods(searchTerm)}
        />
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Top Results</Text>
          <Text>(Per 100g)</Text>
        </View>
        <List />
      </View>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  foodList: {
    padding: 16,
  },
  headerContainer: {
    marginVertical: 16,
    flexDirection: "row",
    alignItems: "baseline",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.dark,
    marginRight: 8,
  },
  noMatches: {
    marginTop: 16,
    fontSize: 16,
  },
});
