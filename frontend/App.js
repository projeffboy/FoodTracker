import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./app/screens/HomeScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

export default createAppContainer(navigator);
