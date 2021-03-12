import { Alert } from "react-native";

export const baseUrl="";

export const showMessage = (message) => {
    Alert.alert(message);
}