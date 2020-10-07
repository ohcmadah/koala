import React from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import styles from "../../Styles/HomeStyles";
import Area from "../Area";
import { AppLoading } from "expo";
import * as fmodule from "../../FunctionModule";

import firstCircle from "../../assets/home/first_circle.png";
import secondCircle from "../../assets/home/second_circle.png";
import thirdCircle from "../../assets/home/third_circle.png";

const menus = {
  first: [firstCircle, "TODAY 이동경로"],
  second: [secondCircle, "나의 안전지수"],
  third: [thirdCircle, "나의\n이동기록"],
};
const IMAGE_URL = "../../assets/home";
const { width, height } = Dimensions.get("window");

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

  _callAPI = async () => {
    const location = await fmodule._getLocation(false);
    this.setState({
      location: location,
      isLoaded: true,
    });
  };

  componentDidMount() {
    if (this.props.route.params != undefined) {
      this.setState({
        location: this.props.route.params.settingLocation,
        isLoaded: true,
      });
    } else {
      this._callAPI();
    }
  }

  render() {
    const { location, isLoaded } = this.state;

    return isLoaded ? (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.topNavContainer}>
            <ImageBackground
              style={styles.topNavImg}
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
            <View style={{ height: height * 0.37 }}>
              <Text style={styles.textContentTitle}>국내현황</Text>
              <Tab.Navigator initialRouteName="전국" tabBarOptions={tabStyle}>
                <Tab.Screen
                  name="전국"
                  children={() => <Area isRegion={false} />}
                />
                <Tab.Screen
                  name="우리 지역"
                  children={() => <Area location={location} isRegion={true} />}
                />
              </Tab.Navigator>
              <TouchableOpacity
                style={styles.btnSite}
                onPress={this._goToCoronaSite}
              >
                <Text style={styles.textSite}>
                  중앙재난안전대책본부 사이트 바로가기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>

        <View style={styles.bottomNavContainer}>
          {Platform.isPad ? (
            <></>
          ) : (
            <View style={styles.btnCircle}>
              <Image
                source={firstCircle}
                style={{ height: height * 0.16 + 94 * 2 }}
                resizeMode={"contain"}
              />
            </View>
          )}
          {Object.values(menus).map((menu, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={Platform.isPad ? styles.padMenu : styles.btnCircle}
                onPress={() => {
                  this._bottomMenuHandle(menu[1]);
                }}
              >
                {Platform.isPad ? (
                  <></>
                ) : (
                  <Image
                    source={menu[0]}
                    style={{ height: height * 0.16 + 94 * (2 - index) }}
                    resizeMode={"contain"}
                  />
                )}
                <View
                  style={
                    Platform.isPad
                      ? [
                          styles.padTextMenu,
                          { marginBottom: ((height * 0.3) / 3) * (2 - index) },
                        ]
                      : styles.textMenuContainer
                  }
                >
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
    const { navigation } = this.props;
    navigation.push("Location");
  };

  _goToCoronaSite = () => {
    const URL = "http://ncov.mohw.go.kr/";
    Linking.openURL(URL).catch((err) => console.log(err));
  };

  _bottomMenuHandle = (textMenu) => {
    const { navigation } = this.props;
    if (textMenu == menus.first[1]) {
      navigation.push("TodayRoute");
    } else if (textMenu == menus.second[1]) {
      navigation.push("SafeScore");
    } else {
      navigation.push("MyRoute");
    }
  };
}

export default HomeScreen;
