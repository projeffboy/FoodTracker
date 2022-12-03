import { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Platform } from "react-native";

import { EditServing, ServingInput } from "@/components/ServingInput";
import theme from "@/config/theme";
import Picker from "@/components/Picker";

const veryBold = "Helvetica-Black"; // font has to be initialized in parent component

export default NutritionFactsHeader = ({
  styles: moreStyles,
  kcal,
  servings,
  setServings,
  servingSize,
  setServingSize,
  servingSizeUnit,
  setServingSizeUnit,
  servingSizesText,
}) => {
  styles = { ...styles, ...moreStyles };

  const servingsRef = useRef();
  const servingSizeRef = useRef();
  const unitRef = useRef();
  const servingSizesPickerItems = servingSizesText.map(text => {
    return {
      label: text,
      inputLabel: text.replace(/^1/, ""),
      value: text,
    };
  });

  return (
    <View>
      <View style={[styles.thinBorderBottom, { paddingBottom: 0 }]}>
        <Text style={styles.h1}>Nutrition Facts</Text>
      </View>
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
      <View style={[styles.entry, styles.veryThickBorderBottom]}>
        <View style={styles.textAndButtons}>
          <Text style={styles.h3}>Serving size</Text>
          <EditServing ref={servingSizeRef} height={23} noText />
          <EditServing
            ref={unitRef}
            height={23}
            noText
            iconName="scale-balance"
            iosTogglePicker={Platform.OS === "ios"}
          />
        </View>
        <View style={styles.textAndButtons}>
          <ServingInput
            style={styles.h3}
            ref={servingSizeRef}
            maxLength={4}
            value={servingSize}
            setValue={setServingSize}
            keyboardType="decimal-pad"
          />
          <Picker
            ref={unitRef}
            value={servingSizeUnit}
            onValueChange={setServingSizeUnit}
            styles={styles.h3}
            moreItems={servingSizesPickerItems}
          />
        </View>
      </View>
      <View style={styles.thickBorderBottom}>
        <View>
          <Text style={styles.boldText}>Amount per serving</Text>
        </View>
        <View style={styles.entry}>
          <Text style={styles.h2}>Calories</Text>
          <Text style={styles.h2}>{kcal}</Text>
        </View>
      </View>
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
  textAndButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
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
});
