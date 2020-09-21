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
  state = {
    location: "서울특별시 관악구",
  };
  render() {
    const { location } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.topBar}
          resizeMode={"contain"}
          source={require(`../../assets/home/top_bar.png`)}
        >
          <Image
            style={{ height: 20, width: 16 }}
            source={require(`../../assets/home/location_icon.png`)}
          />
          <Text style={styles.textLocation}>{location}</Text>
          <TouchableOpacity>
            <Image
              style={{ height: 6, width: 11 }}
              source={require(`../../assets/home/white_tri.png`)}
            />
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.content}>
          <Text style={styles.title}>국내현황</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;
