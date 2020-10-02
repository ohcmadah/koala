import { StyleSheet } from "react-native";

const blueColor = "#A3C1E2";
const greyColor = "#707070";
const basicFontSize = 17;
const basicPadding = 38;

const text = {
  color: "white",
  fontSize: basicFontSize,
  fontWeight: "bold",
  textAlign: "center",
};
const btnSubmit = {
  height: 48,
  justifyContent: "center",
  borderRadius: 30,
  backgroundColor: blueColor,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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

  contentContainer: {
    flex: 0.85,
    paddingHorizontal: basicPadding + 2,
  },
  btnSubmit: {
    ...btnSubmit,
  },
  btnSubmitDisable: {
    ...btnSubmit,
    backgroundColor: "white",
    borderColor: "#BACCE1",
    borderWidth: 2,
    opacity: 0.7,
  },
  textBtnSubmit: {
    ...text,
  },
  textBtnSubmitDisable: {
    ...text,
    color: "#BACCE1",
  },
});

export default styles;
