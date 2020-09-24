import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../Styles/AreaStyles";
import Card from "./Card";

const datas = {
  확진자: { title: "확진자", number: "346" },
  격리중: { title: "격리중", number: "411" },
  격리해제: { title: "격리해제", number: "236" },
};

class Region extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {Object.values(datas).map((data, index) => (
          <Card
            key={index}
            title={data.title}
            number={data.number}
            isRegion={true}
          />
        ))}
      </SafeAreaView>
    );
  }
}

export default Region;
