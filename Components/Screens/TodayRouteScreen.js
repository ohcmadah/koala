import React from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../Styles/TodayRouteStyles";
import * as Location from "expo-location";
import * as config from "../../config";

const GOOGLE_API_KEY = config.GOOGLE_API_KEY;

class TodayRoute extends React.Component {
  render() {
    return <SafeAreaView></SafeAreaView>;
  }
}

export default TodayRoute;
