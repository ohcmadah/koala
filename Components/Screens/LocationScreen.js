import React from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../Styles/LocationStyles";
import { AppLoading } from "expo";
import * as config from "../../config";
import { ScrollView } from "react-native-gesture-handler";

const GOOGLE_API_KEY = config.GOOGLE_API_KEY;

const IMAGE_URL = "../../assets/location";

class LocationScreen extends React.Component {
  state = {
    location: "",
    isLoaded: true,
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
    let resultLocation;
    await fetch(GEOLOCATION_API_URL)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          location: resultLocation,
          isLoaded: true,
        });
      });
  };

  componentDidMount() {
    // this._setLocation();
  }

  render() {
    const { location, isLoaded } = this.state;

    return isLoaded ? (
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
                  value={location}
                  onChangeText={this._controlInputLocation}
                  returnKeyType={"done"}
                />
              </View>
            </View>

            <View style={styles.descContainer}>
              <Text style={styles.description}>
                {"현황을 알고 싶은\n장소를 검색해주세요!\nex. 서울특별시"}
              </Text>
              <Image
                source={require(`${IMAGE_URL}/koala.png`)}
                style={styles.koala}
              />
            </View>

            <View style={styles.bottomContainer}>
              <TouchableOpacity style={styles.btnSubmit} disabled={true}>
                <Text style={styles.textBtnSubmit}>{"설정 완료"}</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </ScrollView>
      </SafeAreaView>
    ) : (
      <AppLoading />
    );
  }

  _controlInputLocation = (text) => {
    this.setState({
      location: text,
    });
  };
}

export default LocationScreen;
