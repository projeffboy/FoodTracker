import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { FontAwesome5 } from "@expo/vector-icons";
import theme from "../config/theme";
import Diary from "../components/Diary";
import { useState } from "react";

const DailySummaryScreen = () => {
  const [numDaysBefore, setNumDaysBefore] = useState(0);

  function getDate() {
    const date = new Date();
    if (numDaysBefore !== 0) {
      date.setDate(date.getDate() - numDaysBefore);
    }

    return date;
  }

  return (
    <RootSiblingParent>
      <View>
        <View style={styles.dateContainer}>
          <TouchableOpacity onPress={() => setNumDaysBefore(numDaysBefore + 1)}>
            <FontAwesome5
              name="chevron-circle-left"
              size={styles.date.fontSize}
              color={theme.dark}
            />
          </TouchableOpacity>
          <Text style={styles.date}>
            {getDate().toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Text>
          <TouchableOpacity
            onPress={() => setNumDaysBefore(numDaysBefore - 1)}
            disabled={numDaysBefore === 0}
          >
            <FontAwesome5
              name="chevron-circle-right"
              size={styles.date.fontSize}
              color={theme[numDaysBefore === 0 ? "medium" : "dark"]}
            />
          </TouchableOpacity>
        </View>

        <Diary fmtDate={getDate().toLocaleDateString()} />
      </View>
    </RootSiblingParent>
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