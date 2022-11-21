import { StyleSheet, Image, View, Text } from "react-native";
import React from "react";

export default function NutritionFactsScreen({ navigation }) {
  const food = navigation.getParam("foodNutrients");

  return (
    <View style={styles.dummy}>
      <Text style={{ fontSize: 18, marginVertical: 16 }}>
        Select serving size (make this a dropdown)
      </Text>
      <Image
        source={require("../assets/nutrition-facts.png")}
        style={{ width: 752 / 2.25, height: 1444 / 2.25 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dummy: {
    alignItems: "center",
  },
});
