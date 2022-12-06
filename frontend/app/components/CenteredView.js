import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default CenteredView = ({ flex = 1, children }) => (
  <View style={[styles.container, { flex }]}>{children}</View>
);
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
