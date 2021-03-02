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

// 각 지역 확진자 이동경로 제공 사이트 URL
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

// 하루 사이트 저장
let sites = [];

// 나의 이동기록 화면
class MyRouteScreen extends React.Component {
  state = {
    // 14일간 이동기록
    routes: {},
    // 이동기록이 존재하는지
    haveRoutes: false,
  };

  componentDidMount() {
    // 저장된 이동경로 가져오기
    this._getRoutes();
  }

  render() {
    const { routes, haveRoutes } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {/* Navigation */}
        <View style={styles.navContainer}>
          {/* 뒤로가기 버튼 */}
          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            {/* 뒤로가기 아이콘 */}
            <Image
              style={styles.btnBackImg}
              source={require("../../assets/today-route/btn_back.png")}
            />
          </TouchableOpacity>
          {/* 나의 이동기록 텍스트 */}
          <Text style={styles.textNav}>{"나의 이동기록"}</Text>
          {/* 뒤로가기 버튼만큼 공간 확보해서 텍스트 중앙정렬 */}
          <View style={styles.btnBack} />
        </View>

        {/* 컨텐츠 부분 컨테이너 */}
        <ScrollView style={styles.contentContainer}>
          {/* 카드 컨테이너 */}
          <View style={styles.cardContainer}>
            {/* 기록이 있을 경우 */}
            {haveRoutes ? (
              <>
                {/* 왼쪽 라인 */}
                <View style={styles.line} />
                <View style={{ marginTop: -40 }}>
                  {Object.keys(routes)
                    .reverse()
                    .map((yyyymm, index) => (
                      <Month key={index} routes={routes} yyyymm={yyyymm} />
                    ))}
                </View>
              </>
            ) : (
              // 이동기록이 없을 경우
              <Text style={styles.textNone}>
                {"14일간 나의 이동기록이 없습니다."}
              </Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // 저장된 이동경로 가져오기
  _getRoutes = async () => {
    const dbRoutes = await AsyncStorage.getItem("addresses");
    const today = _getYYYYMMDD();
    // 오늘로부터 13일 전 timestamp
    const timestamp = Date.parse(today) - 13 * 24 * 3600 * 1000;

    // 저장된 기록이 있을 경우
    if (dbRoutes != null) {
      let routes14 = {};
      let flag = false;
      const routes = JSON.parse(dbRoutes);
      // 월별 이동기록
      Object.values(routes).map((month) => {
        // 일별 기록
        Object.values(month).map((route) => {
          // yyyy-mm
          const cMonth = route.id.substring(0, 7);
          // 14일동안의 기록일 경우
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
            // 기록된 주소가 있을 경우
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
}

class Month extends React.Component {
  state = {
    // 클릭해 상세 정보를 열고 있는 이동기록
    openingRoutes: {},
  };
  render() {
    const { routes, yyyymm } = this.props;
    const { openingRoutes } = this.state;

    return (
      <View style={styles.monthContainer}>
        {/* 월 텍스트 */}
        <Text style={styles.textMonth}>{yyyymm.substring(5, 7) + "월"}</Text>

        {Object.keys(routes[yyyymm]).map((yyyymmdd) => {
          if (routes[yyyymm][yyyymmdd].address.length != 0) {
            // Date
            return (
              <View key={yyyymmdd} style={styles.routeContainer}>
                {/* 일별 이동기록 버튼 */}
                <TouchableOpacity
                  style={styles.dayButton}
                  activeOpacity={1}
                  onPress={() => this._setOpen(yyyymmdd)}
                >
                  {/* 일 & 사각형 */}
                  <View style={styles.dayContainer}>
                    {/* 일 텍스트 */}
                    <Text style={styles.textDay}>
                      {yyyymmdd.substring(8, 10) + "일"}
                    </Text>
                    {
                      // 열려 있는지 확인
                      (
                        openingRoutes[yyyymmdd] == undefined
                          ? false
                          : openingRoutes[yyyymmdd]
                      ) ? (
                        // 열려있으면 세로가 짧은 사각형
                        <View style={styles.shortRect} />
                      ) : (
                        // 닫혀있으면 세로가 긴 사각형
                        <View style={styles.longRect} />
                      )
                    }
                  </View>
                </TouchableOpacity>

                {/* 상세정보 */}
                {openingRoutes[yyyymmdd] ? (
                  // 열려 있으면
                  <View style={styles.detailContainer}>
                    {/* 가로 라인 */}
                    <View style={styles.widthLine} />
                    {/* 일별 이동경로들 컨테이너 */}
                    <View style={styles.routesContainer}>
                      {routes[yyyymm][yyyymmdd].address.map((addr, index) => {
                        // 이동경로에 따른 사이트 주소 설정
                        this._setSite(addr);
                        return (
                          // 이동경로 텍스트
                          <Text key={index} style={styles.textRoute}>
                            {addr}
                          </Text>
                        );
                      })}
                    </View>
                    {/* 사이트 바로가기 버튼들 */}
                    {sites.map((site, index) => {
                      return (
                        // 사이트 바로가기 버튼
                        <TouchableOpacity
                          key={index}
                          style={styles.btnRouteSite}
                          // 누르면 사이트 열기
                          onPress={() => {
                            const URL = siteURL[site];
                            Linking.openURL(URL).catch((err) =>
                              console.log(err)
                            );
                          }}
                        >
                          {/* 버튼 안 텍스트 (지역명 + 확진자 경로 바로가기) */}
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
  }

  // 열렸는지 설정
  _setOpen = (yyyymmdd) => {
    const { openingRoutes } = this.state;
    // true면 열린 상태, false는 닫힌 상태
    // open 기록이 없으면 open, open 기록이 있으면 반대로
    const flag =
      openingRoutes[yyyymmdd] == undefined ? true : !openingRoutes[yyyymmdd];

    sites = [];
    this.setState({
      openingRoutes: {
        ...this.state.openingRoutes,
        [yyyymmdd]: flag,
      },
    });
  };

  // 이동경로에 따른 사이트 주소 설정
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
