import React from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../Styles/LocationStyles";
import * as config from "../../config";
import { CommonActions } from "@react-navigation/native";

const GOOGLE_API_KEY = config.GOOGLE_API_KEY;

const IMAGE_URL = "../../assets/location";

class LocationScreen extends React.Component {
  state = {
    location: "",
    haveLocation: false,
    settingLocation: "",
  };

  _setLocation = async (address) => {
    const GEOLOCATION_API_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`;
    const koreanRegion = [
      "제주특별자치도",
      "경상남도",
      "경상북도",
      "전라남도",
      "전라북도",
      "충청남도",
      "충청북도",
      "강원도",
      "경기도",
      "세종특별자치시",
      "울산광역시",
      "대전광역시",
      "광주광역시",
      "인천광역시",
      "대구광역시",
      "부산광역시",
      "서울특별시",
    ];
    const englishRegion = [
      "Jeju",
      "Gyeongsangnam-do",
      "Gyeongsangbuk-do",
      "Jeollanam-do",
      "Jeollabuk-do",
      "Chungcheongnam-do",
      "Chungcheongbuk-do",
      "Gangwon-do",
      "Gyeonggi-do",
      "Sejong",
      "Ulsan",
      "Daejeon",
      "Gwangju",
      "Incheon",
      "Daegu",
      "Busan",
      "Seoul",
    ];
    let resultLocation = "";
    await fetch(GEOLOCATION_API_URL)
      .then((response) => response.json())
      .then((data) => {
        if (data.status != "ZERO_RESULTS") {
          const address = data.results[0].address_components;
          for (let i = 0; i < address.length; i++) {
            const addr = address[i].long_name;
            for (let j = 0; j < koreanRegion.length; j++) {
              const kRegion = koreanRegion[j];
              const eRegion = englishRegion[j];
              if (addr == kRegion || addr == eRegion) {
                resultLocation = kRegion;
                break;
              }
            }
          }
        }

        if (resultLocation == "") {
          resultLocation = "검색 결과가 없습니다.";
          this.setState({
            haveLocation: false,
          });
        } else {
          this.setState({
            haveLocation: true,
          });
        }
        this.setState({
          location: resultLocation,
          settingLocation: resultLocation,
        });
      });
  };

  render() {
    const { location, haveLocation } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <ImageBackground
            source={require(`${IMAGE_URL}/background.png`)}
            style={styles.backgroundImg}
          >
            <View style={styles.topContainer}>
              <Text style={styles.textContentTitle}>{"우리 지역 수정"}</Text>
              <View style={styles.searchContainer}>
                <Image
                  source={require(`${IMAGE_URL}/search_icon.png`)}
                  style={styles.searchIcon}
                />
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

            {haveLocation ? (
              <View style={styles.descContainer}>
                <Text style={styles.description}>
                  {"설정을 완료했다면,\n설정 완료를 꾸욱!"}
                </Text>
                <Image
                  source={require(`${IMAGE_URL}/koala_down.png`)}
                  style={styles.koala}
                />
              </View>
            ) : (
              <View style={styles.descContainer}>
                <Text style={styles.description}>
                  {"현황을 알고 싶은\n장소를 검색해주세요!\nex. 서울특별시"}
                </Text>
                <Image
                  source={require(`${IMAGE_URL}/koala.png`)}
                  style={styles.koala}
                />
              </View>
            )}

            <View style={styles.bottomContainer}>
              {haveLocation ? (
                <TouchableOpacity
                  style={styles.btnSubmit}
                  onPress={this._submitLocation}
                >
                  <Text style={styles.textBtnSubmit}>{"설정 완료"}</Text>
                </TouchableOpacity>
              ) : (
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

  _controlInputLocation = (text) => {
    this.setState({
      location: text,
    });
  };

  _searchLocation = () => {
    const { location } = this.state;
    this._setLocation(location);
  };

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
