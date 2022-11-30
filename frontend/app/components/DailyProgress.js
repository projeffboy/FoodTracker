import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default DailyProgress = ({ data }) => {
  const nutrientNames = Object.keys(data?.[0]?.nutrients || {});
  const nutrientValues = Object.values(data || {})
    .map(value => value[0])
    .reduce();

  return (
    <View>
      <Text>DailyProgress</Text>
      {console.log(data)}
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({});
