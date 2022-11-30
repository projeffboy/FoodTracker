// Based off of this tutorial: https://www.youtube.com/watch?v=9EoKurp6V0I

import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Image } from "react-native";
import Constants from "expo-constants";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { RootSiblingParent } from "react-native-root-siblings";

import theme from "../config/theme";
import { recognizeFood } from "../helper/api";
import useHook from "../helper/useHook";
import NoCamera from "../components/NoCamera";
import Flash from "../components/Flash";
import CameraBottomButtons from "../components/CameraBottomButtons";
import Suggestions from "../components/Suggestions";

export default function CameraScreen({ route }) {
  const { image: galleryImage, width, height } = route.params || {};

  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [img, setImg] = useState(galleryImage);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef();

  const [{ data, loading, error }, recognizeFoodWrapper] =
    useHook(recognizeFood);

  async function takePicture() {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        // console.log(data);
        setImg(data.uri);
      } catch (e) {
        console.error(e);
      }
    }
  }

  useEffect(() => {
    // I have to put async func in another func or i get error
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (!img) {
      return;
    }

    recognizeFoodWrapper(img);
  }, [img]);

  if (!hasCameraPermission) {
    return <NoCamera />;
  }

  return (
    <RootSiblingParent>
      <View style={styles.container}>
        {!img ? (
          <Camera style={styles.camera} ref={cameraRef} flashMode={flash}>
            <Flash flash={flash} setFlash={setFlash} />
          </Camera>
        ) : (
          <View style={styles.camera}>
            <Image
              source={{ uri: img }}
              style={
                width && height ? { aspectRatio: width / height } : { flex: 1 }
              }
            />
          </View>
        )}

        {img && (
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
          image={img}
          setImage={setImg}
          galleryImage={galleryImage}
          takePicture={takePicture}
        />
      </View>
    </RootSiblingParent>
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
    height: 140, // magic number for 2 and a half list items
    paddingTop: 8,
  },
  suggestionsForLandscape: {
    flex: 1,
  },
});
