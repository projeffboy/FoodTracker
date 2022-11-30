import { StyleSheet, View } from "react-native";
import { Camera } from "expo-camera";

import theme from "@/config/theme";
import CameraButton from "./CameraButton";

export default Flash = ({ flash, setFlash }) => (
  <View style={styles.flashContainer}>
    <CameraButton
      onPress={() =>
        setFlash(
          flash === Camera.Constants.FlashMode.off
            ? Camera.Constants.FlashMode.on
            : Camera.Constants.FlashMode.off
        )
      }
      icon="flash"
      color={
        flash === Camera.Constants.FlashMode.off ? theme.medium : "#f1c40f"
      }
    />
  </View>
);

const styles = StyleSheet.create({
  flashContainer: {
    marginTop: 16,
    alignItems: "flex-end",
    paddingRight: 16,
  },
});
