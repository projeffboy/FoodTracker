import { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Platform } from "react-native";

import {
  EditServing,
  ServingInput,
} from "@/components/nutrition-facts-screen/nutrition-facts-header/ServingInput";
import theme from "@/config/theme";
import Picker from "./serving-size/Picker";

export default ServingSize = ({
  styles: inheritedStyles,
  servingSizeUnit,
  setServingSizeUnit,
  servingSizeNum,
  setServingSizeNum,
  servingSizes,
}) => {
  styles = { ...inheritedStyles, ...styles };

  const servingSizeRef = useRef();
  const unitRef = useRef();
  const servingSizesPickerItems = servingSizes.map(({ num, unit }) => ({
    label: num + " " + unit,
    inputLabel: unit,
    value: unit,
  }));
  const maxCompactLength = 4;

  return (
    <View
      style={[
        styles.entry,
        styles.veryThickBorderBottom,
        {
          flexDirection:
            servingSizeUnit.length > maxCompactLength ? "column" : "row",
        },
      ]}
    >
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
      <View
        style={[
          styles.textAndButtons,
          {
            justifyContent: "flex-end",
            marginLeft: servingSizeUnit.length > maxCompactLength ? 64 : 0, // magic number
          },
        ]}
      >
        <ServingInput
          style={styles.h3}
          ref={servingSizeRef}
          maxLength={4}
          value={servingSizeNum}
          setValue={setServingSizeNum}
          keyboardType="decimal-pad"
        />
        <Text>{servingSizeUnit.length > maxCompactLength && " "}</Text>
        <Picker
          ref={unitRef}
          value={servingSizeUnit}
          onValueChange={setServingSizeUnit}
          styles={styles.h3}
          moreItems={servingSizesPickerItems}
        />
      </View>
    </View>
  );
};

let styles = StyleSheet.create({
  textAndButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
});
