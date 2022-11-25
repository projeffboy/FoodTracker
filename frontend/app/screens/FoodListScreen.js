import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import { FontAwesome } from "@expo/vector-icons";
import { RootSiblingParent } from "react-native-root-siblings";

import theme from "../config/theme";
import FoodList from "../components/FoodList";
import useFoods from "../hooks/useFoods";

export default function FoodListScreen({ navigation }) {
  const initialSearchTerm = navigation.getParam("searchTerm");
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const [{ data, loading, error }, searchFoods] = useFoods();

  useEffect(() => {
    searchFoods(searchTerm);
  }, []);

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
        {loading && <ActivityIndicator size="large" marginVertical={30} />}
        {error && (
          <View style={styles.error}>
            <FontAwesome
              name="exclamation-circle"
              size={36}
              color={theme.dark}
            />
            <Text style={styles.errorText}>There was an error.</Text>
          </View>
        )}
        {data?.totalHits !== 0 ? (
          <FoodList foods={data?.foods} />
        ) : (
          <Text style={styles.noMatches}>No matches found.</Text>
        )}
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
  error: {
    alignItems: "center",
    marginTop: 32,
  },
  errorText: {
    marginTop: 4,
    fontSize: 16,
  },
  noMatches: {
    marginTop: 16,
    fontSize: 16,
  },
});
