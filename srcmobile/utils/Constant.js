// export const baseUrl = "http://14.143.90.233:3000/"; //public
export const baseUrl = "http://192.168.0.218:3000/"; //internal
import { Alert } from "react-native";

export const opacity = 0.5;
export const isDesignBuild = false;
export const cellWidth = 167;

export class Var {
     static isCalender = false;
}

export const showMessage = (message) => {
    Alert.alert(message);
}
