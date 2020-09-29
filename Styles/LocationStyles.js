import { StyleSheet, Dimensions } from "react-native";

const mainColor = "#9DB4CE";
const basicFontSize = 17;
const basicMargin = 36;

const { height } = Dimensions.get("window");

const text = {
  color: "white",
  fontSize: basicFontSize,
  fontWeight: "bold",
  textAlign: "center",
};
const btnSubmit = {
  height: 50,
  justifyContent: "center",
  borderRadius: 60,
  backgroundColor: mainColor,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
  },
  backgroundImg: {
    flex: 1,
    paddingHorizontal: 42,
  },
  textContentTitle: {
    ...text,
    fontSize: basicFontSize + 2,
    marginTop: 70,
  },
  topContainer: {
    height: height * 0.25,
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
    height: height * 0.55,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  description: {
    ...text,
    fontSize: basicFontSize + 2,
    textAlign: "center",
    lineHeight: 30,
    alignSelf: "flex-start",
    marginTop: height * 0.25,
  },
  koala: {
    width: 158,
    height: 183,
    resizeMode: "contain",
  },

  bottomContainer: {
    height: height * 0.2,
    justifyContent: "center",
  },
  btnSubmit: {
    ...btnSubmit,
    backgroundColor: "white",
  },
  btnSubmitDisable: {
    ...btnSubmit,
    borderColor: "white",
    borderWidth: 2,
    opacity: 0.5,
  },
  textBtnSubmit: {
    ...text,
    color: mainColor,
  },
  textBtnSubmitDisable: {
    ...text,
  },
});

export default styles;
