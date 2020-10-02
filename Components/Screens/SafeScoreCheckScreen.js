import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../Styles/SafeScoreCheckStyles";

const IMAGE_URL = "../../assets";

class SafeScoreCheckScreen extends React.Component {
  state = {
    isAllChecked: true,
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
          <Text>{"외출 시 마스크를 잘 착용했나요?"}</Text>
          <Text>{"실내에서 손을 잘 씻었나요?"}</Text>
          <Text>{"우리 지역의 전일 대비 확진자 수 증감"}</Text>

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
}

export default SafeScoreCheckScreen;
