import React, { useDebugValue } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../Styles/SafeScoreCheckStyles";

const IMAGE_URL = "../../assets";

class SafeScoreCheckScreen extends React.Component {
  state = {
    isAllChecked: true,
    slideValue: 0,
  };
  render() {
    const { isAllChecked } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.navContainer}>
          <TouchableOpacity style={{ width: 30 }}>
            <Image
              source={require(`${IMAGE_URL}/safe-score/btn_back.png`)}
              style={{ width: 10, height: 20 }}
            />
          </TouchableOpacity>
          <Text style={styles.textNav}>{"TODAY"}</Text>
          <View style={{ width: 30 }} />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.textQuestion}>
            {"외출 시 마스크를 잘 착용했나요?"}
          </Text>
          <CustomSlider changeValue={this._changeValue} />
          <Text style={[styles.textQuestion, { marginTop: 18 }]}>
            {"실내에서 손을 잘 씻었나요?"}
          </Text>
          <CustomSlider changeValue={this._changeValue} />
          <Text style={[styles.textQuestion, { marginTop: 18 }]}>
            {"우리 지역의 전일 대비 확진자 수 증감"}
          </Text>

          {isAllChecked ? (
            <TouchableOpacity style={styles.btnSubmit}>
              <Text style={styles.textBtnSubmit}>{"기록 완료"}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.btnSubmitDisable} disabled={true}>
              <Text style={styles.textBtnSubmitDisable}>{"기록 완료"}</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }

  _changeValue = (value) => {
    this.setState({ slideValue: value });
  };
}

class CustomSlider extends React.Component {
  state = {
    slideValue: 0,
  };

  render() {
    const { width } = Dimensions.get("window");
    const sliderStyle = {
      slideContainer: {
        justifyContent: "center",
        height: 20,
        borderRadius: 3,
        overflow: "hidden",
        marginVertical: 21,
      },
      slideBar: {
        backgroundColor: "#E2E2E2",
        width: width - 80,
        height: 6,
        borderRadius: 3,
        position: "absolute",
      },
      slideColor: {
        backgroundColor: "#A3C1E2",
        width: (this.state.slideValue / 4) * (width - 80),
        height: 6,
        borderRadius: 3,
      },
      slideReal: {
        width: width - 80,
        height: 20,
        borderRadius: 10,
      },
    };

    const { changeValue } = this.props;
    return (
      <View style={sliderStyle.slideContainer}>
        <View style={{ flexDirection: "row", position: "absolute" }}>
          <View style={sliderStyle.slideBar}></View>
          <View style={sliderStyle.slideColor}></View>
        </View>
        <Slider
          style={sliderStyle.slideReal}
          minimumValue={0}
          maximumValue={4}
          step={1}
          value={this.state.slideValue}
          onValueChange={(value) => {
            changeValue(value);
            this.setState({ slideValue: value });
          }}
          maximumTrackTintColor="transparent"
          minimumTrackTintColor="transparent"
          thumbTintColor={"#A3C1E2"}
        />
      </View>
    );
  }
}

export default SafeScoreCheckScreen;
