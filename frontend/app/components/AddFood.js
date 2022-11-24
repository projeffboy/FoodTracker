import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default AddFood = ({ food, nutrients }) => {
  async function addToDiary() {
    try {
      const date = new Date();
      const fmtDate = date.toLocaleDateString();
      const key = "@diary:" + fmtDate;

      let diaryDay = await AsyncStorage.getItem(key);
      diaryDay = JSON.parse(diaryDay) || [];

      const newEntry = { food, nutrients };
      diaryDay.push(newEntry);
      await AsyncStorage.setItem(key, JSON.stringify(diaryDay));
      console.log(JSON.parse(await AsyncStorage.getItem(key)));
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={addToDiary}>
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
