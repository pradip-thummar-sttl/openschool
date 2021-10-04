import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, TextInput, Image, FlatList, ActivityIndicator, Platform, BackHandler, ToastAndroid } from 'react-native'
import HeaderWhitepupilMessage from '../../../component/reusable/header/HeaderWhitepupilMessage';
import COLORS from '../../../../utils/Colors'
import { baseUrl, opacity, showMessage } from '../../../../utils/Constant';
// import Images from '../../../../utils/Images'
import PAGESTYLE from './Style'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FONTS from '../../../../utils/Fonts'
import { Service } from '../../../../service/Service';
import { EndPoints } from '../../../../service/EndPoints';
import { User } from '../../../../utils/Model';
import EmptyStatePlaceHohder from '../../../component/reusable/placeholder/EmptyStatePlaceHohder';
import MESSAGE from '../../../../utils/Messages';
import CloseBlack from '../../../../svg/teacher/timetable/Close_Black';
import SearchBlue from '../../../../svg/teacher/timetable/Search_Blue';
import AddWhite from '../../../../svg/teacher/timetable/Add_White';
import ArrowNext from '../../../../svg/teacher/lessonhwplanner/ArrowNext';
import FilterBlack from '../../../../svg/teacher/timetable/Filter_Black';
import HeaderTM from './HeaderTM';
var moment = require('moment');

const TeacherManagement = (props) => {
    let currentCount = 0
    useEffect(() => {
        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    const handleBackButtonClick = () => {

        if (currentCount === 1) {
            BackHandler.exitApp()
            return true;
        }

        if (currentCount < 1) {
            currentCount += 1;
            ToastAndroid.show('Press BACK again to quit the App', ToastAndroid.SHORT)
        }
        setTimeout(() => {
            currentCount = 0;
        }, 2000);

        return true;
    }


    const [isSearchActive, setSearchActive] = useState(false)
    const textInput = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [filterBy, setFilterBy] = useState('')
    const [keyword, setKeyword] = useState('')

    const [selectedId, setSelectedId] = useState(null);
    const [isLoading, setLoading] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [messageData, setMessageData] = useState([])

    const MessageList = ({ item }) => {
        return (
            <TouchableOpacity
                activeOpacity={opacity}
                style={{ ...PAGESTYLE.pupilData, marginBottom: 8 }}
                onPress={() => props.navigation.navigate('TeacherProfileView', { item: item })}>
                <View style={PAGESTYLE.pupilProfile}>
                    <View style={PAGESTYLE.rowProfile}>
                        <Image style={PAGESTYLE.pupilImage} source={{ uri: baseUrl + item.ProfilePicture }}></Image>
                        <View>
                            <Text numberOfLines={1} style={[PAGESTYLE.pupilName, { fontFamily: FONTS.fontBold, width: wp(35) }]}>{item.FirstName} {item.LastName}</Text>
                            <Text numberOfLines={1} style={[PAGESTYLE.pupilName, { width: wp(45) }]}>{item.Email}</Text>
                        </View>
                    </View>
                    <View style={PAGESTYLE.groupPupil}>
                        <Text numberOfLines={1} style={[PAGESTYLE.groupName, { width: wp(35) }]}>{item.TeachingYear ? item.TeachingYear : '-'}</Text>
                    </View>
                </View>
                <View style={PAGESTYLE.pupilDetailLink}>
                    {/* <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} /> */}
                    <ArrowNext style={PAGESTYLE.pupilDetaillinkIcon} height={hp(1.5)} width={hp(1.5)} />
                </View>
            </TouchableOpacity>
        )
    }

    const messageRender = ({ item, index }) => {
        return (
            <MessageList
                item={item}
                navigateToDetail={() => { }} />
        );
    };

    // useEffect(() => {
    //     fetchRecord('', )
    // }, [])

    useEffect(() => {
        fetchRecord('', '')
    }, [filterBy])

    const fetchRecord = (searchby, filterBy) => {
        setLoading(true)
        let data = {
            Searchby: searchby,
            Filterby: filterBy
        }

        console.log(`${EndPoints.TeacherBySchoolId}/${User.user.UserDetialId}`, data);
        Service.post(data, `${EndPoints.TeacherBySchoolId}/${User.user.UserDetialId}`, (res) => {
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
        if (isSearchActive) {
            textInput.current.clear()
            setSearchActive(false)
            fetchRecord('', filterBy)
        } else {
            setSearchActive(true)
            fetchRecord(keyword, filterBy)
        }
    }

    return (
        <View>
            {/* <HeaderTM
                onAlertPress={() => props.navigation.openDrawer()}
                title={'Teacher Management'}
            /> */}

            <HeaderTM
                onAlertPress={() => props.navigation.openDrawer()}
                // onCalenderPress={() => { props.navigation.navigate('Calendars') }}
                openCsv={()=>{}}
                navigateToCreateNewEvent={() => props.navigation.navigate('AddNewTeacher', { onGoBack: () => refresh() })}
                onSearchKeyword={(keyword) => setSearchKeyword(keyword)}
                onSearch={() => fetchRecord(searchKeyword, filterBy)}
                onClearSearch={() => fetchRecord('', '')}
                navigateToAddLesson={() => props.navigation.navigate('TLDetailAdd', { onGoBack: () => refresh() })}
                refreshList={() => refresh()}
                title={'Teacher Management'}
                userType={'Teacher'}
                onFilter={(filterBy) => fetchRecord('', filterBy)} />

            {/* {searchHeader()} */}
            {isLoading ?
                <ActivityIndicator
                    style={{ flex: 1, marginTop: 20 }}
                    size={Platform.OS == 'ios' ? 'large' : 'small'}
                    color={COLORS.yellowDark} />
                :
                messageData.length > 0 ?
                    <FlatList
                        style={{ height: '80%', marginHorizontal: 10 }}
                        data={messageData}
                        renderItem={messageRender}
                        keyExtractor={(item) => item.id}
                        extraData={selectedId}
                        showsVerticalScrollIndicator={false} />
                    :
                    // <View style={{ height: 100, justifyContent: 'center' }}>
                    //     <Text style={{ alignItems: 'center', fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                    // </View>
                    <EmptyStatePlaceHohder holderType={6} title1={MESSAGE.teacherManage1} title2={MESSAGE.teacherManage2} />
            }
        </View>
    )
}

export default TeacherManagement
