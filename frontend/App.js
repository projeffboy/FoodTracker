import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./app/screens/HomeScreen";
import FoodListScreen from "./app/screens/FoodListScreen";
import CameraScreen from "./app/screens/CameraScreen";
import NutritionFactsScreen from "./app/screens/NutritionFactsScreen";
import DailySummaryScreen from "./app/screens/DailySummaryScreen";
import AddFood from "./app/components/AddFood";

const navigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    FoodList: {
      screen: FoodListScreen,
      navigationOptions: { title: "Food List" },
    },
    Camera: { screen: CameraScreen, navigationOptions: { headerShown: false } },
    NutritionFacts: {
      screen: NutritionFactsScreen,
      navigationOptions: ({ navigation }) => ({
        title: "",
        headerRight: () => (
          <AddFood
            id={navigation.getParam("id")}
            food={navigation.getParam("description")}
            nutrients={navigation.getParam("nutrients")}
          />
        ),
      }),
    },
    DailySummary: {
      screen: DailySummaryScreen,
      navigationOptions: {
        title: "Summary",
      },
    },
  },
  {
    initialRouteName: "Home",
  }
);

export default createAppContainer(navigator);
