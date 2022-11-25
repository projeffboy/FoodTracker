// Based off of this tutorial: https://www.youtube.com/watch?v=9EoKurp6V0I

import { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Image, ActivityIndicator } from "react-native";
import Constants from "expo-constants";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import theme from "../config/theme";
import { recognizeFood } from "../helper/api";
import useHook from "../helper/useHook";
import NoCamera from "../components/NoCamera";
import Flash from "../components/Flash";
import CameraBottomButtons from "../components/CameraBottomButtons";
import Suggestions from "../components/Suggestions";

export default function CameraScreen({ navigation }) {
  const galleryImage = navigation.getParam("image");
  const width = navigation.getParam("width");
  const height = navigation.getParam("height");

  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [image, setImage] = useState(galleryImage);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef();

  const [{ data, loading, error }, recognizeFoodWrapper] =
    useHook(recognizeFood);

  useEffect(() => {
    // I have to put async func in another func or i get error
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (!image) {
      return;
    }

    recognizeFoodWrapper(image);
  }, [image]);

  if (!hasCameraPermission) {
    return <NoCamera />;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera style={styles.camera} ref={cameraRef} flashMode={flash}>
          <Flash flash={flash} setFlash={setFlash} />
        </Camera>
      ) : (
        <View style={styles.camera}>
          <Image
            source={{ uri: image }}
            style={
              width && height ? { aspectRatio: width / height } : { flex: 1 }
            }
          />
        </View>
      )}

      {image && (
        <View
          style={[
            styles.suggestions,
            width && height && width > height
              ? styles.suggestionsForLandscape
              : styles.suggestionsForPortrait,
          ]}
        >
          <Suggestions loading={loading} error={error} data={data} />
        </View>
      )}

      <CameraBottomButtons
        image={image}
        setImage={setImage}
        galleryImage={galleryImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent: "center",
    backgroundColor: theme.light,
  },
  camera: {
    flex: 1,
  },
  suggestions: {
    flex: 1,
    backgroundColor: theme.light,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
  },
  suggestionsForPortrait: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    bottom: 88, // magic number
    height: 130, // magic number for 2 and a half list items
    paddingTop: 8,
  },
  suggestionsForLandscape: {
    flex: 1,
  },
});
