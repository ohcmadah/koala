import { StyleSheet, Platform } from "react-native";
import { isTablet } from "../FunctionModule";

const mainColor = "#9DB4CE";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
    flexDirection: "row",
    justifyContent:
      Platform.isPad || isTablet() ? "space-around" : "space-between",
    paddingVertical: 20,
  },
});

export default styles;
