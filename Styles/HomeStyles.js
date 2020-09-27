import { StyleSheet } from "react-native";

const mainColor = "#9DB4CE";
const basicFontSize = 17;
const basicMargin = 36;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
  },
  topNavContainer: {
    flex: 1.3,
    width: "100%",
    height: 110,
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
    flex: 2,
    minHeight: 150,
    marginHorizontal: basicMargin,
  },
  textContentTitle: {
    color: "white",
    fontSize: basicFontSize + 5,
    fontWeight: "bold",
    marginTop: "10%",
  },

  btnSite: {
    height: 50,
    marginHorizontal: basicMargin,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 2,

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
    flex: 4,
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
    marginTop: 43,
  },
  textMenu: {
    color: "#707070",
    fontSize: basicFontSize,
    fontWeight: "bold",
    marginTop: 11,
    alignSelf: "center",
    alignItems: "center",
    textAlign: "center",
    lineHeight: 24,
  },
});

export default styles;
