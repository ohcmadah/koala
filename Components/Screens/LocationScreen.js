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
import { CommonActions } from "@react-navigation/native";
import * as fModule from "../../FunctionModule";

const IMAGE_URL = "../../assets/location";

class LocationScreen extends React.Component {
  state = {
    location: "",
    haveLocation: false,
    settingLocation: "",
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
                {haveLocation ? (
                  <Image
                    source={require(`${IMAGE_URL}/check_icon.png`)}
                    style={styles.searchIcon}
                  />
                ) : (
                  <Image
                    source={require(`${IMAGE_URL}/search_icon.png`)}
                    style={styles.searchIcon}
                  />
                )}
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

  _searchLocation = async () => {
    const { location } = this.state;
    const resultLocation = await fModule._setLocation(location);
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
