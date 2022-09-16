import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Button, Alert, Platform, StatusBar } from "react-native";
import * as ImagePicker from "expo-image-picker"
import * as MediaLibrary from "expo-media-library";
import Constants from "expo-constants";

import colors from "./app/config/colors.js"

export default function App() {

  const [image, setImage] = useState(null);
  const [hasCamerPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);

  useEffect(() => {
    (async () =>{
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, [])

  takePicture = async () => {
    if (!hasCamerPermission) Alert.alert("No camera permission", "Please enable camera permission in settings");
    else{
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
      });
      if (!result.cancelled) setImage(result.uri);
    }
  };

  selectPicture = async () => {
    if (!hasMediaLibraryPermission) {
      Alert.alert("No library permission", "Please enable library permission in settings");
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
        <Image style={styles.logo} source={require("./app/assets/icon.png")}/>
        <Text>Food Tracker: Analyze your food anywhere</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title = "Take Picture" onPress={ this.takePicture }/>
        <Button title = "Choose From Library" onPress={ this.selectPicture }/>
        <Button title = "Search"/>
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
  },
  logoContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 100,
    height: 100,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "space-evenly",
  }
});
