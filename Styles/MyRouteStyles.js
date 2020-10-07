import { StyleSheet, Platform, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const basicFontSize = 18;
const greyColor = "#707070";
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
    color: "#9DB4CE",
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
  },
  textDay: {
    ...text,
  },
  longRect: {
    height: 18,
    width: 6,
    backgroundColor: "#A8C0DB",
  },
});

export default styles;
