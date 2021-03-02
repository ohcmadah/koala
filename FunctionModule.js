import * as Location from "expo-location";
import { Alert, Platform } from "react-native";
import * as config from "./config";

const GOOGLE_API_KEY = config.GOOGLE_API_KEY;
const regionList = [
  "제주특별자치도",
  "경상남도",
  "경상북도",
  "전라남도",
  "전라북도",
  "충청남도",
  "충청북도",
  "강원도",
  "경기도",
  "울산광역시",
  "대전광역시",
  "광주광역시",
  "인천광역시",
  "대구광역시",
  "부산광역시",
  "서울특별시",
];

export async function _getLocation(detail) {
  try {
    await Location.requestPermissionsAsync();
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();
    return await _getReverseGeo(latitude, longitude, detail);
  } catch (error) {
    Alert.alert(
      "위치를 찾을 수 없습니다.",
      "앱 설정에서 위치 정보를 허용하거나, 다시 시도해주세요."
    );
  }
}

// 주소 얻어오기 (google geocoding api)
async function _getReverseGeo(latitude, longitude, detail) {
  const GEOLOCATION_API_URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}&language=ko`;

  let location;
  await fetch(GEOLOCATION_API_URL)
    .then((response) => response.json())
    .then((data) => {
      if (detail) {
        const address = data.results[0].formatted_address;
        location = address;
      } else {
        location = _findLocation(data);
      }
    });
  return location;
}

export async function _setLocation(address) {
  const GEOLOCATION_API_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}&language=ko`;

  let resultLocation = "";
  await fetch(GEOLOCATION_API_URL)
    .then((response) => response.json())
    .then((data) => {
      if (data.status != "ZERO_RESULTS") {
        resultLocation = _findLocation(data);
      }

      if (address.includes("세종")) {
        resultLocation = "세종특별자치시";
      }
    });
  return resultLocation;
}

function _findLocation(data) {
  const address = data.results[0].address_components;
  console.log(address);
  for (let i = 0; i < address.length; i++) {
    const addr = address[i].long_name;
    for (let j = 0; j < regionList.length; j++) {
      if (addr == regionList[j]) {
        resultLocation = regionList[j];
        break;
      }
    }
  }
  return resultLocation;
}

export const _getYYYYMMDD = () => {
  const timezoneOffset = new Date().getTimezoneOffset() * 60000;
  const timezoneDate = new Date(Date.now() - timezoneOffset);
  return timezoneDate.toISOString().substring(0, 10);
};
