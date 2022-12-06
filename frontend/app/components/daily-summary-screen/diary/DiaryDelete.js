import { StyleSheet, View } from "react-native";
import React from "react";
import MyButton from "@/components/MyButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "@/config/theme";
import showToast from "@/helper/toast";
import { deleteAll, deleteDiaryDay } from "@/helper/async-storage";

export default function DiaryDelete({ date, refresh }) {
  async function deleteHelper(fn) {
    const success = await fn();
    const toastMsg = success ? "Deleted." : "Failed to delete.";
    showToast(toastMsg);
    refresh();
  }

  function deleteDiaryDayWrapper() {
    deleteHelper(() => deleteDiaryDay(date));
  }

  function deleteAllWrapper() {
    deleteHelper(deleteAll);
  }

  return (
    <View>
      <View style={styles.btns}>
        <MyButton
          text="Delete Today"
          onPress={deleteDiaryDayWrapper}
          icon={
            <MaterialCommunityIcons
              name="delete"
              size={24}
              color={theme.light}
            />
          }
          buttonStyle={{ backgroundColor: theme.violet }}
          textStyle={{ color: theme.light }}
        />
        <MyButton
          text="Delete Everything"
          onPress={deleteAllWrapper}
          icon={
            <MaterialCommunityIcons
              name="delete-alert"
              size={24}
              color={theme.light}
            />
          }
          buttonStyle={{ backgroundColor: theme.darkRed }}
          textStyle={{ color: theme.light }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btns: {
    marginTop: 32,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
