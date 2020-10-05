import { StyleSheet, Dimensions } from "react-native";

const greyColor = "#707070";
const basicFontSize = 17;
const { width, height } = Dimensions.get("window");

const text = {
  fontSize: basicFontSize,
  color: greyColor,
  fontWeight: "bold",
};

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
    ...text,
    fontSize: basicFontSize + 3,
  },
  btnBack: {
    width: 30,
    height: 20,
    resizeMode: "contain",
  },

  backgroundImg: {
    height: height * 0.5,
    width: width,
    resizeMode: "contain",
    justifyContent: "flex-end",
  },
  contentContainer: {
    paddingBottom: height * 0.17,
  },
  descContainer: {
    flexDirection: "row",
    paddingHorizontal: width * 0.1,
    justifyContent: "space-between",
  },
  textDesc: {
    ...text,
    // fontFamily: "Daegu"
    fontSize: basicFontSize + 2,
    textAlign: "center",
    marginTop: 25,
  },

  cardContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: width,
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,

    ...Platform.select({
      ios: {
        shadowColor: "rgb(0, 0, 0)",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: {
          height: 2,
          width: 0,
        },
      },
      android: {
        elevation: 5,
      },
    }),
  },
  textNone: {
    ...text,
    opacity: 0.5,
  },

  locationContainer: {
    height: height * 0.12,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 20,
  },
  textLocation: {
    ...text,
    opacity: 0.9,
    fontSize: basicFontSize + 1,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  btnImg: {
    width: 53,
    height: 53,
    resizeMode: "contain",
  },

  rowContainer: {
    flexDirection: "row",
    width: width,
    height: "100%",
    alignItems: "flex-start",
  },
  line: {
    height: "100%",
    backgroundColor: greyColor,
    opacity: 0.2,
    width: 1,
    marginLeft: 38,
    marginRight: 19,
  },
  locationsContainer: {
    marginBottom: height * 0.09,
  },
  textLocations: {
    ...text,
    marginBottom: 20,
  },

  btnChoiceContainer: {
    height: 70,
    width: width,
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: width * 0.15,
  },
  btnChoice: {
    width: 50,
    alignItems: "flex-end",
  },
  textChoice: {
    ...text,
    color: "#9DB4CE",
  },

  btnDelContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: width,
    height: 64,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 35,
    backgroundColor: "white",

    ...Platform.select({
      ios: {
        shadowColor: "rgb(0, 0, 0)",
        shadowOpacity: 0.16,
        shadowRadius: 6,
        shadowOffset: {
          height: 0,
          width: 0,
        },
      },
      android: {
        elevation: 6,
      },
    }),
  },
  btnDelete: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export default styles;
