import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../Styles/SafeScoreStyles";
import { _getYYYYMMDD } from "../../FunctionModule";

import locationIcon from "../../assets/safe-score/location_icon.png";
import maskIcon from "../../assets/safe-score/mask_icon.png";
import handCleanerIcon from "../../assets/safe-score/hand_cleaner_icon.png";

const IMAGE_URL = "../../assets/safe-score";
// gray, red, yellow, blue, green
const colors = ["#9A9A9A", "#F57272", "#F9D315", "#A3C1E2", "#84DB6A"];
const imagesInfo = [
  {
    imageName: "location",
    src: locationIcon,
    width: 21,
    height: 21,
  },
  {
    imageName: "mask",
    src: maskIcon,
    width: 26,
    height: 16,
  },
  {
    imageName: "hand",
    src: handCleanerIcon,
    width: 17,
    height: 24,
  },
];

class SafeScoreScreen extends React.Component {
  state = {
    today: "", // Today's date (Ex: 2021-01-01)
    haveScore: false, // If Have a 14-day score
    haveTodayScore: false, // If Have a Today's score
    scores: {}, // 14 Days' Score
    todayScore: {}, // Today's Score
  };

  componentDidMount() {
    this.setState({
      today: _getYYYYMMDD(),
    });
    this._getScores();
  }

  render() {
    const { haveScore, haveTodayScore, scores, todayScore } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.navContainer}>
          {/* Back Button */}
          <TouchableOpacity
            style={{ width: 30 }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Image
              source={require(`${IMAGE_URL}/btn_back.png`)}
              style={{ width: 10, height: 20 }}
            />
          </TouchableOpacity>
          {/* Screen Title */}
          <Text style={styles.textNav}>{"나의 안전지수"}</Text>
          {/* Empty View (Title Align Center) */}
          <View style={{ width: 30 }} />
        </View>

        {/* Today Score Box & 14 Days' Score */}
        <ScrollView style={{ flex: 0.84 }}>
          {/* Today Score Box */}
          <View style={styles.cardContainer}>
            <View style={styles.cardView}>
              <Text style={styles.textCardTitle}>{"TODAY"}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* Score Text */}
                <View style={styles.scoreContainer}>
                  <Text style={styles.textScore}>
                    {haveTodayScore ? todayScore.score : " ? "}
                  </Text>
                  <Text style={styles.textScoreDesc}>{"점"}</Text>
                </View>

                {/* Center Line */}
                <View style={styles.divider} />

                {/* Icons & Colors */}
                <View style={styles.iconsContainer}>
                  {/* Icons */}
                  <View style={styles.iconContainer}>
                    {imagesInfo.map((item) => (
                      <Image
                        key={item.height}
                        source={item.src}
                        style={{
                          width: item.width,
                          height: item.height,
                          resizeMode: "contain",
                        }}
                      />
                    ))}
                  </View>
                  {/* Colors */}
                  <View style={styles.circleContainer}>
                    {imagesInfo.map((image) => (
                      <View
                        key={image.height}
                        style={[
                          styles.circle,
                          haveTodayScore
                            ? {
                                backgroundColor:
                                  colors[todayScore[image.imageName]],
                              }
                            : { backgroundColor: "#E1E1E1" },
                        ]}
                      />
                    ))}
                  </View>
                </View>
              </View>

