import { StyleSheet, Text, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import theme from "../config/theme";

export default MainMenuButton = ({
  label,
  icon,
  onPress,
  backgroundColor = theme.dark,
}) => (
  <Pressable style={[styles.button, { backgroundColor }]} onPress={onPress}>
    {({ pressed }) => (
      <>
        <Text
          style={{
            ...styles.buttonText,
            color: pressed ? theme.accent : theme.light,
          }}
        >
          {label}
        </Text>
        <FontAwesome5
          name={icon}
          size={24}
          color={pressed ? theme.accent : theme.light}
        />
      </>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.light,
    marginRight: 8,
  },
});
