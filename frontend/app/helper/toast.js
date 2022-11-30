import { addToDiary } from "./async-storage";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-root-toast";

import theme from "../config/theme";
import { Text, View } from "react-native";

export default function showToast(msg) {
  Toast.show(msg, {
    duration: Toast.durations.SHORT,
    opacity: 1,
    backgroundColor: theme.accent,
    textColor: theme.dark,
    shadowColor: theme.medium,
  });
}

export function showToastWithIcon(msg) {
  const ToastContent = () => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 0,
        margin: 0,
        marginBottom: -6, // magic numbers
      }}
    >
      <Text>{msg} </Text>
      {Platform.OS === "ios" ? (
        <Ionicons name="ios-checkmark" size={20} color="black" />
      ) : (
        <MaterialIcons name="check" size={20} color="black" />
      )}
    </View>
  );

  Toast.show(<ToastContent />, {
    duration: Toast.durations.SHORT,
    opacity: 1,
    backgroundColor: theme.accent,
    textColor: theme.dark,
    shadowColor: theme.medium,
  });
}

export function addToDiaryWithFeedback(id, food, nutrients) {
  const toastMsg = addToDiary(id, food, nutrients)
    ? "Food added"
    : "Food failed to add";
  if (toastMsg) {
    showToastWithIcon(toastMsg);
  } else {
    showToast(toastMsg);
  }
}
