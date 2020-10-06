import React from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "../../Styles/TodayRouteStyles";
import { _getLocation, _getYYYYMMDD } from "../../FunctionModule";

const IMAGE_URL = "../../assets/today-route";
const { height } = Dimensions.get("window");

class TodayRoute extends React.Component {
  state = {
    isLoaded: false,
    haveLocation: false,
    haveLocations: false,
    isEditing: false,
    opacity: 0.7,
    address: "",
    addresses: {},
    todayAddr: [],
    deleteAddr: {},
  };

  componentDidMount() {
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
    } = this.state;
    const cardHeight = haveLocation ? height * 0.45 : height * 0.55;

    return isLoaded ? (
      <SafeAreaView style={styles.container}>
        <View style={styles.navContainer}>
          <TouchableOpacity style={styles.btnBack}>
            <Image
              source={require(IMAGE_URL + "/btn_back.png")}
              style={{ width: 10, height: 20 }}
            />
          </TouchableOpacity>
          <Text style={styles.textNav}>{"TODAY 이동경로"}</Text>
          <View style={{ width: 30 }} />
        </View>

        <ImageBackground
          source={require(IMAGE_URL + "/background.png")}
          style={styles.backgroundImg}
        >
          <View style={styles.contentContainer}>
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={this._getTodayLocation}
            >
              <Image
                source={require(IMAGE_URL + "/btn_location.png")}
                style={{ width: 92, height: 92, resizeMode: "contain" }}
              />
            </TouchableOpacity>
            {haveLocation ? (
              <View style={styles.locationContainer}>
                <Text style={styles.textLocation}>{address}</Text>
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={styles.btnCircle}
                    onPress={this._saveLocation}
                  >
                    <Image
                      source={require(IMAGE_URL + "/btn_check.png")}
                      style={[styles.btnImg, { marginRight: 12 }]}
                    />
                  </TouchableOpacity>
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
              <View style={styles.descContainer}>
                <Image
                  source={require(IMAGE_URL + "/koala.png")}
                  style={{ width: 134, height: 148, resizeMode: "contain" }}
                />
                {haveLocations ? (
                  <></>
                ) : (
                  <Text style={styles.textDesc}>
                    {"아이콘을 눌러\n현위치를 기록해요!"}
                  </Text>
                )}
              </View>
            )}
          </View>
        </ImageBackground>

        <View style={[styles.cardContainer, { height: cardHeight }]}>
          {!haveLocation && haveLocations ? (
            <View style={styles.btnChoiceContainer}>
              <TouchableOpacity
                style={styles.btnChoice}
                onPress={() => {
                  const flag = !isEditing;
                  this.setState({
                    isEditing: flag,
                    opacity: isEditing ? 0.7 : 0.35,
                    deleteAddr: {},
                  });
                }}
              >
                <Text style={styles.textChoice}>
                  {isEditing ? "취소" : "선택"}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}
          {haveLocations ? (
            <View style={styles.rowContainer}>
              <View style={styles.line} />
              <View style={styles.locationsContainer}>
                {todayAddr.map((addr, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={1}
                    disabled={isEditing ? false : true}
                    onPress={() => {
                      const { deleteAddr } = this.state;
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
                    <Text
                      style={[
                        styles.textLocations,
                        {
                          opacity: this.state.deleteAddr[index] ? 0.9 : opacity,
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
            <Text style={styles.textNone}>
              {"오늘 하루 기록된 장소가 없습니다."}
            </Text>
          )}
          {isEditing ? (
            <View style={styles.btnDelContainer}>
              <TouchableOpacity
                style={styles.btnDelete}
                onPress={this._deleteHandle}
              >
                <Image
                  source={require(IMAGE_URL + "/btn_delete.png")}
                  style={{ width: 24, height: 28, resizeMode: "contain" }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}
        </View>
      </SafeAreaView>
    ) : (
      <View />
    );
  }

  _getAddress = async () => {
    const dbAddr = await AsyncStorage.getItem("addresses");

    if (dbAddr != null) {
      const parsedAddr = JSON.parse(dbAddr);
      this.setState({ addresses: parsedAddr });
      Object.values(parsedAddr).map((month) => {
        Object.values(month).map((address) => {
          if (address.id == _getYYYYMMDD()) {
            const todayAddr = [...address.address];
            this.setState({
              todayAddr: todayAddr,
              haveLocations: true,
            });
          }
        });
      });
    }
  };

  _saveLocation = () => {
    const { address, addresses } = this.state;

    const ID = _getYYYYMMDD();
    const month = ID.substring(0, 7);
    let saveAddr;
    if (Object.keys(addresses).length != 0) {
      saveAddr = {
        ...addresses,
        [month]: {
          ...addresses[month],
          [ID]: {
            id: ID,
            address:
              addresses[month][ID] != undefined
                ? [...addresses[month][ID].address, address]
                : [address],
          },
        },
      };
    } else {
      saveAddr = {
        [month]: {
          [ID]: {
            id: ID,
            address: [address],
          },
        },
      };
    }

    this.setState({
      haveLocations: true,
      haveLocation: false,
    });

    AsyncStorage.setItem("addresses", JSON.stringify(saveAddr));

    this._getAddress();
  };

  _getTodayLocation = async () => {
    const address = await _getLocation(true);
    this.setState({
      haveLocation: true,
      address: address,
    });
  };

  _deleteHandle = () => {
    const { deleteAddr, todayAddr } = this.state;
    let _todayAddr = [...todayAddr];
    Object.keys(deleteAddr)
      .reverse()
      .forEach((key) => {
        if (deleteAddr[key]) {
          _todayAddr.splice(key, 1);
        }
      });
    this.setState({
      todayAddr: _todayAddr,
      isEditing: false,
      opacity: 0.7,
      deleteAddr: {},
    });
  };
}

export default TodayRoute;
