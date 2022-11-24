import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import theme from "../config/theme";
import Nutrition from "../helper/nutrition";

const DailySummaryScreen = () => {
  const nutrition = new Nutrition();

  return (
    <View>
      <View style={styles.dateContainer}>
        <TouchableOpacity>
          <FontAwesome5
            name="chevron-circle-left"
            size={styles.date.fontSize}
            color="black"
          />
        </TouchableOpacity>
        <Text style={styles.date}>Nov 24, 2022</Text>
        <TouchableOpacity>
          <FontAwesome5
            name="chevron-circle-right"
            size={styles.date.fontSize}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <View></View>
    </View>
  );
};

export default DailySummaryScreen;

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  date: {
    color: theme.dark,
    fontSize: 24,
  },
});
