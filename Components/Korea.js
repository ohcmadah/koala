import React from "react";
import { View } from "react-native";
import styles from "../Styles/AreaStyles";
import Card from "./Card";
import Loading from "./Loading";

import * as config from "../config";
import XMLParser from "react-native-xml2js";

const CORONA_API_KEY = config.CORONA_API_KEY;

class Korea extends React.Component {
  state = {
    isLoaded: false,
    datas: {},
    startDate: 0,
    endDate: 0,
  };

  _getData = async (startDate, endDate) => {
    const API_URL = `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${CORONA_API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${startDate}&endCreateDt=${endDate}&`;

    await fetch(API_URL)
      .then((response) => response.text())
      .then((data) => {
        XMLParser.parseString(data, (err, result) => {
          const datas = JSON.stringify(result);
          const parsedDatas = JSON.parse(datas);
          const items = parsedDatas.response.body[0].items[0];

          const { decideCnt, careCnt, clearCnt } = items.item[0];

          const decideDiff = decideCnt - items.item[1].decideCnt;
          const careDiff = careCnt - items.item[1].careCnt;
          const clearDiff = clearCnt - items.item[1].clearCnt;

          this.setState({
            datas: {
              확진자: { title: "확진자", number: decideCnt, diff: decideDiff },
              격리중: { title: "격리중", number: careCnt, diff: careDiff },
              격리해제: {
                title: "격리해제",
                number: clearCnt,
                diff: clearDiff,
              },
            },
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    const date = new Date();
    const year = date.getFullYear();
    const month =
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1);
    const startDate = year + month + (date.getDate() - 2);
    const endDate = year + month + (date.getDate() - 1);
    this._getData(startDate, endDate);
    this.setState({
      isLoaded: true,
      startDate: startDate,
      endDate: endDate,
    });
  }

  render() {
    const { datas, isLoaded } = this.state;
    return (
      <View style={styles.container}>
        {isLoaded ? (
          Object.values(datas).map((data, index) => (
            <Card
              key={index}
              title={data.title}
              number={data.number}
              diff={data.diff}
              isRegion={false}
            />
          ))
        ) : (
          <Loading />
        )}
      </View>
    );
  }
}

export default Korea;
