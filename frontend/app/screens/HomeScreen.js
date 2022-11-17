import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { withNavigation } from "react-navigation";

import theme from "../config/theme";
import Search from "../components/Search";
import BorderButton from "../components/BorderButton";

function HomeScreen({ navigation }) {
  async function openImagePicker() {
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      const { uri, width, height } = pickerResult;
      navigation.navigate("Camera", { image: uri, width, height });
    }
  }

  return (
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
          onPress={openImagePicker}
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default withNavigation(HomeScreen);

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
