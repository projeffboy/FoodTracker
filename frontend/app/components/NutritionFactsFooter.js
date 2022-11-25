import { View, Text, StyleSheet } from "react-native";

export default NutritionFactsFooter = ({ textStyles }) => (
  <View style={styles.finePrintContainer}>
    <Text style={[textStyles, styles.finePrint]}>
      The % Daily Value (DV) tells you how much a nutrient in a serving of food
      contributes to a daily diet. 2,000 calories a day is used for general
      nutrition advice.
    </Text>
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
