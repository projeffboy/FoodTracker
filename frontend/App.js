import { RootSiblingParent } from "react-native-root-siblings";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./app/screens/HomeScreen";
import FoodListScreen from "./app/screens/FoodListScreen";
import CameraScreen from "./app/screens/CameraScreen";
import NutritionFactsScreen from "./app/screens/NutritionFactsScreen";
import DailySummaryScreen from "./app/screens/DailySummaryScreen";
import AddFood from "./app/components/AddFood";

const Stack = createNativeStackNavigator();

// RootSiblingParent is for the toast/snackbar/popup/in-app-notification
export default App = () => (
  <RootSiblingParent>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FoodList"
          component={FoodListScreen}
          options={{ title: "Food List" }}
        />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NutritionFacts"
          component={NutritionFactsScreen}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="DailySummary"
          component={DailySummaryScreen}
          options={{
            title: "Summary",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </RootSiblingParent>
);
