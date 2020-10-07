import React from "react";
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../Styles/MyRouteStyles";

class MyRouteScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.navContainer}>
          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Image
              style={styles.btnBackImg}
              source={require("../../assets/today-route/btn_back.png")}
            />
          </TouchableOpacity>
          <Text style={styles.textNav}>{"나의 이동기록"}</Text>
          <View style={styles.btnBack} />
        </View>

        <ScrollView style={styles.contentContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.line} />
            <View style={styles.monthContainer}>
              <Text style={styles.textMonth}>{"9월"}</Text>
              <TouchableOpacity style={styles.daysContainer}>
                <View style={styles.dayContainer}>
                  <Text style={styles.textDay}>{"21일"}</Text>
                  <View style={styles.longRect} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default MyRouteScreen;
