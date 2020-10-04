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

class TodayRoute extends React.Component {
  state = {
    haveLocation: false,
  };
  render() {
    const { haveLocation } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <TouchableOpacity>
            <Image />
          </TouchableOpacity>
          <Text>{"TODAY 이동경로"}</Text>
          <View />
        </View>

        <ImageBackground>
          <View>
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
              <View>
                <Image />
                <Text>{"아이콘을 눌러\n현위치를 기록해요!"}</Text>
              </View>
            )}
          </View>
        </ImageBackground>

        <View>
          <View />
          <View>
            <View>{"서울특별시 관악구 호암로 546"}</View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default TodayRoute;
