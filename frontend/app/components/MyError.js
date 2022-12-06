import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import theme from "@/config/theme";
import CenteredView from "./CenteredView";

export default MyError = ({ flex = 1 }) => (
  <CenteredView>
    <FontAwesome name="exclamation-circle" size={36} color={theme.dark} />
    <Text style={styles.errorText}>There was an error.</Text>
  </CenteredView>
);

const styles = StyleSheet.create({
  errorText: {
    marginTop: 4,
    fontSize: 16,
    color: theme.dark,
  },
});
