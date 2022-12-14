import { forwardRef } from "react";
import { Platform, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default Picker = forwardRef(
  ({ value, onValueChange, styles, moreItems }, ref) => (
    <RNPickerSelect
      style={pickerStyles(styles)}
      ref={Platform.OS === "ios" ? ref : null}
      pickerProps={{ ref: Platform.OS === "android" ? ref : null }}
      value={value}
      onValueChange={onValueChange}
      placeholder={{}}
      useNativeAndroidPickerStyle={false}
      items={[
        { label: "gram (g)", inputLabel: "g", value: "g" },
        { label: "ounce (oz)", inputLabel: "oz", value: "oz" },
        { label: "pound (lb)", inputLabel: "lb", value: "lb" },
        // { label: "milliliter (ml)", inputLabel: "ml", value: "ml" },
        // { label: "teaspoon (tsp)", inputLabel: "tsp", value: "tsp" },
        // { label: "tablespoon (tbsp)", inputLabel: "tbsp", value: "tbsp" },
        // { label: "cup", inputLabel: "cup", value: "cup" },
        ...moreItems,
      ]}
    />
  )
);

const pickerStyles = styles =>
  StyleSheet.create({
    inputIOS: styles,
    inputAndroid: styles,
  });
