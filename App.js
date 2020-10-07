import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Components/Screens/HomeScreen";
import LocationScreen from "./Components/Screens/LocationScreen";
import SafeScoreScreen from "./Components/Screens/SafeScoreScreen";
import SafeScoreCheckScreen from "./Components/Screens/SafeScoreCheckScreen";
import TodayRouteScreen from "./Components/Screens/TodayRouteScreen";
import MyRouteScreen from "./Components/Screens/MyRouteScreen";

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <>
        <StatusBar translucent={true} backgroundColor={"transparent"} />
        <NavigationContainer>
          <Stack.Navigator headerMode={"none"}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Location" component={LocationScreen} />
            <Stack.Screen name="SafeScore" component={SafeScoreScreen} />
            <Stack.Screen
              name="SafeScoreCheck"
              component={SafeScoreCheckScreen}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen name="TodayRoute" component={TodayRouteScreen} />
            <Stack.Screen name="MyRoute" component={MyRouteScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}

export default App;
