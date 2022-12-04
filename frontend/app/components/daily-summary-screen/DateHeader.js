import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import theme from "@/config/theme";

export default DateHeader = ({ dates, dateIdx, setDateIdx }) => (
  <View style={styles.dateContainer}>
    <TouchableOpacity
      onPress={() => setDateIdx(dateIdx - 1)}
      disabled={dateIdx === 0}
    >
      <FontAwesome5
        name="chevron-circle-left"
        size={styles.date.fontSize}
        color={theme[dateIdx === 0 ? "medium" : "dark"]}
      />
    </TouchableOpacity>
    <Text style={styles.date}>
      {
        //current date
        new Date(dates[dateIdx]).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      }
    </Text>
    <TouchableOpacity
      onPress={() => setDateIdx(dateIdx + 1)}
      disabled={dateIdx === dates.length - 1}
    >
      <FontAwesome5
        name="chevron-circle-right"
        size={styles.date.fontSize}
        color={theme[dateIdx === dates.length - 1 ? "medium" : "dark"]}
      />
    </TouchableOpacity>
  </View>
);

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
