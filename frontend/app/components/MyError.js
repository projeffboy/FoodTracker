import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import theme from "@/config/theme";

export default MyError = ({ flex = 1 }) => (
  <View style={[styles.error, { flex }]}>
    <FontAwesome name="exclamation-circle" size={36} color={theme.dark} />
    <Text style={styles.errorText}>There was an error.</Text>
  </View>
);

const styles = StyleSheet.create({
  error: {
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    marginTop: 4,
    fontSize: 16,
  },
});
