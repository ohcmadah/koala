import React from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import styles from "../../Styles/HomeStyles";
import Korea from "../Korea";
import Region from "../Region";

const IMAGE_URL = "../../assets/home";

const Tab = createMaterialTopTabNavigator();
const tabStyle = {
  style: {
    backgroundColor: "transparent",
    height: "8%",
    width: 180,
    alignSelf: "flex-end",
  },
  activeTintColor: "white",
  inactiveTintColor: "rgba(255, 255, 255, 0.5)",
  labelStyle: {
    fontSize: 17,
    fontWeight: "bold",
    margin: 0,
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: "white",
    width: 50,
    left: 20,
  },
};

class HomeScreen extends React.Component {
  state = {
    location: "서울특별시 관악구",
  };
  render() {
    const { location } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <ImageBackground
            style={styles.topBar}
            resizeMode={"contain"}
            source={require(`${IMAGE_URL}/top_bar.png`)}
          >
            <Image
              style={{ height: 20, width: 16 }}
              source={require(`${IMAGE_URL}/location_icon.png`)}
            />
            <Text style={styles.textLocation}>{location}</Text>
            <TouchableOpacity>
              <Image
                style={{ height: 6, width: 11 }}
                source={require(`${IMAGE_URL}/white_tri.png`)}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>국내현황</Text>
          <Tab.Navigator initialRouteName="전국" tabBarOptions={tabStyle}>
            <Tab.Screen name="전국" component={Korea} />
            <Tab.Screen name="우리 지역" component={Region} />
          </Tab.Navigator>
        </View>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;
