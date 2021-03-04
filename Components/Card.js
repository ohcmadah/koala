import React from "react";
import { View, Text, Image } from "react-native";
import styles from "../Styles/CardStyles";

import greenTri from "../assets/home/green_tri.png";
import redTri from "../assets/home/red_tri.png";

const basicFontSize = 17;
const colors = {
  red: "#FF7A7A",
  grey: "#707070",
  green: "#84DB6A",
  deepgrey: "#505050",
};

// 확진자, 격리중, 격리해제 텍스트 스타일
const titleStyle = {
  color: colors.grey,
  fontSize: basicFontSize - 2,
  marginTop: 3,
};

// 현황 카드 1개
class Card extends React.Component {
  state = {
    // 삼각형 url
    triUrl: greenTri,
    // 현황 숫자 스타일
    numberStyle: {
      color: colors.deepgrey,
      fontSize: basicFontSize,
    },
  };

  componentDidMount() {
    // 전날과의 증감, 제목(확진자, 격리중, 격리해제)
    const { diff, title } = this.props;
    // 확진자와 격리중은 감소가 초록색, 격리해제는 증가가 초록색
    let diffColor = diff > 0 ? colors.red : colors.green;
    if (title == "격리해제") {
      diffColor = diff < 0 ? colors.red : colors.green;
    }
    // 증감에 따라 색상 스타일 지정
    this.setState({
      diffStyle: {
        color: diffColor,
        fontSize: basicFontSize - 4,
      },
    });
  }

  render() {
    const { title, number } = this.props;
    let { diff } = this.props;
    const { numberStyle, diffStyle } = this.state;

    if (title == "격리해제") {
      // 격리해제면 음수로
      diff = diff * -1;
    }

    return (
      <View style={styles.cardStyle}>
        {/* Title Text */}
        <Text style={[styles.fontWeight, titleStyle]}>{title}</Text>
        {/* 명수 Text */}
        <Text style={[styles.fontWeight, numberStyle]}>
          {this._comma(number)}
        </Text>
        {/* 증감 컨테이너 */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* 증감 숫자 */}
          <Text style={[styles.fontWeight, diffStyle]}>
            {this._comma(diff)}
          </Text>
          {/* 삼각형 */}
          <Image
            style={{ width: 9, height: 5, marginLeft: 5 }}
            source={diff > 0 ? redTri : greenTri}
          />
        </View>
      </View>
    );
  }

  // 0,000 콤마 추가
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
