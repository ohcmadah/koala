import React from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "../../Styles/TodayRouteStyles";
import { _getLocation, _getYYYYMMDD } from "../../FunctionModule";

// image base url
const IMAGE_URL = "../../assets/today-route";
// 스마트폰 세로 크기
const { height } = Dimensions.get("window");

// TODAY 이동경로 화면
class TodayRoute extends React.Component {
  state = {
    isLoaded: false,
    // 저장하기 전 기록 버튼을 누른 이동기록이 있는지
    haveLocation: false,
    // 오늘의 이동기록이 있는지
    haveLocations: false,
    // 주소 삭제 편집 중인이 여부
    isEditing: false,
    // 기록된 주소 텍스트 기본 opacity 값
    opacity: 0.7,
    // 잡힌 위치
    address: "",
    // 14일간 이동기록
    addresses: {},
    // 오늘의 이동기록
    todayAddr: [],
    deleteAddr: {},
    // 현 위치를 가져오는 중인 상태표시
    loading: false,
  };

  componentDidMount() {
    // 저장된 이동기록 가져오기
    this._getAddress();
    this.setState({
      isLoaded: true,
    });
  }

  render() {
    const {
      isLoaded,
      haveLocation,
      haveLocations,
      isEditing,
      opacity,
      address,
      todayAddr,
      deleteAddr,
      loading,
    } = this.state;
    const cardHeight = haveLocation ? height * 0.45 : height * 0.55;

    return isLoaded ? (
      <SafeAreaView style={styles.container}>
        {/* Top Navigation */}
        <View style={styles.navContainer}>
          {/* Back Button */}
          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Image
              source={require(IMAGE_URL + "/btn_back.png")}
              style={{ width: 10, height: 20 }}
            />
          </TouchableOpacity>
          {/* Text */}
          <Text style={styles.textNav}>{"TODAY 이동경로"}</Text>
          {/* 중앙 정렬 위한 빈 view */}
          <View style={{ width: 30 }} />
        </View>

        {/* 구불구불한 뒷배경 */}
        <ImageBackground
          source={require(IMAGE_URL + "/background.png")}
          style={styles.backgroundImg}
        >
          {/* 기록 버튼 & 코알라 */}
          <View style={styles.contentContainer}>
            {/* 기록 버튼 */}
            <TouchableOpacity
              style={{ alignSelf: "center", opacity: loading ? 0.5 : 1 }}
              onPress={this._getTodayLocation}
              disabled={loading ? true : false}
            >
              <Image
                source={require(IMAGE_URL + "/btn_location.png")}
                style={{ width: 107, height: 107, resizeMode: "contain" }}
              />
            </TouchableOpacity>
            {/* 기록 버튼을 눌러 주소가 잡혔다면 */}
            {haveLocation ? (
              <View style={styles.locationContainer}>
                {/* 잡힌 주소 텍스트 */}
                <Text style={styles.textLocation}>{address}</Text>
                {/* 확인, 취소 버튼 컨테이너 */}
                <View style={styles.btnContainer}>
                  {/* 확인 버튼 */}
                  <TouchableOpacity
                    style={styles.btnCircle}
                    onPress={this._saveHandle}
                  >
                    <Image
                      source={require(IMAGE_URL + "/btn_check.png")}
                      style={[styles.btnImg, { marginRight: 12 }]}
                    />
                  </TouchableOpacity>
                  {/* 취소 버튼 */}
                  <TouchableOpacity
                    style={styles.btnCircle}
                    onPress={() => {
                      this.setState({ haveLocation: false });
                    }}
                  >
                    <Image
                      source={require(IMAGE_URL + "/btn_cancel.png")}
                      style={styles.btnImg}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              // 현 위치 주소가 없다면
              <View style={styles.descContainer}>
                {/* 팔로 가리키는 코알라 사진 */}
                <Image
                  source={require(IMAGE_URL + "/koala.png")}
                  style={{ width: 134, height: 148, resizeMode: "contain" }}
                />
                {/* 하루동안 기록한 적이 없다면 설명문 */}
                {/* 아이콘을 눌러 현위치를 기록해요! */}
                {haveLocations || (
                  <Image
                    style={styles.textDesc}
                    source={require(IMAGE_URL + "/text.png")}
                  />
                )}
              </View>
            )}
          </View>
        </ImageBackground>

        {/* 하단 기록된 장소 보여주는 카드 컨테이너 */}
        <View style={[styles.cardContainer, { height: cardHeight }]}>
          {!haveLocation && haveLocations && (
            // 기록은 있지만 현 위치 잡힌 상태가 아닐 때
            <View style={styles.btnChoiceContainer}>
              {/* 선택 버튼 */}
              <TouchableOpacity
                style={styles.btnChoice}
                onPress={() => {
                  const flag = !isEditing;
                  this.setState({
                    isEditing: flag,
                    // 편집 중이라면 주소 텍스트 연하게
                    opacity: flag ? 0.35 : 0.7,
                    deleteAddr: {},
                  });
                }}
              >
                {/* 선택 or 취소 버튼 */}
                <Text style={styles.textChoice}>
                  {isEditing ? "취소" : "선택"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {haveLocations ? (
            // 기록된 주소가 있다면
            <View style={styles.rowContainer}>
              {/* 좌측 선 */}
              <View style={styles.line} />
              {/* 주소들 컨테이너 */}
              <View style={styles.locationsContainer}>
                {todayAddr.map((addr, index) => (
                  // 삭제 기능을 위해 TouchableOpacity
                  <TouchableOpacity
                    key={index}
                    activeOpacity={1}
                    // 삭제 편집을 안 하고 있으면 버튼 기능 없도록 설정
                    disabled={isEditing ? false : true}
                    onPress={() => {
                      const { deleteAddr } = this.state;
                      // 삭제할 주소 목록 처리 (삭제: true)
                      // 삭제할 주소가 아예 없었으면 true, 아니면 반대
                      const flag =
                        Object.keys(deleteAddr).length == 0
                          ? true
                          : !deleteAddr[index];
                      this.setState({
                        deleteAddr: {
                          ...deleteAddr,
                          [index]: flag,
                        },
                      });
                    }}
                  >
                    {/* 주소 텍스트 */}
                    <Text
                      style={[
                        styles.textLocations,
                        // 삭제하려고 선택했다면 진하게
                        {
                          opacity: deleteAddr[index] ? 0.9 : opacity,
                        },
                      ]}
                    >
                      {addr}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            // 하루동안 기록된 주소가 하나도 없으면
            <Text style={styles.textNone}>
              {"오늘 하루 기록된 장소가 없습니다."}
            </Text>
          )}
          {isEditing && (
            // 주소 편집 중일 경우
            // 하단 삭제 버튼 컨테이너
            <View style={styles.btnDelContainer}>
              {/* 삭제 버튼 */}
              <TouchableOpacity
                style={styles.btnDelete}
                onPress={this._deleteConfirm}
              >
                <Image
                  source={require(IMAGE_URL + "/btn_delete.png")}
                  style={{ width: 24, height: 28, resizeMode: "contain" }}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    ) : (
      <View />
    );
  }

  // 저장된 이동기록 가져오기
  _getAddress = async () => {
    const dbAddr = await AsyncStorage.getItem("addresses");
    const today = _getYYYYMMDD();
    // 13일 전 타임스탬프
    const timestamp = Date.parse(today) - 13 * 24 * 3600 * 1000;

    // 저장된 주소가 있다면
    if (dbAddr != null) {
      let addr14 = {};
      const parsedAddr = JSON.parse(dbAddr);
      // 달별 주소 기록
      Object.values(parsedAddr).map((month) => {
        // 일별 주소 기록
        Object.values(month).map((address) => {
          // 일에 해당하는 달
          const cMonth = address.id.substring(0, 7);
          // 14일 동안의 기록일 경우
          if (Date.parse(address.id) >= timestamp) {
            addr14 = {
              ...addr14,
              [cMonth]: {
                ...addr14[cMonth],
                [address.id]: {
                  ...address,
                },
              },
            };
            this.setState({
              addresses: addr14,
            });
          }

          // 저장된 주소들의 기록 날짜가 오늘이면
          if (address.id == today) {
            const todayAddr = [...address.address];
            this.setState({
              todayAddr: todayAddr,
              haveLocations: todayAddr.length == 0 ? false : true,
            });
          }
        });
      });
    }
  };

  // 확인 버튼 눌렀을 경우 실행
  _saveHandle = () => {
    // 현 위치 주소, 14일간 주소
    const { address, addresses } = this.state;
    const ID = _getYYYYMMDD();
    const month = ID.substring(0, 7);

    // addresses[month][ID]가 있는지 확인
    const existAddr = addresses.hasOwnProperty(month)
      ? addresses[month].hasOwnProperty(ID)
      : false;
    // 오늘 하루 이동기록
    const today = {
      [ID]: {
        id: ID,
        address: existAddr
          ? [...addresses[month][ID].address, address]
          : [address],
      },
    };

    // 오늘 이동기록을 포함해 전체 이동기록 업데이트 및 저장
    this._saveLocation(today, month);
  };

  // 오늘 이동기록을 포함해 전체 이동기록 업데이트 및 저장
  // todayAddr: 오늘 이동기록, month: 해당 월 문자열
  _saveLocation = (todayAddr, month) => {
    // 업데이트 전 이동 기록
    const { addresses } = this.state;

    // 업데이트해 저장할 이동 기록
    let saveAddr;
    if (Object.keys(addresses).length != 0) {
      // 이동기록이 저장되어있다면
      saveAddr = {
        ...addresses,
        [month]: {
          ...addresses[month],
          ...todayAddr,
        },
      };
    } else {
      // 이동기록이 없다면
      saveAddr = {
        [month]: {
          ...todayAddr,
        },
      };
    }

    // 저장된 주소 있음, 현재 위치 주소 없음
    this.setState({
      haveLocations: true,
      haveLocation: false,
    });

    // 저장
    AsyncStorage.setItem("addresses", JSON.stringify(saveAddr));

    // 업데이트된 주소로 다시 불러오기
    this._getAddress();
  };

  // 현 위치 기록 버튼을 누르면 실행
  _getTodayLocation = async () => {
    // 가져오는 중임을 표시
    this.setState({
      loading: true,
    });
    // true값 => detail한 주소 가져오기 (지명만 X)
    let address = await _getLocation(true);
    if (address == "") {
      address = "위치를 찾을 수 없습니다.";
    }
    // 가져오기 완료
    this.setState({
      haveLocation: true,
      address: address,
      loading: false,
    });
  };

  // 삭제 버튼 눌렀을 경우
  _deleteConfirm = () => {
    const { deleteAddr } = this.state;
    // 1개 이상 선택했는지 여부
    let flag = false;
    for (const key in deleteAddr) {
      if (Object.hasOwnProperty.call(deleteAddr, key)) {
        if (deleteAddr[key]) {
          flag = true;
        }
      }
    }

    if (!flag) {
      // 삭제할 이동경로를 1개 이상 선택하지 않았을 경우
      Alert.alert("삭제", "삭제할 이동경로를 선택해주세요.");
    } else {
      const msg = "선택한 이동경로를 삭제하시겠습니까?";
      Alert.alert("취소", msg, [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "OK",
          // 삭제 OK한 경우
          onPress: () => this._deleteHandle(),
        },
      ]);
    }
  };

  // 삭제 OK한 경우
  _deleteHandle = () => {
    const { deleteAddr, todayAddr } = this.state;
    // copy
    let _todayAddr = [...todayAddr];
    // 오늘 기록에서 삭제할 기록 제거
    Object.keys(deleteAddr)
      .reverse()
      .forEach((key) => {
        if (deleteAddr[key]) {
          // key index delete
          _todayAddr.splice(key, 1);
        }
      });

    // 업데이트 및 편집 완료
    this.setState({
      todayAddr: _todayAddr,
      isEditing: false,
      opacity: 0.7,
      // 초기화
      deleteAddr: {},
      // 남은 주소가 아예 없으면 false, 아니면 true
      haveLocations: _todayAddr.length == 0 ? false : true,
    });

    // 오늘 이동기록 정리
    const ID = _getYYYYMMDD();
    const today = {
      [ID]: {
        id: ID,
        address: [..._todayAddr],
      },
    };

    // 삭제한 후 이동기록 저장
    this._saveLocation(today, ID.substring(0, 7));
  };
}

export default TodayRoute;
