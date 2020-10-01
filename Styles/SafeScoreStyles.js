import { StyleSheet, Platform, Dimensions } from "react-native";

const mainColor = "#FAFAFA";
const basicFontSize = 18;
const basicPadding = 38;
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
  },
  navContainer: {
    flex: 0.16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: basicPadding,
  },
  textNav: {
    color: "#707070",
    fontWeight: "bold",
    fontSize: basicFontSize + 2,
  },

  cardContainer: {
    flex: 0.33,
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
    color: "#9DB4CE",
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
    color: "#707070",
    fontWeight: "bold",
    fontSize: basicFontSize + 39,
  },
  textScoreDesc: {
    color: "#707070",
    fontWeight: "bold",
    fontSize: basicFontSize - 2,
    marginLeft: 7,
    marginTop: 41,
  },
  divider: {
    height: "90%",
    width: 1,
    backgroundColor: "#707070",
    opacity: 0.3,
  },
  iconsContainer: {
    flex: 0.5,
    justifyContent: "space-between",
    marginVertical: 25,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 40,
  },
  circle: {
    width: 14,
    height: 14,
    backgroundColor: "#F9D315",
    borderRadius: 7,
  },
  btnAgain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "rgb(0, 0, 0)",
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 5,
      },
    }),
  },
  textAgain: {
    color: "#707070",
    fontWeight: "bold",
    fontSize: basicFontSize - 2,
  },
});

export default styles;
