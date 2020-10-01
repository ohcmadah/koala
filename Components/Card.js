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

class Card extends React.Component {
  state = {
    triUrl: greenTri,
    numberStyle: {
      color: "#505050",
      fontSize: basicFontSize,
    },
  };
  componentDidMount() {
    const { diff } = this.props;
    let diffColor = diff >= 0 ? colors[0] : colors[2];
    this.setState({
      diffStyle: {
        color: diffColor,
        fontSize: basicFontSize - 4,
      },
    });
  }
  render() {
    const { title, number, diff } = this.props;
    const { numberStyle, diffStyle } = this.state;

    return (
      <View style={styles.cardStyle}>
        <Text style={[styles.fontWeight, titleStyle]}>{title}</Text>
        <Text style={[styles.fontWeight, numberStyle]}>
          {this._comma(number)}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.fontWeight, diffStyle]}>
            {this._comma(diff)}
          </Text>
          <Image
            style={{ width: 9, height: 5, marginLeft: 5 }}
            source={diff >= 0 ? redTri : greenTri}
          />
        </View>
      </View>
    );
  }

  _comma = (num) => {
    let len, point, str;

    num = Math.abs(num) + "";
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
