import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default MyButton = ({
  text,
  onPress,
  icon,
  buttonStyle,
  textStyle,
  iconLeft = false,
}) => {
  const styles = StyleSheet.create({
    button: {
      flexDirection: iconLeft ? "row-reverse" : "row",
      alignItems: "center",
      padding: 8,
      borderRadius: 4,
      ...buttonStyle,
    },
    buttonText: {
      ["margin" + (iconLeft ? "Left" : "Right")]: 8,
      ...textStyle,
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
      {icon}
    </TouchableOpacity>
  );
};
