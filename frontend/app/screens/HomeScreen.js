import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Platform,
  Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import theme from "@/config/theme";
import Search from "@/components/Search";
import MainMenuButton from "@/components/home-screen/MainMenuButton";
import { useEffect, useState } from "react";

export default function HomeScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState("");

  // State for is keyboard up? https://stackoverflow.com/a/71610889/6454135
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  function goToFoodList() {
    searchTerm.trim() && navigation.navigate("FoodList", { searchTerm });
  }

  function goToDailySummary() {
    navigation.navigate("DailySummary");
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
          Platform.OS !== "android" || (isKeyboardVisible ? { flex: 2.5 } : {}), // magic number
        ]}
      >
        <Image style={styles.logo} source={require("@/assets/logo.png")} />
        <Text style={styles.appTitle}>Food Tracker</Text>
        <Text style={styles.appSubtitle}>Analyze your food anywhere</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Search
          term={searchTerm}
          setTerm={setSearchTerm}
          submit={goToFoodList}
        />
        {(Platform.OS !== "android" || !isKeyboardVisible) && (
          <>
            <MainMenuButton
              label="Take Picture"
              icon="camera"
              onPress={() => navigation.navigate("Camera")}
              backgroundColor="#599f54"
            />
            <MainMenuButton
              label="Pick from Photos"
              icon="images"
              onPress={openImagePicker}
              backgroundColor="#e1ad5d"
            />
            <MainMenuButton
              label="Daily Summary"
              icon="chart-pie"
              onPress={goToDailySummary}
              backgroundColor="#9e292c"
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

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
    width: 768 / 4,
    height: 768 / 4,
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 48,
    fontWeight: "bold",
    paddingBottom: 8,
    color: theme.dark,
  },
  appSubtitle: {
    color: theme.dark,
  },
  buttonContainer: {
    flex: 1.1, // magic number for iphone se
    justifyContent: "space-evenly",
    alignItems: "stretch",
    marginHorizontal: 24,
  },
});
