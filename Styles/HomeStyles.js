import { StyleSheet } from "react-native";

const mainColor = "#9DB4CE";
const basicFontSize = 17;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
  },
  topBar: {
    flex: 1.3,
    height: 110,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 8.7,
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
});

export default styles;
