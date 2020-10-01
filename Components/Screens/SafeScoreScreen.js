import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../Styles/SafeScoreStyles";

const IMAGE_URL = "../../assets/safe-score";

class SafeScoreScreen extends React.Component {
  render() {
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

        <View style={styles.cardContainer}>
          <View style={styles.cardView}>
            <Text style={styles.textCardTitle}>{"TODAY"}</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.scoreContainer}>
                <Text style={styles.textScore}>{"80"}</Text>
                <Text style={styles.textScoreDesc}>{"점"}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.iconsContainer}>
                <View style={styles.iconContainer}>
                  <Image
                    source={require(`${IMAGE_URL}/mask_icon.png`)}
                    style={{ width: 26, height: 16 }}
                  />
                  <View style={styles.circle} />
                </View>
                <View style={styles.iconContainer}>
                  <Image
                    source={require(`${IMAGE_URL}/hand_cleaner_icon.png`)}
                    style={{ width: 17, height: 24 }}
                  />
                  <View style={styles.circle} />
                </View>
                <View style={styles.iconContainer}>
                  <Image
                    source={require(`${IMAGE_URL}/location_icon.png`)}
                    style={{ width: 21, height: 21 }}
                  />
                  <View style={styles.circle} />
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.btnAgain}>
              <Text style={styles.textAgain}>{"다시 기록하기"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View />
          <Text>{"월"}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default SafeScoreScreen;
