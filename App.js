import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
import styles from "./Styles";

const CORONA_API_KEY = process.env.CORONA_API_KEY;
const KAKAOMAP_API_KEY = process.env.KAKAOMAP_API_KEY;

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}
