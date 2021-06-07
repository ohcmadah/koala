import { StyleSheet, Platform } from "react-native";
import { isBrowser } from "react-device-detect";

const mainColor = "#9DB4CE";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
    flexDirection: "row",
    justifyContent:
      Platform.isPad || isBrowser ? "space-around" : "space-between",
    paddingVertical: 20,
  },
});

export default styles;
