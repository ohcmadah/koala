import { StyleSheet, Platform, Dimensions } from "react-native";

const mainColor = "#A3C1E2";
const greyColor = "#707070";
const basicFontSize = 18;
const basicPadding = 38;
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  navContainer: {
    flex: 0.15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: basicPadding,
  },
  textNav: {
    color: greyColor,
    fontWeight: "bold",
    fontSize: basicFontSize + 2,
  },

  cardContainer: {
    height: height * 0.33,
    marginTop: 10,
    paddingHorizontal: basicPadding,
  },
  cardView: {
    height: "100%",
    backgroundColor: "white",
    borderRadius: 20,

    ...Platform.select({
      ios: {
        shadowColor: "rgb(0, 0, 0)",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: {
          height: 3,
          width: 0,
        },
      },
      android: {
        elevation: 5,
      },
    }),
  },
  textCardTitle: {
    color: mainColor,
    fontWeight: "bold",
    fontSize: basicFontSize + 2,
    marginLeft: 23,
    marginTop: 17,
  },
  scoreContainer: {
    flex: 0.5,
    height: height * 0.18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textScore: {
    color: greyColor,
    fontWeight: "bold",
    fontSize: basicFontSize + 39,
  },
  textScoreDesc: {
    color: greyColor,
    fontWeight: "bold",
    fontSize: basicFontSize - 2,
    marginLeft: 7,
    marginTop: 41,
  },
  divider: {
    height: height * 0.15,
    width: 1,
    backgroundColor: greyColor,
    opacity: 0.3,
  },
  iconsContainer: {
    flex: 0.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    height: height * 0.15,
    justifyContent: "space-around",
    alignItems: "center",
  },
  circleContainer: {
    height: height * 0.15,
    justifyContent: "space-around",
    alignItems: "center",
    marginLeft: 41,
  },
  circle: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  btnAgain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BACCE1",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  textAgain: {
    color: "white",
    fontWeight: "bold",
    fontSize: basicFontSize - 2,
  },

  bottomCardContainer: {
    minHeight: height * 0.51,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 38,
    marginBottom: 10,
    borderRadius: 50,
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
        elevation: 2,
      },
    }),
  },
  textNoneScore: {
    width: width,
    textAlign: "center",
    color: greyColor,
    opacity: 0.5,
    fontSize: basicFontSize - 1,
    fontWeight: "bold",
  },
  line: {
    height: "80%",
    width: 1,
    backgroundColor: greyColor,
    opacity: 0.2,
    marginLeft: 38,
  },
  monthContainer: {
    minHeight: height * 0.37,
    marginLeft: 20,
    marginTop: 39,
    marginBottom: 59,
  },
  textMonth: {
    color: "#9DB4CE",
    fontSize: basicFontSize - 3,
    fontWeight: "bold",
  },
  daysContainer: {
    marginTop: -4,
  },
  dayContainer: {
    width: width - 101,
    marginTop: 31,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textDay: {
    color: greyColor,
    fontWeight: "bold",
    fontSize: basicFontSize,
  },
  barContainer: {
    width: width - 231,
    height: 7,
    backgroundColor: "#E2E2E2",
    borderRadius: 20,
  },
  colorBar: {
    width: width - 320,
    height: 7,
    backgroundColor: "#F9D315",
    borderRadius: 20,
  },
  textDayScore: {
    color: "#F9D315",
    fontWeight: "bold",
    fontSize: basicFontSize - 1,
  },
});

export default styles;
