import React from "react";
import { View } from "react-native";
import styles from "../Styles/AreaStyles";
import Card from "./Card";
import Loading from "./Loading";

import * as config from "../config";
import XMLParser from "react-native-xml2js";

const CORONA_API_KEY = config.CORONA_API_KEY;

class Area extends React.Component {
  state = {
    isLoaded: false,
    isRegion: this.props.isRegion,
    datas: {},
    startDate: 0,
    endDate: 0,
  };

  _getData = async (startDate, endDate) => {
    const { isRegion } = this.state;
    const CORONA_API_URL = `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=${CORONA_API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${startDate}&endCreateDt=${endDate}&`;
    const KOREA_API_URL = `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${CORONA_API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${startDate}&endCreateDt=${endDate}&`;

    await fetch(isRegion ? CORONA_API_URL : KOREA_API_URL)
      .then((response) => response.text())
      .then((data) => {
        XMLParser.parseString(data, (err, result) => {
          const datas = JSON.stringify(result);
          const parsedDatas = JSON.parse(datas);

          let decideCnt, careCnt, clearCnt, decideDiff, careDiff, clearDiff;

          const items = parsedDatas.response.body[0].items[0].item;
          if (isRegion) {
            let { location } = this.props;
            if (
              location.length == 5 ||
              location.length == 3 ||
              location.length == 7
            ) {
              location = location.substring(0, 2);
            } else {
              location = location.charAt(0) + location.charAt(2);
            }
            Object.values(items).map((item) => {
              const { gubun, createDt } = item;
              let date = createDt[0].split(" ")[0].replace(/-/g, "");
              if (location == gubun) {
                if (date == endDate) {
                  decideCnt = item.defCnt;
                  careCnt = item.isolIngCnt;
                  clearCnt = item.isolClearCnt;
                } else if (date == startDate) {
                  decideDiff = decideCnt - item.defCnt;
                  careDiff = careCnt - item.isolIngCnt;
                  clearDiff = clearCnt - item.isolClearCnt;
                }
              }
            });
          } else {
            Object.values(items).map((item) => {
              if (item.stateDt == endDate) {
                decideCnt = item.decideCnt;
                careCnt = item.careCnt;
                clearCnt = item.clearCnt;
              } else if (item.stateDt == startDate) {
                decideDiff = decideCnt - item.decideCnt;
                careDiff = careCnt - item.careCnt;
                clearDiff = clearCnt - item.clearCnt;
              }
            });
          }

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

  _setDate = () => {
    const nowDate = new Date();
    if (nowDate.getHours() < 10) {
      const yesterDate = nowDate.getTime() - 1 * 24 * 60 * 60 * 1000;
      nowDate.setTime(yesterDate);
    }
    const endDate = this._getDate(nowDate);

    const yesterDate = nowDate.getTime() - 1 * 24 * 60 * 60 * 1000;
    nowDate.setTime(yesterDate);
    const startDate = this._getDate(nowDate);

    return { endDate: endDate, startDate: startDate };
  };

  _getDate = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    return `${year}${month}${day}`;
  };

  componentDidMount() {
    const { startDate, endDate } = this._setDate();
    this._getData(startDate, endDate);
    this.setState({
      isLoaded: true,
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
            />
          ))
        ) : (
          <Loading />
        )}
      </View>
    );
  }
}

export default Area;
