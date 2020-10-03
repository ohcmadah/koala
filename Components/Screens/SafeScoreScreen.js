import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../Styles/SafeScoreStyles";

const IMAGE_URL = "../../assets/safe-score";
const colors = ["#9A9A9A", "#F57272", "#F9D315", "#A3C1E2", "#84DB6A"];

class SafeScoreScreen extends React.Component {
  state = {
    today: "",
    isGetted: false,
    haveScore: false,
    haveTodayScore: false,
    scores: {},
    todayScore: {},
  };

  componentDidMount() {
    const date = new Date();
    const today = date.toISOString().substring(0, 10);
    this.setState({
      today: today,
    });

    this._getScores();
  }

  render() {
    const {
      isGetted,
      haveScore,
      haveTodayScore,
      scores,
      todayScore,
      today,
    } = this.state;

    return isGetted ? (
      <SafeAreaView style={styles.container}>
        <View style={styles.navContainer}>
          <TouchableOpacity
            style={{ width: 30 }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Image
              source={require(`${IMAGE_URL}/btn_back.png`)}
              style={{ width: 10, height: 20 }}
            />
          </TouchableOpacity>
          <Text style={styles.textNav}>{"나의 안전지수"}</Text>
          <View style={{ width: 30 }} />
        </View>
        <ScrollView style={{ flex: 0.84 }}>
          <View style={styles.cardContainer}>
            <View style={styles.cardView}>
              <Text style={styles.textCardTitle}>{"TODAY"}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.scoreContainer}>
                  <Text style={styles.textScore}>
                    {haveTodayScore ? todayScore.score : " ? "}
                  </Text>
                  <Text style={styles.textScoreDesc}>{"점"}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.iconsContainer}>
                  <View style={styles.iconContainer}>
                    <Image
                      source={require(`${IMAGE_URL}/location_icon.png`)}
                      style={{ width: 21, height: 21, resizeMode: "contain" }}
                    />
                    <Image
                      source={require(`${IMAGE_URL}/mask_icon.png`)}
                      style={{ width: 26, height: 16, resizeMode: "contain" }}
                    />
                    <Image
                      source={require(`${IMAGE_URL}/hand_cleaner_icon.png`)}
                      style={{ width: 17, height: 24, resizeMode: "contain" }}
                    />
                  </View>
                  <View style={styles.circleContainer}>
                    <View
                      style={[
                        styles.circle,
                        haveTodayScore
                          ? {
                              backgroundColor: colors[todayScore.location],
                            }
                          : { backgroundColor: "#E1E1E1" },
                      ]}
                    />
                    <View
                      style={[
                        styles.circle,
                        haveTodayScore
                          ? { backgroundColor: colors[todayScore.mask] }
                          : { backgroundColor: "#E1E1E1" },
                      ]}
                    />
                    <View
                      style={[
                        styles.circle,
                        haveTodayScore
                          ? { backgroundColor: colors[todayScore.hand] }
                          : { backgroundColor: "#E1E1E1" },
                      ]}
                    />
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.btnAgain}
                onPress={this._goSafeCheck}
              >
                <Text style={styles.textAgain}>
                  {haveScore ? "다시 기록하기" : "기록하기"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomCardContainer}>
            {haveScore ? (
              <>
                <View style={styles.line} />
                <View style={styles.monthContainer}>
                  <Text style={styles.textMonth}>{"10월"}</Text>
                  <View style={styles.daysContainer}>
                    {Object.values(scores).map((score, index) => {
                      const barColor =
                        score.score <= 50
                          ? score.score <= 25
                            ? colors[1]
                            : colors[2]
                          : score.score <= 75
                          ? colors[3]
                          : colors[4];
                      return (
                        <View key={index} style={styles.dayContainer}>
                          <Text style={styles.textDay}>
                            {`${score.id.substring(8, 10)}일`}
                          </Text>
                          <View style={styles.barContainer}>
                            <View
                              style={[
                                styles.colorBar,
                                {
                                  width: `${score.score}%`,
                                  backgroundColor: barColor,
                                },
                              ]}
                            />
                          </View>
                          <Text
                            style={[styles.textDayScore, { color: barColor }]}
                          >{`${score.score}점`}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </>
            ) : (
              <Text style={styles.textNoneScore}>
                {"14일간 안전지수 기록이 없습니다."}
              </Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    ) : (
      <View />
    );
  }

  _getScores = async () => {
    const scores = await AsyncStorage.getItem("scores");
    const { today } = this.state;
    const timestamp = Date.parse(today) - 13 * 24 * 3600 * 1000;

    let scores14 = {};
    if (scores != null) {
      const parsedScores = JSON.parse(scores);

      Object.values(parsedScores).map((score) => {
        if (Date.parse(score.id) >= timestamp) {
          scores14 = {
            ...scores14,
            [score.id]: {
              ...score,
            },
          };
          this.setState({
            scores: scores14,
            haveScore: true,
          });
        }

        if (score.id == this.state.today) {
          this.setState({
            todayScore: { ...score },
            haveTodayScore: true,
          });
        }
      });
    }

    this.setState({
      isGetted: true,
    });
  };

  _setScores = (score) => {
    let resultScore = 0;
    if (score.first == 4) {
      resultScore = 99;
    } else {
      resultScore = score.first * 25;
    }

    const date = new Date();
    const ID = date.toISOString().substring(0, 10); // yyyy-mm-dd
    const scores = {
      ...this.state.scores,
      [ID]: {
        id: ID,
        score: resultScore,
        location: score.first,
        mask: score.second,
        hand: score.third,
      },
    };

    AsyncStorage.setItem("scores", JSON.stringify(scores));

    this._getScores();
  };

  _goSafeCheck = () => {
    const { navigation } = this.props;
    navigation.push("SafeScoreCheck", {
      setScores: this._setScores,
    });
  };
}

export default SafeScoreScreen;
