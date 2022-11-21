import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFonts } from "expo-font";

export default function NutritionEntry({
  styles,
  nutrition,
  value,
  dailyValue,
  indent,
  italic,
  bold,
  borderBottom,
}) {
  const [loaded] = useFonts({
    "Helvetica-Italic": require("../assets/fonts/Helvetica-Italic.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <View
      style={[
        borderBottom || styles.thinBorderBottom,
        styles.entry,
        indent ? styles.indent : {},
      ]}
    >
      <View style={styles.entry}>
        <Text style={[styles.text, { fontFamily: "Helvetica-Italic" }]}>
          {italic}
        </Text>
        <Text style={styles[bold ? "boldText" : "text"]}>{nutrition} </Text>
        <Text style={styles.text}>{value}</Text>
      </View>
      <Text style={styles[bold || indent ? "boldText" : "text"]}>
        {dailyValue}
      </Text>
    </View>
  );
}
