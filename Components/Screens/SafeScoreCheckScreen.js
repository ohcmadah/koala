import React from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../Styles/SafeScoreCheckStyles";

const IMAGE_URL = "../../assets";

class SafeScoreCheckScreen extends React.Component {
  state = {
    target: "",
    slideValue: 0,
  };
  render() {
    const { target } = this.state;
    const isAllChecked = target.length == 16 ? true : false;

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
            {"사회적 거리두기를 잘 실천했나요?"}
          </Text>
          <View style={{ left: -10 }}>
            <CustomSlider
              changeValue={this._changeValue}
              completeSliding={this._completeSliding}
              target={"first"}
            />
          </View>
          <Text style={[styles.textQuestion, { marginTop: 16 }]}>
            {"외출 시 마스크를 잘 착용했나요?"}
          </Text>
          <View style={{ left: -10 }}>
            <CustomSlider
              changeValue={this._changeValue}
              completeSliding={this._completeSliding}
              target={"second"}
            />
          </View>
          <Text style={[styles.textQuestion, { marginTop: 16 }]}>
            {"손을 올바르게 잘 씻었나요?"}
          </Text>
          <View style={{ left: -10 }}>
            <CustomSlider
              changeValue={this._changeValue}
              completeSliding={this._completeSliding}
              target={"third"}
            />
          </View>
        </View>

        <View style={styles.btnContainer}>
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

  _completeSliding = (value, target) => {
    if (value != 0) {
      if (!this.state.target.includes(target)) {
        this.setState({
          target: this.state.target + target,
        });
      }
    } else {
      this.setState({
        target: this.state.target.replace(target, ""),
      });
    }
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
          onSlidingComplete={(value) =>
            this.props.completeSliding(value, this.props.target)
          }
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
      green: "#84DB6A",
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
    } else if (value <= 3) {
      this.setState({
        color: colors.blue,
      });
    } else {
      this.setState({
        color: colors.green,
      });
    }
  };
}

export default SafeScoreCheckScreen;
