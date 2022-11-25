import { Text, View } from "react-native";
import React from "react";
import MyButton from "./MyButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../config/theme";
import showToast from "../helper/toast";
import { deleteAll, deleteKey } from "../helper/async-storage";

export default function DiaryDelete({ fmtDate }) {
  function deleteHelper(fn) {
    const toastMsg = fn() ? "Deleted." : "Failed to delete.";
    showToast(toastMsg);
  }

  function deleteDiaryDay() {
    deleteHelper(() => deleteKey("@diary:" + fmtDate));
  }

  function deleteDiary() {
    deleteHelper(deleteAll);
  }

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <MyButton
          text="Delete Today"
          onPress={deleteDiaryDay}
          icon={
            <MaterialCommunityIcons
              name="delete"
              size={24}
              color={theme.light}
            />
          }
          backgroundColor="#ed702d"
          color={theme.light}
        />
        <MyButton
          text="Delete Everything"
          onPress={deleteDiary}
          icon={
            <MaterialCommunityIcons
              name="delete-alert"
              size={24}
              color={theme.light}
            />
          }
          backgroundColor="#bb271a"
          color={theme.light}
        />
      </View>
    </View>
  );
}
