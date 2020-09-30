import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Components/Screens/HomeScreen";
import LocationScreen from "./Components/Screens/LocationScreen";

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
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}

export default App;
