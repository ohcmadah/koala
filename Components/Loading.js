import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import cardStyles from "../Styles/CardStyles";

const mainColor = "#9DB4CE";
const { width } = Dimensions.get("window");
const cardWidth = width - 36 * 2;

export default function Loading() {
  return (
    <View style={styles.container}>
      <View style={styles.cardStyle}>
        <Text style={cardStyles.font}>Getting the data...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
  },
  cardStyle: {
    ...cardStyles.cardStyle,
    width: cardWidth,
    justifyContent: "center",
  },
});
