import { StyleSheet, Dimensions } from "react-native";

const greyColor = "#707070";
const basicFontSize = 17;
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  navContainer: {
    height: height * 0.15,
    paddingHorizontal: 38,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textNav: {
    fontSize: basicFontSize + 3,
    color: greyColor,
    fontWeight: "bold",
  },
  btnBack: {
    width: 30,
    height: 20,
    resizeMode: "contain",
  },

  backgroundImg: {
    height: height * 0.55,
    width: width,
    resizeMode: "contain",
  },
  contentContainer: {
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  descContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    paddingHorizontal: 34,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textDesc: {
    // fontFamily: "Daegu"
    fontWeight: "bold",
    color: greyColor,
    fontSize: basicFontSize + 2,
    textAlign: "center",
  },

  cardContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: height * 0.55,
    width: width,
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  textNone: {
    fontSize: basicFontSize,
    color: greyColor,
    opacity: 0.5,
    fontWeight: "bold",
  },
});

export default styles;
