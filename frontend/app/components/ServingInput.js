import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import theme from "@/config/theme";
import { forwardRef } from "react";

// make sure the two ref arguments are the same

export const ServingInput = forwardRef(
  (
    { style, maxLength, value, setValue, selectTextOnFocus, keyboardType },
    ref
  ) => (
    <TextInput
      style={style}
      ref={ref}
      keyboardType={keyboardType}
      maxLength={maxLength}
      value={value}
      onChangeText={text => setValue(text)}
      cursorColor={backgroundColor}
      selectionColor={backgroundColor}
      selectTextOnFocus={selectTextOnFocus}
      onEndEditing={() => {
        let formattedValue = String(Number(value));

        if (isNaN(formattedValue)) {
          setValue("0");
        } else if (value.trim() === "") {
          setValue("0");
        } else if (value[0] === "0" && value.length > 1) {
          // remove unnecessary 0's
          setValue(formattedValue);
        }
      }}
    />
  )
);

export const EditServing = forwardRef(
  (
    {
      height,
      iconHeight = 19,
      noText = "Edit ",
      iconName = "pencil",
      iosTogglePicker,
    },
    ref
  ) => (
    <TouchableOpacity
      onPress={() =>
        iosTogglePicker ? ref?.current?.togglePicker() : ref?.current?.focus()
      }
      style={[styles.editServingButton, height ? { height } : {}]}
    >
      <Text style={styles.editServingText}>{noText}</Text>
      <MaterialCommunityIcons
        name={iconName}
        size={iconHeight} // magic number
        color={styles.editServingText.color}
      />
    </TouchableOpacity>
  )
);

const backgroundColor = theme.green;

const styles = StyleSheet.create({
  editServingButton: {
    flexDirection: "row",
    marginLeft: 8,
    backgroundColor: backgroundColor,
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  editServingText: {
    color: theme.light,
    fontSize: 12,
  },
});
