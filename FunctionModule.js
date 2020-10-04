import * as Location from "expo-location";
import { Alert } from "react-native";
import * as config from "./config";

const GOOGLE_API_KEY = config.GOOGLE_API_KEY;

export async function _getLocation() {
  try {
    await Location.requestPermissionsAsync();
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();
    return await _getReverseGeo(latitude, longitude);
  } catch (error) {
    Alert.alert(
      "위치를 찾을 수 없습니다.",
      "앱 설정에서 위치 정보를 허용해주세요."
    );
  }
}

async function _getReverseGeo(latitude, longitude) {
  const GEOLOCATION_API_URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
  const koreanRegion = [
    "제주특별자치도",
    "경상남도",
    "경상북도",
    "전라남도",
    "전라북도",
    "충청남도",
    "충청북도",
    "강원도",
    "경기도",
    "세종특별자치시",
    "울산광역시",
    "대전광역시",
    "광주광역시",
    "인천광역시",
    "대구광역시",
    "부산광역시",
    "서울특별시",
  ];
  const englishRegion = [
    "Jeju",
    "Gyeongsangnam-do",
    "Gyeongsangbuk-do",
    "Jeollanam-do",
    "Jeollabuk-do",
    "Chungcheongnam-do",
    "Chungcheongbuk-do",
    "Gangwon-do",
    "Gyeonggi-do",
    "Sejong",
    "Ulsan",
    "Daejeon",
    "Gwangju",
    "Incheon",
    "Daegu",
    "Busan",
    "Seoul",
  ];
  let resultLocation;
  await fetch(GEOLOCATION_API_URL)
    .then((response) => response.json())
    .then((data) => {
      const address = data.results[0].address_components;
      for (let i = 0; i < address.length; i++) {
        const addr = address[i].long_name;
        for (let j = 0; j < koreanRegion.length; j++) {
          const kRegion = koreanRegion[j];
          const eRegion = englishRegion[j];
          if (addr == kRegion || addr == eRegion) {
            resultLocation = kRegion;
            break;
          }
        }
      }
    });

  return resultLocation;
}
