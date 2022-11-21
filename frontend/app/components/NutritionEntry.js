import { StyleSheet, Text, View } from "react-native";
import React from "react";

const NutritionEntry = ({
  styles,
  nutrition,
  value,
  dailyValue,
  indent,
  italic,
  bold,
  borderBottom,
}) => (
  <View
    style={[
      borderBottom || styles.thinBorderBottom,
      styles.entry,
      indent ? styles.indent : {},
    ]}
  >
    <View style={styles.entry}>
      <Text style={[styles.text, { fontStyle: "oblique" }]}>{italic} </Text>
      <Text style={styles[bold ? "boldText" : "text"]}>{nutrition} </Text>
      <Text style={styles.text}>{value}</Text>
    </View>
    <Text style={styles.boldText}>{dailyValue}</Text>
  </View>
);

export default NutritionEntry;
