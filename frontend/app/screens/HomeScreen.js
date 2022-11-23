import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { withNavigation } from "react-navigation";

import theme from "../config/theme";
import Search from "../components/Search";
import BorderButton from "../components/BorderButton";
import { useEffect, useState } from "react";

function HomeScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState("");

  // https://stackoverflow.com/a/71610889/6454135
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  function navigate() {
    searchTerm.trim() && navigation.navigate("FoodList", { searchTerm });
  }

  async function openImagePicker() {
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      const { uri, width, height } = pickerResult;
      navigation.navigate("Camera", { image: uri, width, height });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.logoContainer,
          Platform.OS !== "android" || !isKeyboardVisible ? {} : { flex: 2.5 }, // magic number
        ]}
      >
        <Image style={styles.logo} source={require("../assets/icon.png")} />
        <Text style={styles.appTitle}>Food Tracker</Text>
        <Text style={styles.appSubtitle}>Analyze your food anywhere</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Search term={searchTerm} setTerm={setSearchTerm} submit={navigate} />
        {(Platform.OS !== "android" || !isKeyboardVisible) && (
          <>
            <BorderButton
              label="Take Picture"
              icon="camera"
              onPress={() => navigation.navigate("Camera")}
            />
            <BorderButton
              label="Pick from Photo Library"
              icon="images"
              onPress={openImagePicker}
            />
          </>
        )}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default withNavigation(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
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
    alignItems: "stretch",
    marginHorizontal: 24,
  },
});
