import { StyleSheet, Dimensions, Platform } from "react-native";
import { isTablet } from "../FunctionModule";

const mainColor = "#9DB4CE";
const basicFontSize = 17;
const basicMargin = 36;
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
  },
  topNavContainer: {
    width: width,
    height: Platform.isPad || isTablet() ? height * 0.18 : height * 0.11,
  },
  topNavImg: {
    width: width,
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textLocation: {
    color: "white",
    fontSize: basicFontSize,
    fontWeight: "bold",
    marginRight: 12,
    marginLeft: 16,
  },

  contentContainer: {
    height: height * 0.45,
    minHeight: 150,
    marginHorizontal: basicMargin,
    justifyContent: "center",
  },
  textContentTitle: {
    color: "white",
    fontSize: basicFontSize + 5,
    fontWeight: "bold",
  },

  btnSite: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: mainColor,

    // elevation
    ...Platform.select({
      ios: {
        shadowColor: "rgb(0, 0, 0)",
        shadowOpacity: 0.15,
        shadowRadius: 4,
        shadowOffset: {
          height: 2,
          width: 0,
        },
      },
      android: {
        elevation: 2,
      },
    }),
  },
  textSite: {
    color: "white",
    fontWeight: "bold",
    fontSize: basicFontSize - 2,
  },

  bottomNavContainer: {
    height: height * 0.44,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  btnCircle: {
    flex: 1,
    position: "absolute",
  },
  textMenuContainer: {
    width: "100%",
    position: "absolute",
    marginTop: 38,
  },
  textMenu: {
    color: "#707070",
    fontSize: basicFontSize,
    fontWeight: "bold",
    marginTop: 10,
    alignSelf: "center",
    alignItems: "center",
    textAlign: "center",
    lineHeight: 24,
  },

  padMenu: {
    flex: 1,
    width: width,
    position: "absolute",
    backgroundColor: "white",
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    // borderColor: "#ddd",
    // borderWidth: 2,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(0, 0, 0)",
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: {
          height: 0,
          width: 0,
        },
      },
      android: {
        elevation: 20,
      },
    }),
  },
  padTextMenu: {
    width: width,
    height: (height * 0.3) / 3,
    justifyContent: "center",
  },
});

export default styles;
