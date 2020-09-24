import React from "react";
import { View, Text, Image } from "react-native";
import styles from "../Styles/CardStyles";
import greenTri from "../assets/home/green_tri.png";
import redTri from "../assets/home/red_tri.png";

const basicFontSize = 17;
const IMAGE_URL = "../assets/home";
const redColor = "#FF7A7A";

const titleStyle = {
  color: "#707070",
  fontSize: basicFontSize - 2,
  marginTop: 3,
};
const numberStyle = {
  color: "#505050",
  fontSize: basicFontSize,
};
let diffStyle = {
  color: "#84DB6A",
  fontSize: basicFontSize - 4,
};

class Card extends React.Component {
  state = {
    diff: Math.abs(this.props.diff),
    triUrl: greenTri,
  };
  componentDidMount() {
    const isUp = this.props.diff > 0 ? true : false;
    if (isUp) {
      diffStyle = {
        ...diffStyle,
        color: redColor,
      };
      this.setState({
        triUrl: redTri,
      });
    }
  }
  render() {
    const { title, number } = this.props;
    const { triUrl, diff } = this.state;
    return (
      <View style={styles.cardStyle}>
        <Text style={[styles.font, titleStyle]}>{title}</Text>
        <Text style={[styles.font, numberStyle]}>{number}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.font, diffStyle]}>{diff}</Text>
          <Image
            style={{ width: 9, height: 5, marginLeft: 5 }}
            source={triUrl}
          />
        </View>
      </View>
    );
  }
}

export default Card;
