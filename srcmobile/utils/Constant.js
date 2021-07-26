// export const baseUrl = "http://14.143.90.233:3000/"; //public
export const baseUrl = "http://192.168.0.218:3000/"; //internal
import { Alert, Platform } from "react-native";

export const opacity = 0.5;
export const isDesignBuild = false;
export const isRunningFromVirtualDevice = false;
export const cellWidth = 250;

export const Lesson = 'Lesson';
export const Event = 'Event';

export class Var {
    static isCalender = false;
}

export const showMessage = (message) => {
    if (Platform.OS == 'ios') {
        Alert.alert(message, null);
    } else {
        Alert.alert(null, message);
    }
}

export const showMessageWithCallBack = (message, callBack) => {
    if (Platform.OS == 'ios') {
        Alert.alert(message, null,
            [
                { text: 'OK', onPress: () => { callBack() } },
            ]);
    } else {
        Alert.alert(null, message,
            [
                { text: 'OK', onPress: () => { callBack() } },
            ]);
    }
}

export const emailValidate = (text) => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
    //   this.setState({ email: text })
      return false;
    }
    else {
    //   this.setState({ email: text })
      console.log("Email is Correct");
      return true
    }
  }
