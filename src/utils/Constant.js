// export const baseUrl = "http://14.143.90.233:3000/";
export const baseUrl = "http://192.168.0.218:3000/";

import { Alert } from "react-native";

export const opacity = 0.5;
export const isDesignBuild = true;

export const showMessage = (message) => {
    Alert.alert(message);
}
