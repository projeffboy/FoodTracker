// Based off of this tutorial: https://www.youtube.com/watch?v=9EoKurp6V0I

import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Constants from "expo-constants";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import BorderlessButton from "../components/BorderlessButton";

import theme from "../config/theme";
import { withNavigation } from "react-navigation";
import FoodList from "../components/FoodList";
import useFoods from "../hooks/useFoods";

function CameraScreen({ navigation }) {
  const galleryImage = navigation.getParam("image");
  const width = navigation.getParam("width");
  const height = navigation.getParam("height");

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(galleryImage);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  const [{ data, loading, error }, searchFoods] = useFoods();

  useEffect(() => {
    searchFoods("whole wheat bread");
  }, []);

  useEffect(() => {
    // I have to put async func in another func or i get error
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  async function takePicture() {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        // console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  }

  if (hasCameraPermission === false) {
    return (
      <View style={styles.noCamera}>
        <Text style={styles.noCameraTitle}>No camera access</Text>
        <Text style={styles.noCameraSubtitle}>
          Please enable camera permission in settings
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera style={styles.camera} ref={cameraRef} flashMode={flash}>
          <View style={styles.flashContainer}>
            <BorderlessButton
              onPress={() =>
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                )
              }
              icon="flash"
              color={
                flash === Camera.Constants.FlashMode.off
                  ? theme.medium
                  : "#f1c40f"
              }
            />
          </View>
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
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <Text>Camera recognition coming soon</Text>
          {/* <FoodList foods={data?.foods} /> */}
        </View>
      )}

      <View style={styles.buttonContainer}>
        <BorderlessButton
          label="Go back"
          onPress={() => navigation.navigate("Home")}
          icon="arrow-left"
        />
        {!image ? (
          <BorderlessButton
            label="Take a picture"
            onPress={takePicture}
            icon="camera"
          />
        ) : (
          <BorderlessButton
            label="Re-take"
            onPress={() => setImage(null)}
            icon="retweet"
          />
        )}
      </View>
    </View>
  );
}

export default withNavigation(CameraScreen);

const styles = StyleSheet.create({
  // camera denied
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
  // camera allowed
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent: "center",
    backgroundColor: theme.light,
  },
  camera: {
    flex: 1,
  },
  flashContainer: {
    marginTop: 16,
    alignItems: "flex-end",
    paddingRight: 16,
  },
  suggestions: {
    flex: 1,
    backgroundColor: theme.light,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  suggestionsForPortrait: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    bottom: 88, // magic number
    height: 130, // magic number for 2 and a half list items
  },
  suggestionsForLandscape: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 20,
    backgroundColor: theme.light,
  },
});
