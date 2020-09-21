import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../Styles/AreaStyles";

class Korea extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Korea</Text>
      </SafeAreaView>
    );
  }
}

export default Korea;
