import moment from 'moment';
import React,{useState} from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import HeaderWhitepupilMessage from '../../../src/component/reusable/header/HeaderWhitepupilMessage';
import { baseUrl } from '../../../srcmobile/utils/Constant';
import { opacity } from '../../utils/Constant';
import Images from '../../utils/Images';
import PAGESTYLE from './Styles';



const Pupillist = (props, { style }) => (
    <View style={[PAGESTYLE.pupilData]}>
        <View style={PAGESTYLE.pupilProfile, PAGESTYLE.firstColumn}>
            {/* <Image source={{ uri: baseUrl + props.item.ProfilePicture }} style={PAGESTYLE.userStamp} /> */}
            <Text style={[PAGESTYLE.pupilName, PAGESTYLE.userStampName]}>{'message of title'}</Text>
        </View>

        <View style={[PAGESTYLE.pupilProfile, PAGESTYLE.secoundColumn]}>
            <Text style={PAGESTYLE.pupilName}>{props.item.HomeWorkDate ? moment(Date()).format('DD/MM/yyyy') : '-'}</Text>
        </View>
        <View style={PAGESTYLE.pupilProfile, PAGESTYLE.secoundColumn}>
            <Text style={PAGESTYLE.pupilName}>{'group 1'}</Text>
        </View>
        
        <View style={PAGESTYLE.pupilProfile}>
            <Text style={[PAGESTYLE.pupilName, props.item.Submited ? PAGESTYLE.yesText : PAGESTYLE.noText,]}>{props.item.Submited ? 'Yes' : 'No'}</Text>
        </View>
       
        <View style={[PAGESTYLE.pupilProfile, PAGESTYLE.lastColumn]}>
            {/* <Text style={PAGESTYLE.pupilName, props.item.Marked ? PAGESTYLE.markText : PAGESTYLE.noText}>{props.item.Marked ? 'Yes' : 'No'}</Text> */}
            <TouchableOpacity
                style={PAGESTYLE.pupilDetailLink}
                activeOpacity={opacity}
                onPress={() => props.navigateToDetail()}>
                <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} />
            </TouchableOpacity>
        </View>
    </View>
);
const Message = (props) => {
    const [selectedId, setSelectedId] = useState(null);

    const pupilRender = ({ item, index }) => {
        return (
            <Pupillist
                item={item}
                navigateToDetail={() => props.navigateToDetail(item)}
                onAlertPress={() => { props.onAlertPress() }}
            />
        );
    };
    return (
        <View style={PAGESTYLE.plainBg}>
            <HeaderWhitepupilMessage />
            <View style={PAGESTYLE.pupilTable}>
                <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.firstColumn]}>
                    <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>MESSAGE TITLE</Text>
                </View>
                <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.secoundColumn]}>
                    <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>DATE</Text>
                </View>
                <View style={PAGESTYLE.pupilTableHeadingMain}>
                    <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>CLASS</Text>
                </View>
                <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.secoundColumn]}>
                    <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>STATUS</Text>
                </View>
                {/* <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.lastColumn]}>
                    <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Marked</Text>
                </View> */}
            </View>
            <View style={PAGESTYLE.pupilTabledata}>
                <SafeAreaView style={PAGESTYLE.pupilTabledataflatlist}>
                    <FlatList
                        data={[1, 2, 3]}
                        renderItem={pupilRender}
                        keyExtractor={(item) => item.id}
                        extraData={selectedId}
                        showsVerticalScrollIndicator={false}
                    />

                    {/* {isLoading ?
                        <ActivityIndicator
                            style={{ flex: 1 }}
                            size={Platform.OS == 'ios' ? 'large' : 'small'}
                            color={COLORS.yellowDark} />
                        :
                        // homeworkData.length > 0 ?
                            <FlatList
                                data={[1,2,3]}
                                renderItem={pupilRender}
                                keyExtractor={(item) => item.id}
                                extraData={selectedId}
                                showsVerticalScrollIndicator={false}
                            />
                            // :
                            // <View style={{ height: 100, justifyContent: 'center' }}>
                            //     <Text style={{ alignItems: 'center', fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                            // </View>
                    } */}
                </SafeAreaView>
            </View>
        </View>

    );

}

export default Message;
