import { Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    viewBox: {
        paddingHorizontal: 20,
        width: width,
        justifyContent: 'center',
        padding: 10,
        alignItems: 'center',
        height: 150,
    },
});