import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import theme from "@/config/theme";
import Search from "@/components/Search";
import FoodList from "@/components/FoodList";
import { searchFoods } from "@/helper/api";
import useHook from "@/helper/useHook";
import MyError from "@/components/MyError";

export default function FoodListScreen({ route }) {
  const { searchTerm: initialSearchTerm } = route.params;
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [{ res, loading, err }, searchFoodsWrapper] = useHook(searchFoods);
  useEffect(() => {
    searchFoodsWrapper(searchTerm);
  }, []);

  function List() {
    if (loading) {
      return (
        <ActivityIndicator
          size="large"
          marginVertical={30}
          style={{ flex: 0.75 }}
        />
      );
    } else if (err) {
      return <MyError flex={0.75} />;
    } else if (res && res.length > 0) {
      return <FoodList foods={res} />;
    } else if (res && res.length === 0) {
      return <Text style={styles.noMatches}>No matches found.</Text>;
    } else {
      <View style={styles.noPredictions}>
        <Text style={styles.noMatches}>
          Either still loading or no matches found.
        </Text>
      </View>;
    }
  }

  return (
    <View style={styles.root}>
      <Search
        term={searchTerm}
        setTerm={setSearchTerm}
        submit={() =>
          searchTerm.trim() !== "" && searchFoodsWrapper(searchTerm)
        }
      />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Top Results</Text>
      </View>
      <List />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 16,
    paddingBottom: 0,
    flex: 1,
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
