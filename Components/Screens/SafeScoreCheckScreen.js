import React from "react";
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
          <View style={{ left: -10 }}>
            <CustomSlider changeValue={this._changeValue} />
          </View>
          <Text style={[styles.textQuestion, { marginTop: 16 }]}>
            {"실내에서 손을 잘 씻었나요?"}
          </Text>
          <View style={{ left: -10 }}>
            <CustomSlider changeValue={this._changeValue} />
          </View>
          <Text style={[styles.textQuestion, { marginTop: 16 }]}>
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
    color: "",
  };

  render() {
    const { width } = Dimensions.get("window");
    const { changeValue } = this.props;
    const { color, slideValue } = this.state;
    const maxValue = 4;

    const sliderStyle = {
      slideContainer: {
        justifyContent: "center",
        height: 80,
        borderRadius: 3,
        overflow: "hidden",
      },
      slideBar: {
        backgroundColor: "#E2E2E2",
        width: width - 90,
        left: 10,
        height: 6,
        borderRadius: 3,
        position: "absolute",
      },
      slideColor: {
        backgroundColor: color == "" ? "#9A9A9A" : color,
        width: (slideValue / maxValue) * (width - 90),
        left: 10,
        height: 6,
        borderRadius: 3,
      },
      slideReal: {
        width: width - 70,
        height: 80,
        borderRadius: 10,
      },
    };

    return (
      <View style={sliderStyle.slideContainer}>
        <View style={{ flexDirection: "row", position: "absolute" }}>
          <View style={sliderStyle.slideBar}></View>
          <View style={sliderStyle.slideColor}></View>
        </View>
        <Slider
          style={sliderStyle.slideReal}
          minimumValue={0}
          maximumValue={maxValue}
          step={1}
          value={slideValue}
          onValueChange={(value) => {
            changeValue(value);
            this._changeValue(value);
          }}
          maximumTrackTintColor="transparent"
          minimumTrackTintColor="transparent"
          thumbTintColor={color == "" ? "#9A9A9A" : color}
        />
      </View>
    );
  }

  _changeValue = (value) => {
    const colors = {
      grey: "#9A9A9A",
      red: "#F57272",
      yellow: "#F9D315",
      blue: "#A3C1E2",
    };

    this.setState({ slideValue: value });
    if (value == 0) {
      this.setState({
        color: colors.grey,
      });
    } else if (value <= 1) {
      this.setState({
        color: colors.red,
      });
    } else if (value <= 2) {
      this.setState({
        color: colors.yellow,
      });
    } else {
      this.setState({
        color: colors.blue,
      });
    }
  };
}

export default SafeScoreCheckScreen;
