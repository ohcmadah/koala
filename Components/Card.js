import React from "react";
import { View, Text, Image } from "react-native";
import styles from "../Styles/CardStyles";
import greenTri from "../assets/home/green_tri.png";
import redTri from "../assets/home/red_tri.png";

const basicFontSize = 17;
const colors = ["#FF7A7A", "#707070", "#84DB6A"];

const titleStyle = {
  color: colors[1],
  fontSize: basicFontSize - 2,
  marginTop: 3,
};
let diffStyle = {
  color: colors[2],
  fontSize: basicFontSize - 4,
};

class Card extends React.Component {
  state = {
    diff: Math.abs(this.props.diff),
    triUrl: greenTri,
    numberStyle: {
      color: "#505050",
      fontSize: basicFontSize,
    },
  };
  componentDidMount() {
    const { title, diff, isRegion } = this.props;
    const isUp = diff >= 0 ? true : false;

    if (isUp) {
      diffStyle = {
        ...diffStyle,
        color: colors[0],
      };
      this.setState({
        triUrl: redTri,
      });
    }

    if (isRegion) {
      let color =
        title == "확진자"
          ? colors[0]
          : title == "격리중"
          ? colors[1]
          : colors[2];

      this.setState({
        numberStyle: {
          ...this.state.numberStyle,
          color: color,
          paddingBottom: 17,
        },
      });
    }
  }
  render() {
    const { title, number, isRegion } = this.props;
    const { triUrl, diff, numberStyle } = this.state;

    return (
      <View style={styles.cardStyle}>
        <Text style={[styles.font, titleStyle]}>{title}</Text>
        <Text style={[styles.font, numberStyle]}>{this._comma(number)}</Text>
        {isRegion ? (
          <></>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[styles.font, diffStyle]}>{this._comma(diff)}</Text>
            <Image
              style={{ width: 9, height: 5, marginLeft: 5 }}
              source={triUrl}
            />
          </View>
        )}
      </View>
    );
  }

  _comma = (num) => {
    var len, point, str;

    num = num + "";
    point = num.length % 3;
    len = num.length;

    str = num.substring(0, point);
    while (point < len) {
      if (str != "") str += ",";
      str += num.substring(point, point + 3);
      point += 3;
    }

    return str;
  };
}

export default Card;
