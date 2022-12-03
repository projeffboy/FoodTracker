import { View, Text, StyleSheet } from "react-native";

import Ingredients from "./nutrition-facts-footer/Ingredients";

export default NutritionFactsFooter = ({ textStyles, ingredients }) => (
  <View style={styles.finePrintContainer}>
    <Text style={[textStyles, styles.finePrint]}>
      The % Daily Value (DV) tells you how much a nutrient in a serving of food
      contributes to a daily diet. 2,000 calories a day is used for general
      nutrition advice.
    </Text>
    <Text></Text>
    <Ingredients ingredients={ingredients} />
  </View>
);

const styles = StyleSheet.create({
  finePrintContainer: {
    marginHorizontal: 8,
    marginBottom: 8,
  },
  finePrint: {
    fontSize: 10,
    letterSpacing: -0.5,
  },
});
