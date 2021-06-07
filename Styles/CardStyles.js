import { StyleSheet, Platform, Dimensions } from "react-native";

// 디바이스 화면 너비 구하기
const { width } = Dimensions.get("window");
// 
const cardWidth = Platform.isPad
  ? (width - 36 * 2 - 200) / 3
  : (width - 36 * 2 - 30) / 3;

const styles = StyleSheet.create({
  cardStyle: {
    width: cardWidth,
    height: cardWidth,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    justifyContent: Platform.isPad ? "space-around" : "space-between",
    alignItems: "center",
    marginHorizontal: 4,

    // elevation
    ...Platform.select({
      ios: {
        shadowColor: "rgb(0, 0, 0)",
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: {
          height: 0,
          width: 2,
        },
      },
      android: {
        elevation: 2,
      },
    }),
  },
  fontWeight: {
    fontWeight: "bold",
  },
});

export default styles;
