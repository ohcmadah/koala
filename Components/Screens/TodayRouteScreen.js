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
                    onPress={this._saveHandle}
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
            <Text style={styles.textNone}>
              {"오늘 하루 기록된 장소가 없습니다."}
            </Text>
          )}
          {isEditing ? (
            <View style={styles.btnDelContainer}>
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
    const today = _getYYYYMMDD();
    const timestamp = Date.parse(today) - 13 * 24 * 3600 * 1000;

    if (dbAddr != null) {
      let addr14 = {};
      const parsedAddr = JSON.parse(dbAddr);
      Object.values(parsedAddr).map((month) => {
        Object.values(month).map((address) => {
          const cMonth = address.id.substring(0, 7);
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

  _saveHandle = () => {
    const { address, addresses } = this.state;
    const ID = _getYYYYMMDD();
    const month = ID.substring(0, 7);

    const today = {
      [ID]: {
        id: ID,
        address: (
          addresses[month] != undefined
            ? addresses[month][ID] != undefined
            : false
        )
          ? [...addresses[month][ID].address, address]
          : [address],
      },
    };

    this._saveLocation(today, month);
  };

  _saveLocation = (todayAddr, month) => {
    const { addresses } = this.state;

    let saveAddr;
    if (Object.keys(addresses).length != 0) {
      saveAddr = {
        ...addresses,
        [month]: {
          ...addresses[month],
          ...todayAddr,
        },
      };
    } else {
      saveAddr = {
        [month]: {
          ...todayAddr,
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

  _deleteConfirm = () => {
    const { deleteAddr } = this.state;
    let flag = false;
    Object.keys(deleteAddr).forEach((key, index) => {
      if (deleteAddr[key]) {
        flag = true;
      }
    });
    if (!flag) {
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
          onPress: () => this._deleteHandle(),
        },
      ]);
    }
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
      haveLocations: _todayAddr.length == 0 ? false : true,
    });

    const ID = _getYYYYMMDD();

    const today = {
      [ID]: {
        id: ID,
        address: [..._todayAddr],
      },
    };

    this._saveLocation(today, ID.substring(0, 7));
  };
}

export default TodayRoute;
