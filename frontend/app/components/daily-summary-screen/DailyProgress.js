import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  createObj,
  remove_prefix,
  round,
  sumObjectsByKey,
} from "@/helper/utility";
import { stdNutrients } from "@/helper/nutrition";
import theme from "@/config/theme";
import { TextInput } from "react-native-gesture-handler";

export default function DailyProgress({ styles, food }) {
  const [dailyCalories, setDailyCalories] = useState("2000");

  if (!food) {
    return;
  }

  const stdNutrientNames = Object.keys(stdNutrients);

  const nutrientGrams = food.map(({ nutrients }) => {
    if (!nutrients) {
      return {};
    }

    const nutrientNames = Object.keys(nutrients);
    const nutrientValues = Object.values(nutrients);
    const nutrientGrams = nutrientValues.map(value =>
      value[1][value[1].length - 1] === "g"
        ? round(remove_prefix(value)[0], 2)
        : value[0]
    );

    return createObj(nutrientNames, nutrientGrams);
  });
  const dailyNutrients = sumObjectsByKey(...nutrientGrams);

  return (
    <View style={styles.entries}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Your daily calorie intake:{" "}
        </Text>
        <TextInput
          style={{ height: 40, fontSize: 16 }}
          placeholder="fill here"
          keyboardType="number-pad"
          maxLength={5}
          onChangeText={setDailyCalories}
          value={dailyCalories}
        />
      </View>
      <View style={{ marginBottom: 32 }}>
        <FlatList
          ListHeaderComponent={<Text style={styles.header}>Goals</Text>}
          data={stdNutrientNames}
          keyExtractor={key => key}
          renderItem={({ item: stdNutrientName }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomWidth: 0.5,
                borderBottomColor: theme.dark,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: theme.dark,
                }}
              >
                {stdNutrientName}
              </Text>
              <Text style={{ fontSize: 16, color: theme.dark }}>
                {dailyNutrients[stdNutrientName] || 0} /{" "}
                {Math.round(
                  stdNutrients[stdNutrientName].dailyGrams *
                    (dailyCalories / 2000)
                )}
                {stdNutrientName === "Energy" ? " kcal" : "g"}
              </Text>
            </View>
          )}
        />
      </View>
      <FlatList
        ListHeaderComponent={<Text style={styles.header}>More Info</Text>}
        data={Object.entries(dailyNutrients)}
        keyExtractor={key => key[0]}
        renderItem={({ item: dailyNutrient }) => (
          <Text style={{ color: theme.dark }}>
            <Text style={{ fontWeight: "bold" }}>{dailyNutrient[0]}</Text>:{" "}
            {dailyNutrient[1]}
            {dailyNutrient[0] === "Energy" ? " kcal" : "g"}
          </Text>
        )}
      />
    </View>
  );
}
