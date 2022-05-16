import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, TextInput, Image, FlatList, ActivityIndicator, Platform, BackHandler, ToastAndroid } from 'react-native'
import COLORS from '../../../../utils/Colors'
import { baseUrl, opacity, showMessage } from '../../../../utils/Constant';
import PAGESTYLE from './Style'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FONTS from '../../../../utils/Fonts'
import { Service } from '../../../../service/Service';
import { EndPoints } from '../../../../service/EndPoints';
import { BadgeIcon, User } from '../../../../utils/Model';
import EmptyStatePlaceHohder from '../../../component/reusable/placeholder/EmptyStatePlaceHohder';
import MESSAGE from '../../../../utils/Messages';
import ArrowNext from '../../../../svg/teacher/lessonhwplanner/ArrowNext';
import HeaderTM from './HeaderTM';

var pageNo = 1;
var limit = 25;
var DataArr = [];

const TeacherManagement = (props) => {

    const textInput = useRef(null);
    const [filterBy, setFilterBy] = useState('')
    const [selectedId, setSelectedId] = useState(null);
    const [isLoading, setLoading] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState('')


    let currentCount = 0

    useEffect(() => {
        pageNo = 1
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


    useEffect(() => {

        fetchRecord(pageNo, searchKeyword, filterBy);

        return () => {
            DataArr = [];
        }

    }, [])

    const refresh = () => {
        // textInput.current.clear()
        pageNo = 1;
        setSearchKeyword("")
        fetchRecord(1, "", filterBy);
    }

    const addMorePage = () => {

        console.log("More -=-=-=---->")
        if (DataArr.length > (limit - 1)) {
            setLoading(true)
            pageNo = pageNo + 1
            setTimeout(() => { fetchRecord(pageNo, searchKeyword, filterBy) }, 1000)
        }
    }

    const fetchRecord = (pNo, searchBy, filterBy) => {
        setLoading(true)
        let data = {
            Searchby: searchBy,
            Filterby: filterBy,
            page: String(pNo),
            limit: limit
        }

        Service.post(data, `${EndPoints.TeacherBySchoolId}/${User.user.UserDetialId}`, (res) => {

            if (res.code == 200) {

                if (res.data && pNo == 1) {
                    DataArr = [];
                    DataArr = res.data;
                }
                else if (res.data) {
                    for (var i = 0; i < res.data.length; i++) {
                        DataArr.push(res.data[i]);
                    }
                }
                setLoading(false)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)
        })
    }





    const openNotification = () => {
        BadgeIcon.isBadge = false
        props.navigation.navigate('NotificationDrawer', { onGoBack: () => refresh() })
    }

    return (
        <View style={{width:'100%', height:'100%'}}>
            <HeaderTM
                onAlertPress={() => props.navigation.openDrawer()}
                openCsv={() => { }}
                navigateToCreateNewEvent={() => props.navigation.navigate('AddNewTeacher', { onGoBack: () => refresh() })}

                onSearchKeyword={(keyword) => setSearchKeyword(keyword)}
                onSearch={() => { pageNo = 1; fetchRecord(1, searchKeyword, filterBy) }}
                onClearSearch={() => { setSearchKeyword(''); pageNo = 1; fetchRecord(1, '', filterBy) }}
                onFilter={(filterBy) => { pageNo = 1; setFilterBy(filterBy); fetchRecord(1, searchKeyword, filterBy) }}


                navigateToAddLesson={() => props.navigation.navigate('TLDetailAdd', { onGoBack: () => refresh() })}
                refreshList={() => refresh()}
                title={'Teacher Management'}
                userType={'Teacher'}

                onNotification={() => openNotification()} />

            {
                DataArr.length > 0 ?
                    <View style={{ height: '80%', marginHorizontal: 5 }}>
                        <FlatList 
                            data={DataArr}
                            renderItem={messageRender}
                            keyExtractor={(item) => item.id}
                            extraData={selectedId}
                            showsVerticalScrollIndicator={false}
                            onEndReachedThreshold={0}
                            onEndReached={() => addMorePage()}
                        />
                    </View>
                    :
                    !isLoading && <EmptyStatePlaceHohder holderType={6} title1={MESSAGE.teacherManage1} title2={MESSAGE.teacherManage2} />
            }

            {isLoading &&
                <View style={{ width: '100%', height: '100%', position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        style={{ flex: 1, marginTop: 20 }}
                        size={'large'}
                        color={COLORS.yellowDark} />
                </View>
            }

        </View>
    )
}

export default TeacherManagement
