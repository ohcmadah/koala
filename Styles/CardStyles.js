import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  cardStyle: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-between",
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
  font: {
    fontWeight: "bold",
  },
});

export default styles;
