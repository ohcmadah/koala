import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../Styles/MyRouteStyles";

class MyRouteScreen extends React.Component {
  state = {
    routes: {},
    haveRoutes: false,
    openingRoutes: {},
  };

  componentDidMount() {
    this._getRoutes();
  }

  render() {
    const { routes, haveRoutes, openingRoutes } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.navContainer}>
          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Image
              style={styles.btnBackImg}
              source={require("../../assets/today-route/btn_back.png")}
            />
          </TouchableOpacity>
          <Text style={styles.textNav}>{"나의 이동기록"}</Text>
          <View style={styles.btnBack} />
        </View>

        <ScrollView style={styles.contentContainer}>
          <View style={styles.cardContainer}>
            <View></View>
            {haveRoutes ? (
              <>
                <View style={styles.line} />
                <View>
                  <View style={styles.monthContainer}>
                    <Text style={styles.textMonth}>{"9월"}</Text>
                    <View style={styles.routeContainer}>
                      <TouchableOpacity style={styles.daysContainer}>
                        <View style={styles.dayContainer}>
                          <Text style={styles.textDay}>{"21일"}</Text>
                          {openingRoutes ? (
                            <View style={styles.shortRect} />
                          ) : (
                            <View style={styles.longRect} />
                          )}
                        </View>
                      </TouchableOpacity>
                      {openingRoutes ? (
                        <View style={styles.detailContainer}>
                          <View style={styles.widthLine} />
                          <View style={styles.routesContainer}>
                            <Text style={styles.textRoute}>
                              {"서울특별시 관악구 호암로 546"}
                            </Text>
                            <Text style={styles.textRoute}>
                              {"서울특별시 관악구 호암로 547"}
                            </Text>
                          </View>
                          <TouchableOpacity style={styles.btnRouteSite}>
                            <Text style={styles.textBtnRoute}>
                              {"서울특별시 확진자 경로 바로가기"}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <></>
                      )}
                    </View>
                  </View>
                </View>
              </>
            ) : (
              <Text style={styles.textNone}>{"나의 이동기록이 없습니다."}</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  _getRoutes = async () => {
    const dbRoutes = await AsyncStorage.getItem("addresses");
    if (dbRoutes != null) {
      const routes = JSON.parse(dbRoutes);
      this.setState({
        routes: routes,
        haveRoutes: true,
      });
    }
  };
}

export default MyRouteScreen;
