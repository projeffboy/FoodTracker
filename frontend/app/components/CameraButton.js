import * as React from "react";
import { StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import theme from "../config/theme";
import MyButton from "./MyButton";

const CameraButton = ({ label, onPress, icon, color }) => (
  <MyButton
    text={label}
    onPress={onPress}
    icon={
      <FontAwesome name={icon} size={32} color={color ? color : theme.dark} />
    }
    textStyle={styles.text}
    iconLeft
  />
);

export default CameraButton;

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: theme.dark,
  },
});
