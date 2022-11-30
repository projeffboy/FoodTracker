import { StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import theme from "@/config/theme";

import CameraButton from "@/components/camera-screen/CameraButton";

export default function CameraBottomButtons({
  image,
  setImage,
  galleryImage,
  takePicture,
}) {
  async function openImagePicker() {
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
    }
  }

  function Retry() {
    return galleryImage ? (
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
    );
  }

  const navigation = useNavigation();

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
      ) : (
        <Retry />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 20,
    backgroundColor: theme.light,
  },
});
