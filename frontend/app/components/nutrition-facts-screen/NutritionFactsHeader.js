import { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";

import {
  EditServing,
  ServingInput,
} from "@/components/nutrition-facts-screen/nutrition-facts-header/ServingInput";
import theme from "@/config/theme";
import ServingSize from "./nutrition-facts-header/ServingSize";

const veryBold = "Helvetica-Black"; // font has to be initialized in parent component

export default NutritionFactsHeader = ({
  styles: inheritedStyles,
  kcal,
  servings,
  setServings,
  servingSizeNum,
  setServingSizeNum,
  servingSizeUnit,
  setServingSizeUnit,
  servingSizes,
}) => {
  styles = { ...inheritedStyles, ...styles };

  const servingsRef = useRef();

  return (
    <View>
      <View style={[styles.thinBorderBottom, { paddingBottom: 0 }]}>
        <Text style={styles.h1}>Nutrition Facts</Text>
      </View>
      {/* Servings */}
      <View style={styles.servings}>
        <ServingInput
          style={[styles.h3, styles.notBold, { textAlign: "center" }]}
          ref={servingsRef}
          maxLength={2}
          value={servings}
          setValue={setServings}
          selectTextOnFocus
          keyboardType="number-pad"
        />
        <Text style={[styles.h3, styles.notBold]}> servings per container</Text>
        <EditServing ref={servingsRef} />
      </View>
      {/* Serving Size */}
      <ServingSize
        styles={styles}
        servingSizeUnit={servingSizeUnit}
        setServingSizeUnit={setServingSizeUnit}
        servingSizeNum={servingSizeNum}
        setServingSizeNum={setServingSizeNum}
        servingSizes={servingSizes}
      />
      {/* Calories */}
      <View style={styles.thickBorderBottom}>
        <View>
          <Text style={styles.boldText}>Amount per serving</Text>
        </View>
        <View style={styles.entry}>
          <Text style={styles.h2}>Calories</Text>
          <Text style={styles.h2}>{kcal}</Text>
        </View>
      </View>
      {/* Daily Value Table Header */}
      <View style={[styles.thinBorderBottom, { alignItems: "flex-end" }]}>
        <Text style={styles.boldText}>% Daily Value*</Text>
      </View>
    </View>
  );
};

const header = {
  color: theme.dark,
  fontFamily: veryBold,
};

let styles = StyleSheet.create({
  h1: {
    ...header,
    fontSize: 36,
  },
  h2: {
    ...header,
    fontSize: 28,
  },
  h3: {
    ...header,
    fontSize: 20,
  },
  servings: {
    flexDirection: "row",
    marginHorizontal: 8,
    alignItems: "center",
  },
});
