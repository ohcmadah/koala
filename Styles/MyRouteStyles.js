import { StyleSheet, Platform, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const basicFontSize = 18;
const greyColor = "#707070";
const blueColor = "#9DB4CE";
const text = {
  fontSize: basicFontSize,
  color: greyColor,
  fontWeight: "bold",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },

  navContainer: {
    height: height * 0.15,
    width: width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 38,
  },
  btnBack: {
    width: 30,
    height: 20,
  },
  btnBackImg: {
    width: 10,
    height: 20,
    resizeMode: "contain",
  },
  textNav: {
    ...text,
    fontSize: basicFontSize + 2,
  },

  contentContainer: {
    minHeight: height * 0.85,
    width: width,
  },
  cardContainer: {
    minHeight: height * 0.84,
    marginTop: height * 0.01,
    width: width,
    backgroundColor: "white",
    flexDirection: "row",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 37,

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
        elevation: 6,
      },
    }),
  },
  textNone: {
    ...text,
    opacity: 0.5,
    fontSize: basicFontSize - 1,
    width: width - 37 * 2,
    textAlign: "center",
    alignSelf: "center",
  },
  line: {
    width: 1,
    height: "100%",
    backgroundColor: greyColor,
    opacity: 0.2,
  },
  monthContainer: {
    marginLeft: 20,
  },
  textMonth: {
    ...text,
    color: blueColor,
    fontSize: basicFontSize - 3,
  },
  daysContainer: {
    marginTop: 26,
    marginBottom: -31,
  },
  dayContainer: {
    width: width - (37 * 2 + 21),
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 31,
    alignItems: "center",
  },
  textDay: {
    ...text,
  },
  longRect: {
    height: 18,
    width: 6,
    backgroundColor: "#A8C0DB",
    marginHorizontal: 6,
  },
  shortRect: {
    height: 6,
    width: 18,
    backgroundColor: "#A8C0DB",
  },

  detailContainer: {
    marginTop: 16,
    marginBottom: 25,
  },
  widthLine: {
    width: width - (37 * 2 + 22),
    height: 1,
    backgroundColor: greyColor,
    opacity: 0.15,
    marginBottom: 24,
  },
  routesContainer: {
    marginBottom: 11,
  },
  textRoute: {
    ...text,
    opacity: 0.6,
    fontSize: basicFontSize - 2,
    marginBottom: 16,
  },
  btnRouteSite: {
    width: width - (58 + 52),
    height: 50,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderColor: blueColor,
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 15,
  },
  textBtnRoute: {
    ...text,
    color: blueColor,
    fontSize: basicFontSize - 3,
  },
});

export default styles;
