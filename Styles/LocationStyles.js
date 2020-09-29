import { StyleSheet } from "react-native";

const mainColor = "#9DB4CE";
const basicFontSize = 17;
const basicMargin = 36;

const text = {
  color: "white",
  fontSize: basicFontSize,
  fontWeight: "bold",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
  },
  textContentTitle: {
    ...text,
    fontSize: basicFontSize + 2,
    marginTop: 70,
  },
  topContainer: {
    flex: 2.1,
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    marginTop: 30,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: mainColor,
    alignItems: "center",
  },
  searchIcon: {
    height: 20,
    width: 20,
    marginHorizontal: 17,
  },
  input: {
    flex: 1,
    ...text,
    fontSize: basicFontSize - 1,
  },

  descContainer: {
    flex: 5.9,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  description: {
    ...text,
    fontSize: basicFontSize + 2,
    textAlign: "center",
  },
  koala: {
    width: "40%",
    resizeMode: "contain",
  },

  bottomContainer: {
    flex: 2,
    justifyContent: "center",
  },
});

export default styles;
