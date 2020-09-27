import React from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import styles from "../../Styles/HomeStyles";
import Korea from "../Korea";
import Region from "../Region";
import * as Location from "expo-location";
import { AppLoading } from "expo";
import * as config from "../../config";

import firstCircle from "../../assets/home/first_circle.png";
import secondCircle from "../../assets/home/second_circle.png";
import thirdCircle from "../../assets/home/third_circle.png";

const GOOGLE_API_KEY = config.GOOGLE_API_KEY;

const menus = {
  first: [firstCircle, "나의 안전지수"],
  second: [secondCircle, "TODAY 이동경로"],
  third: [thirdCircle, "나의\n이동기록"],
};
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
    location: "",
    isLoaded: false,
  };

  _getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      this._getReverseGeo(latitude, longitude);
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }
  };

  _getReverseGeo = async (latitude, longitude) => {
    const GEOLOCATION_API_URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
    await fetch(GEOLOCATION_API_URL)
      .then((response) => response.json())
      .then((data) => {
        const { long_name } = data.results[0].address_components[3];
        this.setState({
          location: long_name,
          isLoaded: true,
        });
      });
  };

  componentDidMount() {
    this._getLocation();
  }

  render() {
    const { location, isLoaded } = this.state;

    return isLoaded ? (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 4 }}>
          <View style={styles.topNavContainer}>
            <ImageBackground
              style={styles.topNavContainer}
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

          <View style={styles.contentContainer}>
            <Text style={styles.textContentTitle}>국내현황</Text>
            <Tab.Navigator initialRouteName="전국" tabBarOptions={tabStyle}>
              <Tab.Screen name="전국" component={Korea} />
              <Tab.Screen
                name="우리 지역"
                children={() => <Region location={location} />}
              />
            </Tab.Navigator>
          </View>

          <TouchableOpacity
            style={styles.btnSite}
            onPress={this._goToCoronaSite}
          >
            <Text style={styles.textSite}>
              중앙재난안전대책본부 사이트 바로가기
            </Text>
          </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.bottomNavContainer}>
          {Object.values(menus).map((menu, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.btnCircle}
                onPress={() => {
                  console.log(`${menu}`);
                }}
              >
                <Image source={menu[0]} />
                <View style={styles.textMenuContainer}>
                  <Image
                    style={{ height: 7, width: 13.5, alignSelf: "center" }}
                    source={require(`${IMAGE_URL}/grey_tri.png`)}
                  />
                  <Text style={styles.textMenu}>{menu[1]}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    ) : (
      <AppLoading />
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
