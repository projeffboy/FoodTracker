import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function NutritionFactsScreen({ navigation }) {
  const food = navigation.getParam("food");

  return (
    <View style={styles.dummy}>
      <Text style={{ fontSize: 16 }}>Display nutrition facts here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dummy: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
