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
import * as Font from "expo-font";
import * as fmodule from "../../FunctionModule";

import firstCircle from "../../assets/home/first_circle.png";
import secondCircle from "../../assets/home/second_circle.png";
import thirdCircle from "../../assets/home/third_circle.png";

// 하단 메뉴
const menus = [
  { src: firstCircle, text: "TODAY 이동경로" },
  { src: secondCircle, text: "나의 안전지수" },
  { src: thirdCircle, text: "나의\n이동기록" },
];
// base url
const IMAGE_URL = "../../assets/home";
// 디바이스의 화면 세로 길이
const { height } = Dimensions.get("window");

// React Navigation v5
const Tab = createMaterialTopTabNavigator();
const tabStyle = {
  style: {
    // 메뉴 글씨 배경 색상
    backgroundColor: "transparent",
    height: "22%",
    alignSelf: "flex-end",
  },
  tabStyle: {
    width: "auto",
  },
  // active 메뉴 글씨 색상
  activeTintColor: "white",
  // inactive 메뉴 글씨 색상
  inactiveTintColor: "rgba(255, 255, 255, 0.5)",
  // 글씨 스타일
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

// 첫 화면
class HomeScreen extends React.Component {
  state = {
    // 위치 정보 (지역명)
    location: "",
    // Location 설정 완료 여부
    isLoaded: false,
  };

  // 위치 얻어오기
  _callAPI = async () => {
    // 현 위치 지역명 가져오기
    const location = await fmodule._getLocation(false);
    // 가져온 위치 설정 및 완료로 변경
    this.setState({
      location: location,
      isLoaded: true,
    });
  };

  componentDidMount() {
    if (this.props.route.params != undefined) {
      // 원하는 지역으로 설정한 내역이 있다면
      this.setState({
        location: this.props.route.params.settingLocation,
        isLoaded: true,
      });
    } else {
      // 원하는 지역으로 설정하지 않았다면 현 위치로 지역 지정
      this._callAPI();
    }
  }

  render() {
    const { location, isLoaded } = this.state;

    return isLoaded ? (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* Top Navigation */}
          <View style={styles.topNavContainer}>
            {/* 둥근 메뉴 이미지 */}
            <ImageBackground
              style={styles.topNavImg}
              source={require(`${IMAGE_URL}/top_bar.png`)}
            >
              {/* 위치 아이콘 */}
              <Image
                style={{ height: 20, width: 16 }}
                source={require(`${IMAGE_URL}/location_icon.png`)}
              />
              {/* 위치 변경 화면 이동 버튼 */}
              <TouchableOpacity
                onPress={this._locationHandle}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                {/* 현 설정 위치 텍스트 */}
                <Text style={styles.textLocation}>{location}</Text>
                {/* 삼각형 아이콘 */}
                <Image
                  style={{ height: 6, width: 11 }}
                  source={require(`${IMAGE_URL}/white_tri.png`)}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>

          {/* 국내현황 ~ 사이트 바로가기 */}
          <View style={styles.contentContainer}>
            {/* 화면의 37% 차지 */}
            <View style={{ height: height * 0.37 }}>
              <Text style={styles.textContentTitle}>국내현황</Text>
              {/* React Navigation */}
              <Tab.Navigator initialRouteName="전국" tabBarOptions={tabStyle}>
                {/* 전국 탭 */}
                <Tab.Screen
                  name="전국"
                  children={() => <Area isRegion={false} />}
                />
                {/* 우리 지역 탭 */}
                <Tab.Screen
                  name="우리 지역"
                  children={() => <Area location={location} isRegion={true} />}
                />
              </Tab.Navigator>

              {/* 중앙재난안전대책본부 사이트 바로가기 버튼 */}
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

        {/* Bottom Navigation */}
        <View style={styles.bottomNavContainer}>
          {Platform.isPad || (
            // 패드가 아니면
            // today 이동경로 메뉴 누를 때 투명도로 인한 배경 비침 방지
            <View style={styles.btnCircle}>
              <Image
                source={firstCircle}
                style={{ height: height * 0.16 + 94 * 2 }}
                resizeMode={"contain"}
              />
            </View>
          )}
          {menus.map((menu, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={Platform.isPad ? styles.padMenu : styles.btnCircle}
                // 누르면 화면 전환
                onPress={() => {
                  this._bottomMenuHandle(menu.text);
                }}
              >
                {Platform.isPad || (
                  <Image
                    // 원 이미지
                    source={menu.src}
                    // 이미지 크기 3단계로
                    style={{ height: height * 0.16 + 94 * (2 - index) }}
                    resizeMode={"contain"}
                  />
                )}
                {/* 삼각형 아이콘 & 메뉴 텍스트 */}
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
                  {/* 삼각형 아이콘 */}
                  <Image
                    style={{ height: 7, width: 13.5, alignSelf: "center" }}
                    source={require(`${IMAGE_URL}/grey_tri.png`)}
                  />
                  {/* 메뉴 텍스트 */}
                  <Text style={styles.textMenu}>{menu.text}</Text>
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

  // 지역 설정 버튼 (지역명) 눌렀을 때 실행
  _locationHandle = () => {
    const { navigation } = this.props;
    navigation.push("Location");
  };

  // 중앙재난안전대책본부 사이트 바로가기
  _goToCoronaSite = () => {
    const URL = "http://ncov.mohw.go.kr/";
    Linking.openURL(URL).catch((err) => console.log(err));
  };

  // 하단 메뉴 화면 전환
  _bottomMenuHandle = (textMenu) => {
    const { navigation } = this.props;
    if (textMenu == menus[0].text) {
      navigation.push("TodayRoute");
    } else if (textMenu == menus[1].text) {
      navigation.push("SafeScore");
    } else {
      navigation.push("MyRoute");
    }
  };
}

export default HomeScreen;
