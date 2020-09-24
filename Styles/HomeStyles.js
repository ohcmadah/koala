import { StyleSheet } from "react-native";

const mainColor = "#9DB4CE";
const basicFontSize = 17;
const basicPadding = 36;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
  },
  topBar: {
    flex: 1.3,
    width: "100%",
    height: 110,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  locationNav: {
    flex: 2.7,
    marginHorizontal: basicPadding,
    marginTop: 30,
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
    margin: 4,
  },
  siteBox: {
    flex: 0.6,
    marginHorizontal: basicPadding,
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
  site: {
    color: "white",
    fontWeight: "bold",
    fontSize: basicFontSize - 2,
  },
  bottomNav: {
    flex: 4,
    justifyContent: "flex-end",
  },
  circle: {
    flex: 1,
    position: "absolute",
  },
});

export default styles;
