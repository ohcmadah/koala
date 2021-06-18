import { StyleSheet, Platform } from "react-native";

const mainColor = "#9DB4CE";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
    flexDirection: "row",
    justifyContent: Platform.isPad ? "space-around" : "space-between",
    paddingVertical: 20,
  },
});

export default styles;
