import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../Styles/SafeScoreCheckStyles";

class SafeScoreCheckScreen extends React.Component {
  state = {
    isAllChecked: true,
  };
  render() {
    const { isAllChecked } = this.state;

    return <SafeAreaView style={styles.container}></SafeAreaView>;
  }
}

export default SafeScoreCheckScreen;
