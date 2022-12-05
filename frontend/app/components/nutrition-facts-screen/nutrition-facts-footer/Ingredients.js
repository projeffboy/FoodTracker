import { StyleSheet, Text, FlatList } from "react-native";
import Unorderedlist from "react-native-unordered-list";

import theme from "@/config/theme";

export default Ingredients = ({ ingredients }) =>
  ingredients.length > 0 && (
    <FlatList
      ListHeaderComponent={<Text style={styles.ingredients}>Ingredients</Text>}
      data={ingredients}
      keyExtractor={ingredient => ingredient.food + " - " + ingredient.grams}
      renderItem={({ item: { food, num, unit, grams } }) => {
        unit = unit.toLowerCase();

        let value = "";
        if (!["g", "gm"].includes(unit)) {
          const mapping = {
            fo: "fl oz",
            ts: "tsp",
            tb: "tbsp",
            c: "cup",
          };
          value = ` ${num} ${mapping[unit] || unit} or`;
        }

        return (
          <Unorderedlist>
            <Text>{food}</Text>
            <Unorderedlist>
              <Text style={{ color: theme.green }}>
                {value} {grams}g
              </Text>
            </Unorderedlist>
          </Unorderedlist>
        );
      }}
    />
  );

const styles = StyleSheet.create({
  ingredients: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
});
