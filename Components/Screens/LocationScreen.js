import React from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../Styles/LocationStyles";
import { CommonActions } from "@react-navigation/native";
import * as fModule from "../../FunctionModule";

// image base url
const IMAGE_URL = "../../assets/location";

// 위치 설정 화면
class LocationScreen extends React.Component {
  state = {
    // 설정 위치 or 검색 결과가 없습니다
    location: "",
    // 지원하는 지역을 설정했는가
    haveLocation: false,
    // 설정한 지역
    settingLocation: "",
  };

  render() {
    const { location, haveLocation } = this.state;
    const { height, width } = Dimensions.get("window");

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {/* 상단 둥근 배경 */}
          <ImageBackground
            source={require(`${IMAGE_URL}/background.png`)}
            style={styles.backgroundImg}
          >
            {/* 검색 컨테이너 */}
            <View style={styles.topContainer}>
              <Text style={styles.textContentTitle}>{"우리 지역 수정"}</Text>
              {/* 검색 바 */}
              <View style={styles.searchContainer}>
                {/* 제대로 된 지역이 있을 경우 체크 아이콘 표시 */}
                {haveLocation ? (
                  <Image
                    source={require(`${IMAGE_URL}/check_icon.png`)}
                    style={styles.searchIcon}
                  />
                ) : (
                  // 제대로 된 지역이 없을 경우 검색 아이콘 표시
                  <Image
                    source={require(`${IMAGE_URL}/search_icon.png`)}
                    style={styles.searchIcon}
                  />
                )}
                {/* 입력 */}
                <TextInput
                  style={styles.input}
                  value={location == "검색 결과가 없습니다." ? "" : location}
                  placeholder={
                    location == "검색 결과가 없습니다." ? location : ""
                  }
                  placeholderTextColor={"#fff"}
                  onChangeText={this._controlInputLocation}
                  returnKeyType={"done"}
                  autoCorrect={false}
                  onSubmitEditing={this._searchLocation}
                />
              </View>
            </View>

            {/* 설명 & 코알라 이미지 */}
            {/* 검색된 지역이 있을 경우 */}
            {haveLocation ? (
              <View style={styles.descContainer}>
                {/* font 적용이 안 되어 이미지로 설명문 대체 */}
                {/* 설정을 완료했다면, 설정 완료를 꾸욱! */}
                <Image
                  style={[
                    styles.description,
                    { width: width * 0.33, height: height * 0.06 },
                  ]}
                  source={require(IMAGE_URL + "/complete_text.png")}
                />
                {/* 양팔을 아래로 내린 코알라 이미지 */}
                <Image
                  source={require(`${IMAGE_URL}/koala_down.png`)}
                  style={styles.koala}
                />
              </View>
            ) : (
              <View style={styles.descContainer}>
                {/* 현황을 알고 싶은 장소를 검색해주세요! ex. 서울특별시 설명 이미지 */}
                <Image
                  style={[
                    styles.description,
                    { width: width * 0.37, height: height * 0.1 },
                  ]}
                  source={require(IMAGE_URL + "/search_text.png")}
                />
                {/* 양팔을 위로 올린 코알라 이미지 */}
                <Image
                  source={require(`${IMAGE_URL}/koala.png`)}
                  style={styles.koala}
                />
              </View>
            )}

            {/* 하단 설정 완료 버튼 컨테이너 */}
            <View style={styles.bottomContainer}>
              {/* 검색된 지역이 있을 경우 */}
              {haveLocation ? (
                // 활성화된 설정 완료 버튼 표시
                <TouchableOpacity
                  style={styles.btnSubmit}
                  onPress={this._submitLocation}
                >
                  <Text style={styles.textBtnSubmit}>{"설정 완료"}</Text>
                </TouchableOpacity>
              ) : (
                // 검색된 지역이 없을 경우
                // 비활성화된 설정 완료 버튼 표시 (누를 수 없음)
                <TouchableOpacity
                  style={styles.btnSubmitDisable}
                  disabled={true}
                >
                  <Text style={styles.textBtnSubmitDisable}>{"설정 완료"}</Text>
                </TouchableOpacity>
              )}
            </View>
          </ImageBackground>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // 인풋이 변할 때 state에 저장
  _controlInputLocation = (text) => {
    this.setState({
      location: text,
    });
  };

  // 검색했을 때 실행
  // 해당 지역이 있는지 확인 후 위치 저장
  _searchLocation = async () => {
    // 검색 지역
    const { location } = this.state;
    // 검색 지역을 기반으로 한 결과 (지역 or "")
    let resultLocation = await fModule._setLocation(location);

    // 검색 결과가 없을 경우
    if (resultLocation == "") {
      resultLocation = "검색 결과가 없습니다.";
      // 지역이 검색되지 않음
      this.setState({
        haveLocation: false,
      });
    } else {
      // 지역이 검색되었을 경우
      this.setState({
        haveLocation: true,
      });
    }
    // 검색 지역으로 위치 설정
    this.setState({
      location: resultLocation,
      settingLocation: resultLocation,
    });
  };

  // 설정 완료를 누를 경우
  // 설정 위치로 변경하고 홈 화면으로 돌아감
  _submitLocation = () => {
    const { navigation } = this.props;
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "Home",
            params: { settingLocation: this.state.settingLocation },
          },
        ],
      })
    );
  };
}

export default LocationScreen;
