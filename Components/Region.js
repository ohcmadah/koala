import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../Styles/AreaStyles";

class Region extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Region</Text>
      </SafeAreaView>
    );
  }
}

export default Region;
