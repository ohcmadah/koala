import React from "react";
import { View } from "react-native";
import styles from "../Styles/AreaStyles";
import Card from "./Card";
import Loading from "./Loading";

import * as config from "../config";
import XMLParser from "react-native-xml2js";

const CORONA_API_KEY = config.CORONA_API_KEY;

class Region extends React.Component {
  state = {
    isLoaded: false,
    datas: {},
    startDate: 0,
    endDate: 0,
  };

  _getData = async (startDate, endDate) => {
    const CORONA_API_URL = `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=${CORONA_API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${startDate}&endCreateDt=${endDate}&`;

    await fetch(CORONA_API_URL)
      .then((response) => response.text())
      .then((data) => {
        XMLParser.parseString(data, (err, result) => {
          const datas = JSON.stringify(result);
          const parsedDatas = JSON.parse(datas);
          const items = parsedDatas.response.body[0].items[0].item;

          let { location } = this.props;
          if (location.length == 5 || location.length == 3) {
            location = location.substring(0, 2);
          }

          let index;
          Object.values(items).some((item, i) => {
            const { gubun } = item;
            console.log(gubun[0], location);
            if (location == gubun) index = i;
            return location == gubun;
          });

          const { defCnt, isolIngCnt, isolClearCnt } = items[index];

          this.setState({
            datas: {
              확진자: { title: "확진자", number: defCnt, diff: 0 },
              격리중: { title: "격리중", number: isolIngCnt, diff: 0 },
              격리해제: {
                title: "격리해제",
                number: isolClearCnt,
                diff: 0,
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

    let startDate = year + month + date.getDate();
    let endDate = year + month + date.getDate();

    if (date.getHours() < 4) {
      startDate = year + month + (date.getDate() - 1);
      endDate = year + month + (date.getDate() - 1);
    }

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
              isRegion={true}
            />
          ))
        ) : (
          <Loading />
        )}
      </View>
    );
  }
}

export default Region;
