import React from "react";
import { View } from "react-native";
import styles from "../Styles/AreaStyles";
import Card from "./Card";

const datas = {
  확진자: { title: "확진자", number: "22,893", diff: 110 },
  격리중: { title: "격리중", number: "24,750", diff: -698 },
  격리해제: { title: "격리해제", number: "19,970", diff: 199 },
};

class Korea extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {Object.values(datas).map((data, index) => (
          <Card
            key={index}
            title={data.title}
            number={data.number}
            diff={data.diff}
            isRegion={false}
          />
        ))}
      </View>
    );
  }
}

export default Korea;
