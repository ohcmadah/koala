import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../Styles/MyRouteStyles";
import { _getYYYYMMDD } from "../../FunctionModule";

const siteURL = {
  서울특별시: "https://news.seoul.go.kr/welfare/archives/513105",
  부산광역시: "http://www.busan.go.kr/covid19/Corona19.do",
  대구광역시: "http://covid19.daegu.go.kr/00936598.html",
  인천광역시: "https://www.incheon.go.kr/health/HE020409",
  광주광역시:
    "https://www.gwangju.go.kr/c19/c19/contentsView.do?pageId=coronagj2",
  대전광역시: "https://www.daejeon.go.kr/corona19/index.do?menuId=0008",
  울산광역시: "https://www.ulsan.go.kr/corona.jsp",
  세종특별자치시: "https://www.sejong.go.kr/bbs/R3391/list.do",
  경기도: "https://www.gg.go.kr/contents/contents.do?ciIdx=1150&menuId=2909",
  강원도: "https://www.provin.gangwon.kr/covid-19.html",
  충청북도: "https://www.provin.gangwon.kr/covid-19.html",
  충청남도: "http://www.chungnam.go.kr/coronaStatus.do",
  전라북도:
    "http://www.jeonbuk.go.kr/board/list.jeonbuk?boardId=BBS_0000107&menuCd=DOM_000000110006000000&contentsSid=1224&cpath=",
  전라남도: "https://www.jeonnam.go.kr/coronaMainPage.do",
  경상북도: "http://gb.go.kr/corona_main.htm",
  경상남도: "http://xn--19-q81ii1knc140d892b.kr/main/main.do",
  제주특별자치도: "https://www.jeju.go.kr/corona19.jsp#corona-main",
  전국:
    "http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun=",
};
let sites = [];

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
                                <View key={k} style={styles.routeContainer}>
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
                                        {routes[key][k].address.map(
                                          (addr, index) => {
                                            this._setSite(addr);
                                            return (
                                              <Text
                                                key={index}
                                                style={styles.textRoute}
                                              >
                                                {addr}
                                              </Text>
                                            );
                                          }
                                        )}
                                      </View>
                                      {sites.map((site, index) => {
                                        return (
                                          <TouchableOpacity
                                            key={index}
                                            style={styles.btnRouteSite}
                                            onPress={() => {
                                              const URL = siteURL[site];
                                              Linking.openURL(
                                                URL
                                              ).catch((err) =>
                                                console.log(err)
                                              );
                                            }}
                                          >
                                            <Text style={styles.textBtnRoute}>
                                              {site + " 확진자 경로 바로가기"}
                                            </Text>
                                          </TouchableOpacity>
                                        );
                                      })}
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
      let flag = false;
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
            if (route.address.length != 0) {
              flag = true;
            }
          }
        });
      });

      this.setState({
        routes: routes14,
        haveRoutes: flag,
      });
    }
  };

  _setSite = (addr) => {
    let result = "";
    if (addr.includes("서울")) {
      result = "서울특별시";
    } else if (addr.includes("부산")) {
      result = "부산광역시";
    } else if (addr.includes("대구")) {
      result = "대구광역시";
    } else if (addr.includes("인천")) {
      result = "인천광역시";
    } else if (addr.includes("광주")) {
      result = "광주광역시";
    } else if (addr.includes("대전")) {
      result = "대전광역시";
    } else if (addr.includes("울산")) {
      result = "울산광역시";
    } else if (addr.includes("세종")) {
      result = "세종특별자치시";
    } else if (addr.includes("경기")) {
      result = "경기도";
    } else if (addr.includes("강원")) {
      result = "강원도";
    } else if (addr.includes("충남") || addr.includes("충청남")) {
      result = "충청남도";
    } else if (addr.includes("충북") || addr.includes("충청북")) {
      result = "충청북도";
    } else if (addr.includes("경북") || addr.includes("경상북")) {
      result = "경상북도";
    } else if (addr.includes("경남") || addr.includes("경상남")) {
      result = "경상남도";
    } else if (addr.includes("전북") || addr.includes("전라북")) {
      result = "전라북도";
    } else if (addr.includes("전남") || addr.includes("전라남")) {
      result = "전라남도";
    } else if (addr.includes("제주") || addr.includes("서귀")) {
      result = "제주특별자치도";
    } else {
      result = "전국";
    }
    sites = sites.includes(result) ? [...sites] : [...sites, result];
  };
}

export default MyRouteScreen;
