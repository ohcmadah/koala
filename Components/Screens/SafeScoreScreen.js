import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../Styles/SafeScoreStyles";

const IMAGE_URL = "../../assets/safe-score";

class SafeScoreScreen extends React.Component {
  state = {
    haveScore: true,
  };
  render() {
    const { haveScore } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.navContainer}>
          <TouchableOpacity style={{ width: 30 }}>
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
                    {haveScore ? "80" : " ? "}
                  </Text>
                  <Text style={styles.textScoreDesc}>{"점"}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.iconsContainer}>
                  <View style={styles.iconContainer}>
                    <Image
                      source={require(`${IMAGE_URL}/mask_icon.png`)}
                      style={{ width: 26, height: 16, resizeMode: "contain" }}
                    />
                    <Image
                      source={require(`${IMAGE_URL}/hand_cleaner_icon.png`)}
                      style={{ width: 17, height: 24, resizeMode: "contain" }}
                    />
                    <Image
                      source={require(`${IMAGE_URL}/location_icon.png`)}
                      style={{ width: 21, height: 21, resizeMode: "contain" }}
                    />
                  </View>
                  <View style={styles.circleContainer}>
                    <View style={styles.circle} />
                    <View style={styles.circle} />
                    <View style={styles.circle} />
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.btnAgain}>
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
                  <Text style={styles.textMonth}>{"9월"}</Text>
                  <View style={styles.daysContainer}>
                    <View style={styles.dayContainer}>
                      <Text style={styles.textDay}>{"10일"}</Text>
                      <View style={styles.barContainer}>
                        <View style={styles.colorBar} />
                      </View>
                      <Text style={styles.textDayScore}>{"56점"}</Text>
                    </View>
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
    );
  }
}

export default SafeScoreScreen;
