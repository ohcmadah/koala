import React from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../Styles/TodayRouteStyles";
import { _getLocation } from "../../FunctionModule";

const IMAGE_URL = "../../assets/today-route";

class TodayRoute extends React.Component {
  state = {
    haveLocation: false,
    haveLocations: false,
  };
  render() {
    const { haveLocation, haveLocations } = this.state;
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
          source={IMAGE_URL + "/background.png"}
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
              <View>
                <Text>{"강원 동해시 평원로 100"}</Text>
                <View>
                  <TouchableOpacity>
                    <Image />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.descContainer}>
                <Image
                  source={require(IMAGE_URL + "/koala.png")}
                  style={{ width: 134, height: 148, resizeMode: "contain" }}
                />
                <Text style={styles.textDesc}>
                  {"아이콘을 눌러\n현위치를 기록해요!"}
                </Text>
              </View>
            )}
          </View>
        </ImageBackground>

        <View style={styles.cardContainer}>
          {haveLocations ? (
            <>
              <View />
              <View>
                <View>{"서울특별시 관악구 호암로 546"}</View>
              </View>
            </>
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