              {/* Record Button */}
              <TouchableOpacity
                style={styles.btnAgain}
                onPress={this._goSafeCheck}
              >
                <Text style={styles.textAgain}>
                  {haveTodayScore ? "다시 기록하기" : "기록하기"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 14 Days' Score */}
          <View style={styles.bottomCardContainer}>
            {/* If you have a score (14 Days) */}
            {haveScore ? (
              <>
                {/* Left Line in the Box */}
                <View style={styles.line} />
                {/* Line Side Contents */}
                <View style={styles.monthsContainer}>
                  {Object.values(scores).map((month, index) => {
                    return <Month key={index} monthScores={month} />;
                  })}
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
    );
  }

  // AsyncStorage에 저장된 scores 가져오기
  _getScores = async () => {
    const scores = await AsyncStorage.getItem("scores");
    const { today } = this.state;
    // 오늘로부터 13일 전 timestamp
    const timestamp = Date.parse(today) - 13 * 24 * 3600 * 1000;

    let scores14 = {}; // 14일간의 Score
    if (scores != null) {
      const parsedScores = JSON.parse(scores);
      // 월별 점수들
      Object.values(parsedScores).map((monthScores) => {
        // 일별 점수들
        Object.values(monthScores).map((dayScore) => {
          const id = dayScore.id; // 날짜 (2021-01-01)
          const monthDate = id.substring(0, 7); // 날짜 (2021-01)
          if (Date.parse(id) >= timestamp) {
            // 13일 전보다 이후 데이터면
            scores14 = {
              ...scores14,
              [monthDate]: {
                ...scores14[monthDate],
                [id]: {
                  ...dayScore,
                },
              },
            };
          }

          if (id == today) {
            // 오늘 데이터면
            this.setState({
              todayScore: { ...dayScore },
              haveTodayScore: true,
            });
          }
        });
      });

      this.setState({
        scores: scores14,
        haveScore: true,
      });
    }
  };

  // 점수 저장
  _setScores = (score) => {
    let resultScore = 0;
    if (score.first == 4) {
      // 사회적 거리두기 만점이면
      resultScore = 99;
    } else {
      let substract = (4 - score.first) * 10;
      let maskScore = score.second * 15;
      let handwashScore = score.third * 10;
      resultScore = maskScore + handwashScore - substract;
    }

    const today = _getYYYYMMDD();
    const month = today.substring(0, 7);
    const scores = {
      ...this.state.scores,
      [month]: {
        ...this.state.scores[month],
        [today]: {
          id: today,
          score: resultScore,
          location: score.first,
          mask: score.second,
          hand: score.third,
        },
      },
    };

    AsyncStorage.setItem("scores", JSON.stringify(scores));

    this._getScores();
  };

  // 기록하기 버튼 누르면
  _goSafeCheck = () => {
    const { navigation } = this.props;
    navigation.push("SafeScoreCheck", {
      setScores: this._setScores,
    });
  };
}

const Month = ({ monthScores }) => {
  return (
    <View style={styles.monthContainer}>
      {/* Ex) 01월 */}
      <Text style={styles.textMonth}>
        {Object.keys(monthScores)[0].substring(5, 7) + "월"}
      </Text>

      {/* The Current Month's Scores */}
      <View style={styles.daysContainer}>
        {Object.values(monthScores).map((scores) => {
          return <Day key={scores.id} scores={scores} />;
        })}
      </View>
    </View>
  );
};

// Date, Graph, Score
const Day = ({ scores }) => {
  const total = scores.score; // total score (mask + hand + location)
  let barColor = colors[0]; // grey
  if (total > 75) {
    barColor = colors[4]; // green
  } else if (total > 50) {
    barColor = colors[3]; // blue
  } else if (total > 25) {
    barColor = colors[2]; // yellow
  } else {
    barColor = colors[1]; //red
  }

  return (
    <View style={styles.dayContainer}>
      {/* Ex) 01일 */}
      <Text style={styles.textDay}>{scores.id.substring(8, 10) + "일"}</Text>

      {/* Graph */}
      <View style={styles.barContainer}>
        {/* Color Bar */}
        <View
          style={[
            styles.colorBar,
            {
              width: `${total}%`,
              backgroundColor: barColor,
            },
          ]}
        />
      </View>

      {/* Ex) 35점 */}
      <Text
        style={[styles.textDayScore, { color: barColor }]}
      >{`${scores.score}점`}</Text>
    </View>
  );
};

export default SafeScoreScreen;
