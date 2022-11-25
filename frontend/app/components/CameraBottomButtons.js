import { StyleSheet, View } from "react-native";
import CameraButton from "./CameraButton";
import { withNavigation } from "react-navigation";
import * as ImagePicker from "expo-image-picker";
import theme from "../config/theme";

function CameraBottomButtons({
  navigation,
  image,
  setImage,
  galleryImage,
  takePicture,
}) {
  async function openImagePicker() {
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      const { uri } = pickerResult;
      setImage(uri);
    }
  }

  return (
    <View style={styles.buttonContainer}>
      <CameraButton
        label="Go back"
        onPress={() => navigation.navigate("Home")}
        icon="arrow-left"
      />
      {!image ? (
        <CameraButton
          label="Take a picture"
          onPress={takePicture}
          icon="camera"
        />
      ) : galleryImage ? (
        <CameraButton
          label="Other Photos"
          onPress={openImagePicker}
          icon="image"
        />
      ) : (
        <CameraButton
          label="Re-take"
          onPress={() => setImage()} // do not shorten this line
          icon="retweet"
        />
      )}
    </View>
  );
}

export default withNavigation(CameraBottomButtons);

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 20,
    backgroundColor: theme.light,
  },
});
