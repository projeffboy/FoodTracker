import { addToDiary } from "./async-storage";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-root-toast";

import theme from "@/config/theme";
import { StyleSheet, Text, View } from "react-native";

const options = {
  duration: Toast.durations.SHORT,
  opacity: 1,
  backgroundColor: theme.pink,
  textColor: theme.light,
  shadowColor: theme.medium,
};

export default function showToast(msg) {
  Toast.show(msg, options);
}

export function showToastWithIcon(msg, Icon) {
  const styles = StyleSheet.create({
    msgContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 0,
      margin: 0,
      marginBottom: -6, // magic numbers
    },
    msg: {
      color: options.textColor,
      fontSize: 16,
    },
  });

  const ToastContent = () => (
    <View style={styles.msgContainer}>
      <Text style={styles.msg}>{msg} </Text>
      <Icon size={20} color={options.textColor} />
    </View>
  );

  Toast.show(<ToastContent />, options);
}

export function addToDiaryWithFeedback(id, food, nutrients) {
  let toastMsg = "Error, food failed to add";
  let Icon = props =>
    Platform.OS === "ios" ? (
      <Ionicons name="ios-alert-circle-outline" {...props} />
    ) : (
      <MaterialIcons name="error-outline" {...props} />
    );

  if (addToDiary(id, food, nutrients)) {
    toastMsg = "Food added";
    Icon = props =>
      Platform.OS === "ios" ? (
        <Ionicons name="ios-checkmark" {...props} />
      ) : (
        <MaterialIcons name="check" {...props} />
      );
  }

  showToastWithIcon(toastMsg, Icon);
}
