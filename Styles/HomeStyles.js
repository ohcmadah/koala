import { StyleSheet } from "react-native";

const mainColor = "#9DB4CE";
const basicFontSize = 17;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
  },
  topBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: 36,
  },
  textLocation: {
    color: "white",
    fontSize: basicFontSize,
    fontWeight: "bold",
    marginRight: 12,
    marginLeft: 16,
  },
  title: {
    color: "white",
    fontSize: basicFontSize + 5,
    fontWeight: "bold",
  },
  locationNav: {
    backgroundColor: "transparent",
  },
});

export default styles;
