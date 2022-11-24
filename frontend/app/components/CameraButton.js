// Based off of this tutorial: https://www.youtube.com/watch?v=9EoKurp6V0I

import * as React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import theme from "../config/theme";

const CameraButton = ({ label, onPress, icon, color }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <FontAwesome name={icon} size={32} color={color ? color : theme.dark} />
    <Text style={styles.text}>{label}</Text>
  </TouchableOpacity>
);

export default CameraButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: theme.dark,
    marginLeft: 10,
  },
});
