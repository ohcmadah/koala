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
    // 확진자 지역 정보 가져왔는지 여부
    isLoaded: false,
    // 우리 지역인지 전국인지 여부
    isRegion: this.props.isRegion,
    // 확진자, 격리중, 격리해제 정보
    datas: {},
    // 전날
    startDate: 0,
    // 오늘
    endDate: 0,
  };

  _getData = async (startDate, endDate) => {
    const { isRegion } = this.state;
    // 전국 확진자 현황 API (공공데이터포털)
    const CORONA_API_URL = `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=${CORONA_API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${startDate}&endCreateDt=${endDate}&`;
    // 지역 확진자 현황 API (공공데이터포털)
    const KOREA_API_URL = `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${CORONA_API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${startDate}&endCreateDt=${endDate}&`;

    // 지역일 경우 지역 API 주소, 전국일 경우 전국 API 주소로 요청
    await fetch(isRegion ? CORONA_API_URL : KOREA_API_URL)
      .then((response) => response.text())
      .then((data) => {
        // XML ==> Json 변환
        XMLParser.parseString(data, (err, result) => {
          const datas = JSON.stringify(result);
          const parsedDatas = JSON.parse(datas);

          // 확진자 명수, 격리중 명수, 격리해제 명수, 전날과의 증감 추이
          let decideCnt, careCnt, clearCnt, decideDiff, careDiff, clearDiff;

          const items = parsedDatas.response.body[0].items[0].item;
          if (isRegion) {
            // 지역일 경우
            // 설정되어있는 지역
            let { location } = this.props;
            if (
              location.length == 5 ||
              location.length == 3 ||
              location.length == 7
            ) {
              // 제주특별자치도, 강원도, 경기도, 광역시, 서울특별시
              // => 제주, 강원 ...
              location = location.substring(0, 2);
            } else {
              // 경상남도, 경상북도, 전라남도, 전라북도, 충청남도, 충청북도
              // => 경남, 전남 ...
              location = location.charAt(0) + location.charAt(2);
            }
            Object.values(items).map((item) => {
              // 지역명, 데이터 날짜
              const { gubun, createDt } = item;
              // yyyymmdd
              let date = createDt[0].split(" ")[0].replace(/-/g, "");
              if (location == gubun) {
                // 설정한 지역이면
                if (date == endDate) {
                  // 날짜가 오늘이면 오늘의 명수 저장
                  decideCnt = item.defCnt;
                  careCnt = item.isolIngCnt;
                  clearCnt = item.isolClearCnt;
                } else if (date == startDate) {
                  // 날짜가 전날이면 오늘의 명수 - 전날의 명수 => 증감추이
                  decideDiff = decideCnt - item.defCnt;
                  careDiff = careCnt - item.isolIngCnt;
                  clearDiff = clearCnt - item.isolClearCnt;
                }
              }
            });
          } else {
            // 전국일 경우
            Object.values(items).map((item) => {
              // 날짜가 오늘이면 오늘의 명수 저장
              if (item.stateDt == endDate) {
                decideCnt = item.decideCnt;
                careCnt = item.careCnt;
                clearCnt = item.clearCnt;
              } else if (item.stateDt == startDate) {
                // 날짜가 전날이면 오늘의 명수 - 전날의 명수 => 증감추이
                decideDiff = decideCnt - item.decideCnt;
                careDiff = careCnt - item.careCnt;
                clearDiff = clearCnt - item.clearCnt;
              }
            });
          }

          // 가져온 데이터 state에 등록
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

    this.setState({
      isLoaded: true,
    });
  };

  // 전날과 오늘 날짜 구하기
  _setDate = () => {
    const nowDate = new Date();
    // 데이터 갱신이 9시 45분 이후에 되기 때문에 10시 전일 경우 하루를 더 빼준다
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

  // 문자열 형식으로 날짜 반환 (yyyymmdd)
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
    // 확진자 정보 가져오기
    this._getData(startDate, endDate);
  }

  render() {
    const { datas, isLoaded } = this.state;
    return (
      <View style={styles.container}>
        {/* Card 3개 (확진자, 격리중, 격리해제) */}
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
