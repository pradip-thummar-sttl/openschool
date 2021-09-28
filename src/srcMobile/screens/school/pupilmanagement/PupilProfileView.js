import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator, BackHandler, Platform, } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
// import Images from '../../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../../utils/Fonts';
import HeaderPMInner from "./HeaderPMInner";
import { PanGestureHandler, TextInput } from "react-native-gesture-handler";
import moment from 'moment';
import { baseUrl, opacity, showMessage } from "../../../../utils/Constant";
import Chat from "../../Chat/Chat";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { User } from "../../../../utils/Model";
import ActivityRings from "react-native-activity-rings";
import MESSAGE from "../../../../utils/Messages";
import TickMarkWhite from '../../../../svg/teacher/lessonhwplanner/TickMark_White'
import Bronze from '../../../../svg/teacher/pupilmanagement/StarBronze';
import Silver from '../../../../svg/teacher/pupilmanagement/StartSilver';
import Gold from '../../../../svg/teacher/pupilmanagement/StarGold';
import BronzeFill from '../../../../svg/teacher/lessonhwplanner/StarBronze_Fill'
import SilverFill from '../../../../svg/teacher/lessonhwplanner/StartSilver_Fill'
import GoldFill from '../../../../svg/teacher/lessonhwplanner/StarGold_Fill'
import TopBackImg from "../../../../svg/teacher/pupilmanagement/TopBackImg";
import EditProfileTop_Mobile from "../../../../svg/pupil/parentzone/EditProfileTopBg_Mobile";

const { CallModule } = NativeModules;

