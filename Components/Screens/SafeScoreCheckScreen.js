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
