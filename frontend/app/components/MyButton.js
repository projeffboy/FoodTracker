import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const MyButton = ({ text, onPress, icon, backgroundColor, color }) => {
  const styles = StyleSheet.create({
    button: {
      flexDirection: "row",
      alignItems: "center",
      padding: 8,
      borderRadius: 4,

      backgroundColor,
    },
    buttonText: {
      fontSize: 16,
      color,
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text} </Text>
      {icon}
    </TouchableOpacity>
  );
};

export default MyButton;
