import React from "react";
import { View } from "react-native";
import styles from "../Styles/AreaStyles";
import Card from "./Card";
import Loading from "./Loading";
import * as Location from "expo-location";

import * as config from "../config";
import XMLParser from "react-native-xml2js";

const CORONA_API_KEY = config.CORONA_API_KEY;
const GOOGLE_API_KEY = config.GOOGLE_API_KEY;

class Region extends React.Component {
  state = {
    isLoaded: false,
    datas: {},
    startDate: 0,
    endDate: 0,
  };

  _getData = async (startDate, endDate) => {
    const CORONA_API_URL = `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=${CORONA_API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${
      startDate + 1
    }&endCreateDt=${endDate}&`;

    await fetch(CORONA_API_URL)
      .then((response) => response.text())
      .then((data) => {
        XMLParser.parseString(data, (err, result) => {
          const datas = JSON.stringify(result);
          const parsedDatas = JSON.parse(datas);
          const items = parsedDatas.response.body[0].items[0];

          console.log(parsedDatas);

          const { defCnt, isolIngCnt, isolClearCnt } = items.item[0];

          const decideDiff = defCnt - items.item[1].defCnt;
          const careDiff = isolIngCnt - items.item[1].isolIngCnt;
          const clearDiff = isolClearCnt - items.item[1].isolClearCnt;

          this.setState({
            datas: {
              확진자: { title: "확진자", number: defCnt, diff: decideDiff },
              격리중: { title: "격리중", number: isolIngCnt, diff: careDiff },
              격리해제: {
                title: "격리해제",
                number: isolClearCnt,
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

  _getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      this._getReverseGeo(latitude, longitude);
    } catch (error) {
      this.getLocation();
    }
  };

  _getReverseGeo = async (latitude, longitude) => {
    const GEOLOCATION_API_URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
  };

  componentDidMount() {
    const date = new Date();
    const year = date.getFullYear();
    const month =
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1);
    const startDate = year + month + (date.getDate() - 1);
    const endDate = year + month + date.getDate();
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
