import React from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../Styles/HomeStyles";

const IMAGE_URL = "../../assets";

class HomeScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.topBar}
          source={require(`../../assets/home/top_circle.svg`)}
          resizeMode={"contain"}
        >
          <Image
            style={{ width: "3%" }}
            source={require(`../../assets/home/location_icon.svg`)}
          />
          <Text>서울특별시 관악구</Text>
          <TouchableOpacity></TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;
