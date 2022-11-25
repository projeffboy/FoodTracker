import { View, Text, StyleSheet } from "react-native";
import theme from "../config/theme";

// when no camera permission
export default NoCamera = () => (
  <View style={styles.noCamera}>
    <Text style={styles.noCameraTitle}>No camera access</Text>
    <Text style={styles.noCameraSubtitle}>
      Please enable camera permission in settings
    </Text>
  </View>
);

const styles = StyleSheet.create({
  noCamera: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noCameraTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: theme.dark,
  },
  noCameraSubtitle: {
    fontSize: 14,
    color: theme.dark,
  },
});
