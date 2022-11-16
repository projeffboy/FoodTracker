import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Platform,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import Constants from "expo-constants";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

import colors from "./app/config/colors.js";
import Search from "./app/components/Search.js";

const light = "#eee";
const medium = "grey";
const dark = "#222";

export default function App() {
  const [image, setImage] = useState(null);
  const [hasCamerPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(null);

  useEffect(() => {
    (async () => {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (!hasCamerPermission)
      Alert.alert(
        "No camera permission",
        "Please enable camera permission in settings"
      );
    else {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
      });
      if (!result.cancelled) setImage(result.uri);
    }
  };

  const selectPicture = async () => {
    if (!hasMediaLibraryPermission) {
      Alert.alert(
        "No library permission",
        "Please enable library permission in settings"
      );
    }
    if (hasMediaLibraryPermission) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) setImage(result.uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("./app/assets/icon.png")} />
        <Text style={styles.appTitle}>Food Tracker</Text>
        <Text style={styles.appSubtitle}>Analyze your food anywhere</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Search iconColor={medium} />
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Take Picture</Text>
          <FontAwesome name="camera" size={24} color={light} />
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Pick from Photo Library</Text>
          <FontAwesome5 name="images" size={24} color={light} />
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    PaddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: light,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 1024 / 4,
    height: 768 / 4,
  },
  appTitle: {
    fontSize: 48,
    fontWeight: "bold",
    paddingBottom: 10,
    color: dark,
  },
  appSubtitle: {
    color: dark,
  },
  buttonContainer: {
    flex: 1.25, // magic number for iphone se
    justifyContent: "space-evenly",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 24,
    borderRadius: 4,
    backgroundColor: dark,
    paddingVertical: 24,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: light,
    marginRight: 8,
  },
});
