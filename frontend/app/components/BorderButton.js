import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

import theme from "../config/theme";

const BorderButton = ({ label, icon, onPress }) => (
  <Pressable style={styles.button} onPress={onPress}>
    {({ pressed }) => (
      <>
        <Text
          style={{
            ...styles.buttonText,
            color: pressed ? theme.accent : theme.light,
          }}
        >
          {label}
        </Text>
        <FontAwesome5
          name={icon}
          size={24}
          color={pressed ? theme.accent : theme.light}
        />
      </>
    )}
  </Pressable>
);

export default BorderButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 24,
    borderRadius: 4,
    backgroundColor: theme.dark,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.light,
    marginRight: 8,
  },
});
