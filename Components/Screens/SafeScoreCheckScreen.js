import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  AsyncStorage,
} from "react-native";
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../Styles/SafeScoreCheckStyles";

const IMAGE_URL = "../../assets";

const questions = {
  first: {
    target: "first",
    text: "사회적 거리두기를 잘 실천했나요?",
  },
  second: {
    target: "second",
    text: "외출 시 마스크를 잘 착용했나요?",
  },
  third: {
    target: "third",
    text: "손을 올바르게 잘 씻었나요?",
  },
};

class SafeScoreCheckScreen extends React.Component {
  state = {
    target: "",
    slideValue: 0,
    score: {},
  };
  render() {
    const { first, second, third } = this.state;
    const isAllChecked = first && second && third;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.navContainer}>
          <TouchableOpacity
            style={{ width: 30 }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Image
              source={require(`${IMAGE_URL}/safe-score/btn_back.png`)}
              style={{ width: 10, height: 20 }}
            />
          </TouchableOpacity>
          <Text style={styles.textNav}>{"TODAY"}</Text>
          <View style={{ width: 30 }} />
        </View>

        <View style={styles.contentContainer}>
          {Object.values(questions).map((question, index) => {
            return (
              <View key={index}>
                <Text style={styles.textQuestion}>{question.text}</Text>
                <View style={{ left: -10, marginBottom: 16 }}>
                  <CustomSlider
                    changeValue={this._changeValue}
                    completeSliding={this._completeSliding}
                    target={question.target}
                  />
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.btnContainer}>
          {isAllChecked ? (
            <TouchableOpacity
              style={styles.btnSubmit}
              onPress={this._completeCheck}
            >
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
      this.setState({
        [target]: true,
        score: {
          ...this.state.score,
          [target]: value,
        },
      });
    } else {
      this.setState({
        [target]: false,
      });
    }
  };

  _completeCheck = () => {
    const { score } = this.state;
    const { setScores } = this.props.route.params;
    setScores(score);
    this.props.navigation.goBack();
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