const PupilProfileView = (props) => {
    const item = props.route.params.item;
    const [isHide, action] = useState(true);
    const [tabSelected, setTabSelected] = useState(0);


    const [joinedLesson, setJoinedLesson] = useState(0)
    const [submittedHomework, setSubmittedHomework] = useState(0)
    const [missedLesson, setMissedLesson] = useState(0)
    const [isLessonDetail, setLessonDetail] = useState(false);

    const [isBronze, setBronze] = useState(false);
    const [isSilver, setSilver] = useState(false);
    const [isGold, setGold] = useState(false);
    const [feedBack, setFeedback] = useState('')

    console.log('item', item);
    // const handleOnClick = (index) => {
    //     setTabSelected(index)
    // }
    useEffect(() => {
        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [props.navigation]);

    const handleBackButtonClick = () => {
        props.navigation.goBack()
        return true;
    }

    const [chartData, setChartData] = useState([])

    const myref = useRef(null);

    const activityConfig = {
        width: 200,
        height: 200
    };

    const handleOnClick = (index) => {
        setTabSelected(index)
        console.log('reference', myref);
        if (myref.current) {
            myref.current.refresh();
        }
    }

    useEffect(() => {
        getLessonData()
    }, [])

    useEffect(() => {
        console.log('chartData', chartData);
    }, [chartData])

    const getLessonData = () => {

        

        Service.get(`${EndPoints.GetCountLession}/${item.PupilId}`, (res) => {
            console.log('res of all pupil by teacher', res)
            if (res.flag) {
                let per = res.data.percentage
                let data = [{
                    value: per != 'null' ? 0.0001 : per != 0 ? (per / 100) : 0.0001,       // To make value between 0 to 1
                    color: COLORS.purpleDark,
                    backgroundColor: COLORS.lightPurple
                }]
                setJoinedLesson(res.data.joinlesson)
                setMissedLesson(res.data.totallesson - res.data.joinlesson)
                getHomeworkData(data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('Err of all pupil by teacher', err)
        })
    }

    const getHomeworkData = (lessonData) => {
        Service.get(`${EndPoints.GetCountHomework}/${item.PupilId}`, (res) => {
            console.log('res of all pupil by teacher', res)
            if (res.flag) {
                let per = res.data.percentage
                let data = {
                    value: per != 'null' ? 0.0001 : per != 0 ? (per / 100) : 0.0001,       // To make value between 0 to 1
                    color: COLORS.yellowDark,
                    backgroundColor: COLORS.lightYellow
                }
                setSubmittedHomework(res.data.total)
                lessonData.push(data)
                setChartData(lessonData)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('Err of all pupil by teacher', err)
        })
    }

    const setInstantRewards = () => {
        if (!isBronze && !isSilver && !isGold) {
            showMessage(MESSAGE.selectReward)
            return
        }

        let data = {
            TeacherID: User.user._id,
            PupilID: item.PupilId,
            Reward: isBronze ? '3' : isSilver ? '6' : '9',
            Feedback: feedBack,
            CreatedBy: User.user._id
        }

        Service.post(data, `${EndPoints.AddInstantReward}`, (res) => {
            console.log('res of all pupil by teacher', res)
            if (res.flag) {
                setBronze(false)
                setSilver(false)
                setGold(false)
                setFeedback('')
                showMessage(MESSAGE.rewarded)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('Err of all pupil by teacher', err)
        })
    }

    const onStarSelection = (index) => {
        setBronze(false)
        setSilver(false)
        setGold(false)
        if (index == 3) {
            setBronze(true)
        } else if (index == 6) {
            setSilver(true)
        } else if (index == 9) {
            setGold(true)
        }
    }

    return (
        <View>
            <HeaderPMInner
                name={item.FirstName + ' ' + item.LastName}
                navigateToBack={() => props.navigation.goBack()}
                navigateToPupilProfileEdit={() => props.navigation.replace('PupilProfileEdit', { item: item })}
                onAlertPress={() => props.navigation.openDrawer()}
                tabIndex={(index) => { handleOnClick(index) }}
            />
            {
                tabSelected === 0 ?
                    <View style={PAGESTYLE.MainProfile}>
                        <ScrollView style={PAGESTYLE.scrollViewCommon} showsVerticalScrollIndicator={false}>
                            <View style={PAGESTYLE.mainContainerProfile}>
                                <View style={PAGESTYLE.profileImageArea}>
                                    {/* <Image style={PAGESTYLE.coverImage} source={Images.Coverback}></Image> */}
                                    <EditProfileTop_Mobile style={PAGESTYLE.coverImage} width={'100%'} height={hp(13.8)} />
                                    <View style={PAGESTYLE.profileOuter}>
                                        <Image style={PAGESTYLE.profileImage} source={{ uri: baseUrl + item.ProfilePicture }} />
                                    </View>
                                </View>
                            </View>
                            <View style={PAGESTYLE.mainDetails}>
                                <View style={PAGESTYLE.fieldDetails}>
                                    <Text LABLE style={PAGESTYLE.label}>Pupil name</Text>
                                    <Text P style={PAGESTYLE.data}>{item.FirstName} {item.LastName}</Text>
                                </View>
                                <View style={PAGESTYLE.fieldDetails}>
                                    <Text LABLE style={PAGESTYLE.label}>Date of birth</Text>
                                    <Text P style={PAGESTYLE.data}>{moment(item.Dob).format('DD/MM/yyyy')}</Text>
                                </View>
                                <View style={PAGESTYLE.fieldDetails}>
                                    <Text LABLE style={PAGESTYLE.label}>Unique I.D (auto-generated)</Text>
                                    <Text P style={PAGESTYLE.data}>{item.UniqueNumber}</Text>
                                </View>
                                <View style={PAGESTYLE.fieldDetails}>
                                    <Text LABLE style={PAGESTYLE.label}>Notes</Text>
                                    <Text P style={PAGESTYLE.data}>{item.Note ? item.Note : '-'}</Text>
                                </View>
                            </View>
                            <View HR style={STYLE.hrCommon}></View>
                            <View style={PAGESTYLE.rewardSection}>
                                <View style={PAGESTYLE.fieldDetails}>
                                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text LABLE style={PAGESTYLE.label}>Instant rewards for homework</Text>
                                        <TouchableOpacity
                                            style={PAGESTYLE.tickLayoutPArent}
                                            activeOpacity={opacity}
                                            onPress={() => setInstantRewards()}>
                                            <View>
                                                {/* <Image style={PAGESTYLE.tickLayout} source={Images.CheckIconWhite} /> */}
                                                <TickMarkWhite style={PAGESTYLE.tickLayout} height={hp(1.7)} width={hp(1.7)} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={PAGESTYLE.achivementBox}>
                                        <View style={PAGESTYLE.rewardStarMark}>
                                            <TouchableOpacity onPress={() => onStarSelection(3)} activeOpacity={opacity}>
                                                <View style={PAGESTYLE.centerText}>
                                                    {/* <Image source={isBronze ? Images.BronzeStarFill : Images.BronzeStar} style={[PAGESTYLE.starSelected]} /> */}
                                                    {isBronze ?
                                                        <BronzeFill style={[PAGESTYLE.starSelected]} height={hp(5)} width={hp(5)} /> :
                                                        <Bronze style={[PAGESTYLE.starSelected]} height={hp(5)} width={hp(5)} />
                                                    }
                                                    <Text style={PAGESTYLE.starText}>Bronze star</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => onStarSelection(6)} activeOpacity={opacity}>
                                                <View style={[PAGESTYLE.centerStar, PAGESTYLE.separater]}>
                                                    {/* <Image source={isSilver ? Images.SilverStarFill : Images.SilverStar} style={[PAGESTYLE.starSelected]} /> */}
                                                    {isSilver ?
                                                        <SilverFill style={[PAGESTYLE.starSelected]} height={hp(5)} width={hp(5)} />
                                                        :
                                                        <Silver style={[PAGESTYLE.starSelected]} height={hp(5)} width={hp(5)} />}
                                                    <Text style={PAGESTYLE.starText}>Silver star</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => onStarSelection(9)} activeOpacity={opacity}>
                                                <View style={PAGESTYLE.centerText}>
                                                    {/* <Image source={isGold ? Images.GoldStarFill : Images.GoldStar} style={[PAGESTYLE.starSelected]} /> */}
                                                    {isGold ?
                                                        <GoldFill style={[PAGESTYLE.starSelected]} height={hp(5)} width={hp(5)} /> :
                                                        <Gold style={[PAGESTYLE.starSelected]} height={hp(5)} width={hp(5)} />}
                                                    <Text style={PAGESTYLE.starText}>Gold star</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={PAGESTYLE.fieldDetails}>
                                    <Text LABLE style={PAGESTYLE.label}>What is the reward for?</Text>
                                    <TextInput
                                        returnKeyType={"next"}
                                        multiline={true}
                                        autoCapitalize={'sentences'}
                                        numberOfLines={4}
                                        placeholder='Leave feedback here'
                                        style={PAGESTYLE.commonInputTextareaBoldGrey}
                                        value={feedBack}
                                        onChangeText={feedback => setFeedback(feedback)} />
                                </View>
                            </View>
                            <View HR style={STYLE.hrCommon}></View>
                            <View style={PAGESTYLE.pupilPerfomance}>
                                <Text H2 style={PAGESTYLE.titlePerfomance}>Pupil’s performance</Text>
                                {/* <Image style={PAGESTYLE.graph} source={Images.graphImagePupilPerfomance}></Image> */}

                                <View style={PAGESTYLE.performancePArent}>
                                    <ActivityRings
                                        data={chartData}
                                        config={activityConfig} />

                                    <View style={{ flexDirection: 'row', height: 50 }}>
                                        <View style={PAGESTYLE.colorLeftParent}>
                                            <View style={PAGESTYLE.colorSquare} />
                                            <Text style={PAGESTYLE.introText}>{`Engagement over${'\n'}last month`}</Text>
                                        </View>
                                        <View style={PAGESTYLE.colorRightParent}>
                                            <View style={PAGESTYLE.colorSquareRight} />
                                            <Text style={PAGESTYLE.introText}>{`Effort over last${'\n'}month`}</Text>
                                        </View>
                                    </View>
                                    <View HR style={STYLE.hrCommon}></View>
                                    <Text style={PAGESTYLE.bottomText}>Based on {item.FirstName + ' ' + item.LastName}'s engagement and effort, he is doing well and is excelling. He is also very eager to learn and perticularly interested in Mathematics and Science subjects.</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    :
                    <View style={PAGESTYLE.MainProfile}>
                        <Chat tabs={tabSelected} data={item} />
                    </View>
            }

        </View>
    );
}

export default PupilProfileView;