import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  Pressable,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import theme from "../config/theme";
import Search from "../components/Search";
import BorderButton from "../components/BorderButton";

const App = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.logoContainer}>
      <Image style={styles.logo} source={require("../assets/icon.png")} />
      <Text style={styles.appTitle}>Food Tracker</Text>
      <Text style={styles.appSubtitle}>Analyze your food anywhere</Text>
    </View>
    <View style={styles.buttonContainer}>
      <Search atFoodList={false} />
      <BorderButton
        label="Take Picture"
        icon="camera"
        onPress={() => navigation.navigate("Camera")}
      />
      <BorderButton
        label="Pick from Photo Library"
        icon="images"
        onPress={() => navigation.navigate("Camera")}
      />
    </View>
    <StatusBar style="auto" />
  </SafeAreaView>
);

export default App;

const styles = StyleSheet.create({
  container: {
    PaddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.light,
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
    color: theme.dark,
  },
  appSubtitle: {
    color: theme.dark,
  },
  buttonContainer: {
    flex: 1.25, // magic number for iphone se
    justifyContent: "space-evenly",
  },
});
