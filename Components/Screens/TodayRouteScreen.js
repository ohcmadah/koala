import React from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../Styles/TodayRouteStyles";
import { _getLocation } from "../../FunctionModule";

const IMAGE_URL = "../../assets/today-route";
const { height } = Dimensions.get("window");

class TodayRoute extends React.Component {
  state = {
    haveLocation: false,
    haveLocations: true,
  };
  render() {
    const { haveLocation, haveLocations } = this.state;
    const cardHeight = haveLocation ? height * 0.45 : height * 0.55;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.navContainer}>
          <TouchableOpacity style={styles.btnBack}>
            <Image
              source={require(IMAGE_URL + "/btn_back.png")}
              style={{ width: 10, height: 20 }}
            />
          </TouchableOpacity>
          <Text style={styles.textNav}>{"TODAY 이동경로"}</Text>
          <View style={{ width: 30 }} />
        </View>

        <ImageBackground
          source={require(IMAGE_URL + "/background.png")}
          style={styles.backgroundImg}
        >
          <View style={styles.contentContainer}>
            <TouchableOpacity style={{ alignSelf: "center" }}>
              <Image
                source={require(IMAGE_URL + "/btn_location.png")}
                style={{ width: 92, height: 92, resizeMode: "contain" }}
              />
            </TouchableOpacity>
            {haveLocation ? (
              <View style={styles.locationContainer}>
                <Text style={styles.textLocation}>
                  {"강원 동해시 평원로 100"}
                </Text>
                <View style={styles.btnContainer}>
                  <TouchableOpacity style={styles.btnCircle}>
                    <Image
                      source={require(IMAGE_URL + "/btn_check.png")}
                      style={[styles.btnImg, { marginRight: 12 }]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnCircle}>
                    <Image
                      source={require(IMAGE_URL + "/btn_cancel.png")}
                      style={styles.btnImg}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.descContainer}>
                <Image
                  source={require(IMAGE_URL + "/koala.png")}
                  style={{ width: 134, height: 148, resizeMode: "contain" }}
                />
                {haveLocations ? (
                  <></>
                ) : (
                  <Text style={styles.textDesc}>
                    {"아이콘을 눌러\n현위치를 기록해요!"}
                  </Text>
                )}
              </View>
            )}
          </View>
        </ImageBackground>

        <View style={[styles.cardContainer, { height: cardHeight }]}>
          {haveLocation ? (
            <></>
          ) : (
            <View style={styles.btnChoiceContainer}>
              <TouchableOpacity style={styles.btnChoice}>
                <Text style={styles.textChoice}>{"선택"}</Text>
              </TouchableOpacity>
            </View>
          )}
          {haveLocations ? (
            <View style={styles.rowContainer}>
              <View style={styles.line} />
              <View style={styles.locationsContainer}>
                <Text style={styles.textLocations}>
                  {"서울특별시 관악구 호암로 546"}
                </Text>
                <Text style={styles.textLocations}>
                  {"서울특별시 관악구 호암로 547"}
                </Text>
              </View>
            </View>
          ) : (
            <Text style={styles.textNone}>
              {"오늘 하루 기록된 장소가 없습니다."}
            </Text>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

export default TodayRoute;
