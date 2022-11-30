import { StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import theme from "@/config/theme";
import MyButton from "@/components/MyButton";

export default MainMenuButton = ({
  label,
  icon,
  onPress,
  backgroundColor = theme.dark,
}) => (
  <MyButton
    text={label}
    onPress={onPress}
    icon={
      <FontAwesome5 name={icon} size={24} color={styles.buttonText.color} />
    }
    buttonStyle={{ ...styles.button, backgroundColor }}
    textStyle={styles.buttonText}
  />
);

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    padding: 20,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.light,
  },
});
