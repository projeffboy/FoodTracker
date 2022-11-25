import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import theme from "../config/theme";

export default MyError = () => (
  <View style={styles.error}>
    <FontAwesome name="exclamation-circle" size={36} color={theme.dark} />
    <Text style={styles.errorText}>There was an error.</Text>
  </View>
);

const styles = StyleSheet.create({
  error: {
    alignItems: "center",
  },
  errorText: {
    marginTop: 4,
    fontSize: 16,
  },
});
