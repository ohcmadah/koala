import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../Styles/MyRouteStyles";
import { _getYYYYMMDD } from "../../FunctionModule";

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
            {haveRoutes ? (
              <>
                <View style={styles.line} />
                <View style={{ marginTop: -40 }}>
                  {Object.keys(routes)
                    .reverse()
                    .map((key, index) => {
                      return (
                        <View key={index} style={styles.monthContainer}>
                          <Text style={styles.textMonth}>
                            {key.substring(5, 7) + "월"}
                          </Text>
                          {Object.keys(routes[key]).map((k) => {
                            if (routes[key][k].address.length != 0) {
                              return (
                                <View style={styles.routeContainer}>
                                  <TouchableOpacity
                                    style={styles.daysContainer}
                                    activeOpacity={1}
                                    onPress={() => {
                                      const flag =
                                        openingRoutes[k] == undefined
                                          ? true
                                          : !openingRoutes[k];
                                      this.setState({
                                        openingRoutes: {
                                          ...this.state.openingRoutes,
                                          [k]: flag,
                                        },
                                      });
                                    }}
                                  >
                                    <View style={styles.dayContainer}>
                                      <Text style={styles.textDay}>
                                        {k.substring(8, 10) + "일"}
                                      </Text>
                                      {(
                                        openingRoutes[k] == undefined
                                          ? false
                                          : openingRoutes[k]
                                      ) ? (
                                        <View style={styles.shortRect} />
                                      ) : (
                                        <View style={styles.longRect} />
                                      )}
                                    </View>
                                  </TouchableOpacity>
                                  {openingRoutes[k] ? (
                                    <View style={styles.detailContainer}>
                                      <View style={styles.widthLine} />
                                      <View style={styles.routesContainer}>
                                        {routes[key][k].address.map((addr) => (
                                          <Text style={styles.textRoute}>
                                            {addr}
                                          </Text>
                                        ))}
                                      </View>
                                      <TouchableOpacity
                                        style={styles.btnRouteSite}
                                      >
                                        <Text style={styles.textBtnRoute}>
                                          {"서울특별시 확진자 경로 바로가기"}
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                  ) : (
                                    <></>
                                  )}
                                </View>
                              );
                            }
                          })}
                        </View>
                      );
                    })}
                </View>
              </>
            ) : (
              <Text style={styles.textNone}>
                {"14일간 나의 이동기록이 없습니다."}
              </Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  _getRoutes = async () => {
    const dbRoutes = await AsyncStorage.getItem("addresses");
    const today = _getYYYYMMDD();
    const timestamp = Date.parse(today) - 13 * 24 * 3600 * 1000;

    if (dbRoutes != null) {
      let routes14 = {};
      const routes = JSON.parse(dbRoutes);
      Object.values(routes).map((month) => {
        Object.values(month).map((route) => {
          const cMonth = route.id.substring(0, 7);
          if (Date.parse(route.id) >= timestamp) {
            routes14 = {
              ...routes14,
              [cMonth]: {
                ...routes14[cMonth],
                [route.id]: {
                  ...route,
                },
              },
            };
            this.setState({
              routes: routes14,
              haveRoutes: true,
            });
          }
        });
      });
    }
  };
}

export default MyRouteScreen;
