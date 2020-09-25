import React from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Linking,
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
    height: "22%",
    alignSelf: "flex-end",
  },
  tabStyle: {
    width: "auto",
  },
  activeTintColor: "white",
  inactiveTintColor: "rgba(255, 255, 255, 0.5)",
  labelStyle: {
    fontSize: 17,
    fontWeight: "bold",
    margin: 0,
  },
  indicatorStyle: {
    height: 0,
  },
  scrollEnabled: true,
};

class HomeScreen extends React.Component {
  state = {
    location: "서울특별시 관악구",
  };
  render() {
    const { location } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 4 }}>
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
              <TouchableOpacity
                onPress={this._locationHandle}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Text style={styles.textLocation}>{location}</Text>
                <Image
                  style={{ height: 6, width: 11 }}
                  source={require(`${IMAGE_URL}/white_tri.png`)}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>

          <View style={styles.locationNav}>
            <Text style={styles.title}>국내현황</Text>
            <Tab.Navigator initialRouteName="전국" tabBarOptions={tabStyle}>
              <Tab.Screen name="전국" component={Korea} />
              <Tab.Screen name="우리 지역" component={Region} />
            </Tab.Navigator>
          </View>
          <TouchableOpacity
            style={styles.siteBox}
            onPress={this._goToCoronaSite}
          >
            <Text style={styles.site}>
              중앙재난안전대책본부 사이트 바로가기
            </Text>
          </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.bottomNav}>
          <Image
            style={[styles.circle]}
            source={require(`${IMAGE_URL}/first_circle.png`)}
          />
          <Image
            style={[styles.circle]}
            source={require(`${IMAGE_URL}/second_circle.png`)}
          />
          <Image
            style={[styles.circle]}
            source={require(`${IMAGE_URL}/third_circle.png`)}
          />
        </View>
      </View>
    );
  }

  _locationHandle = () => {
    console.log("click!");
  };

  _goToCoronaSite = () => {
    const URL = "http://ncov.mohw.go.kr/";
    Linking.openURL(URL).catch((err) => console.log(err));
  };
}

export default HomeScreen;
