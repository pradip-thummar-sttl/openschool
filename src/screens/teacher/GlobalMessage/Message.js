import moment from 'moment';
import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList, ActivityIndicator, } from 'react-native'
import HeaderWhitepupilMessage from '../../../component/reusable/header/HeaderWhitepupilMessage';
import { EndPoints } from '../../../service/EndPoints';
import { Service } from '../../../service/Service';
import COLORS from '../../../utils/Colors';
import { opacity, showMessage } from '../../../utils/Constant';
import Images from '../../../utils/Images';
import { User } from '../../../utils/Model';
import PAGESTYLE from './Styles';

const MessageList = (props, { style }) => (
    <TouchableOpacity
        style={PAGESTYLE.pupilDetailLink}
        activeOpacity={opacity}
        onPress={() => props.navigateToDetail()}>
        <View style={[PAGESTYLE.pupilData]}>
            <View style={PAGESTYLE.pupilProfile, PAGESTYLE.firstColumn}>
                <Text style={[PAGESTYLE.pupilName, PAGESTYLE.userStampName]}>{props.item.Title}</Text>
            </View>

            <View style={[PAGESTYLE.pupilProfile, PAGESTYLE.secoundColumn]}>
                <Text style={PAGESTYLE.pupilName}>{moment(props.item.CreatedDate).format('DD/MM/yyyy')}</Text>
            </View>
            {/* <View style={PAGESTYLE.pupilProfile, PAGESTYLE.secoundColumn}>
            <Text style={PAGESTYLE.pupilName}>{'group 1'}</Text>
        </View> */}

            <View style={PAGESTYLE.pupilProfile}>
                <Text style={[PAGESTYLE.pupilName, props.item.Status == 'Draft' ? PAGESTYLE.noText : PAGESTYLE.yesText]}>{props.item.Status}</Text>
            </View>

            <View style={[PAGESTYLE.pupilProfile, PAGESTYLE.lastColumn]}>
                <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} />
            </View>
        </View>
    </TouchableOpacity>
);
const Message = (props) => {
    const [selectedId, setSelectedId] = useState(null);
    const [isLoading, setLoading] = useState(false)
    const [messageData, setMessageData] = useState([])

    const pupilRender = ({ item, index }) => {
        return (
            <MessageList
                item={item}
                navigateToDetail={() => { }} />
        );
    };

    useEffect(() => {
        fetchRecord('', '')
    }, [])

    const fetchRecord = (searchBy, filterBy) => {
        setLoading(true)
        let data = {
            Searchby: searchBy,
            Filterby: filterBy,
        }

        Service.get(`${EndPoints.GlobalMessaging}/${User.user._id}/T`, (res) => {
            setLoading(false)
            if (res.code == 200) {
                console.log('response of get all lesson', res)
                setMessageData(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)
        })
    }

    const refresh = () => {
        console.log('refreshed');
        fetchRecord('', '')
    }

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
                {/* <View style={PAGESTYLE.pupilTableHeadingMain}>
                    <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>CLASS</Text>
                </View> */}
                <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.secoundColumn]}>
                    <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>STATUS</Text>
                </View>
                {/* <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.lastColumn]}>
                    <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Marked</Text>
                </View> */}
            </View>
            <View style={PAGESTYLE.pupilTabledata}>
                <SafeAreaView style={PAGESTYLE.pupilTabledataflatlist}>

                    {isLoading ?
                        <ActivityIndicator
                            style={{ flex: 1, marginTop: 20 }}
                            size={Platform.OS == 'ios' ? 'large' : 'small'}
                            color={COLORS.yellowDark} />
                        :
                        messageData.length > 0 ?
                            <FlatList
                                data={messageData}
                                renderItem={pupilRender}
                                keyExtractor={(item) => item.id}
                                extraData={selectedId}
                                showsVerticalScrollIndicator={false}
                            />
                            :
                            <View style={{ height: 100, justifyContent: 'center' }}>
                                <Text style={{ alignItems: 'center', fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                            </View>
                    }
                </SafeAreaView>
            </View>
        </View>

    );

}

export default Message;
