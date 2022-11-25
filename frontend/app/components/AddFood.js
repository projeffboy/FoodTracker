import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { addToDiaryWithFeedback } from "../helper/toast";

export default AddFood = ({ food, nutrients }) => {
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={() => addToDiaryWithFeedback(food, nutrients)}
    >
      <Text style={styles.buttonText}>Add to Diary </Text>
      <Ionicons
        name="ios-add-circle"
        size={24}
        color={styles.buttonText.color}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  buttonText: {
    fontSize: 18,
    color: "#007aff",
    textAlign: "center",
    marginHorizontal: 2,
  },
});
